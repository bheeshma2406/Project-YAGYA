// FILE: js/pages/analysis.js

const sanitizeForFirebase = (obj) => {
    return JSON.parse(JSON.stringify(obj, (key, value) => {
        return (value === undefined) ? null : value;
    }));
};

const Analysis = {
    state: {
        analysisData: null,
        currentQuestionIndex: 0,
        filters: {
            status: 'All',
            level: 'All',
            subject: 'All',
            chapter: 'All'
        }
    },
    elements: {},
    render: async () => {
        const response = await fetch('pages/analysis.html');
        if (!response.ok) throw new Error('Failed to fetch analysis.html');
        return await response.text();
    },
    after_render: async (docId) => {
        if (!docId) {
            alert('No test specified!');
            window.router.navigate('/');
            return;
        }

        try {
            if (!window.db) throw new Error("Firestore (window.db) not available");
            const docRef = window.db.collection("testResults").doc(docId);
            const docSnap = await docRef.get();

            if (!docSnap.exists) {
                throw new Error(`Test result with ID ${docId} not found.`);
            }

            Analysis.state.analysisData = docSnap.data();
            Analysis.state.analysisData.docId = docId;

            Analysis.cacheDOMElements();
            Analysis.bindEvents();
            Analysis.renderInitialView();
            Analysis.updatePageTitle();

        } catch (error) {
            console.error("Error loading analysis data:", error);
            document.getElementById('app-container').innerHTML = `<h2>Error Loading Analysis</h2><p>${error.message}</p>`;
        }
    },
    renderInitialView() {
        this.renderResultsSummary();
        this.navigateToView('results-view');
    },
    updatePageTitle() {
        const titleEl = document.getElementById('analysis-test-title');
        if (titleEl) {
            titleEl.textContent = this.state.analysisData.testTitle;
        }
    },
    renderResultsSummary() {
        const { results } = this.state.analysisData;
        document.getElementById('results-view').innerHTML = `
            <div class="results-summary">
                <div class="score-card">
                    <h3>Your Score</h3>
                    <span class="score">${results.totalScore}</span><span class="score-total">/ ${results.totalMaxMarks}</span>
                </div>
                <div class="stats-grid">
                    <div class="stat-item"><div class="value green">${results.correctCount}</div><div class="label">Correct</div></div>
                    <div class="stat-item"><div class="value red">${results.incorrectCount}</div><div class="label">Incorrect</div></div>
                    <div class="stat-item"><div class="value grey">${results.unattemptedCount}</div><div class="label">Unattempted</div></div>
                </div>
            </div>
            <div class="section-performance">
                <h3>Section Performance</h3>
                <table>
                    <thead><tr><th>Subject</th><th>Score</th><th>Correct</th><th>Incorrect</th><th>Unattempted</th></tr></thead>
                    <tbody>
                        ${Object.keys(results.sections).map(subject => `
                            <tr>
                                <td>${subject}</td>
                                <td>${results.sections[subject].score}</td>
                                <td class="green">${results.sections[subject].correct}</td>
                                <td class="red">${results.sections[subject].incorrect}</td>
                                <td class="grey">${results.sections[subject].unattempted}</td>
                            </tr>`).join('')}
                    </tbody>
                </table>
            </div>
        `;
    },
    renderSolutionViewer() {
        this.populateFilters();
        this.buildSolutionIndex();
        this.loadSolutionQuestion(0);
        this.updateSolutionLegend();
    },
    navigateToView(viewName) {
    this.elements.resultsView.style.display = 'none';
    this.elements.solutionView.style.display = 'none';

    if (viewName === 'results-view') {
        document.body.className = 'dark-mode';

        // NEW LINE: Restore padding for the results summary page
        this.elements.analysisMain.style.padding = '40px'; 

        this.elements.resultsView.style.display = 'block';
        this.elements.viewSolutionsBtn.style.display = 'inline-block';
        this.elements.backToResultsBtn.style.display = 'none';

    } else if (viewName === 'solution-view') {
        document.body.className = 'light-mode';

        // NEW LINE: Remove padding for the solution viewer to give it full space
        this.elements.analysisMain.style.padding = '0';

        this.elements.solutionView.style.display = 'flex';
        this.elements.viewSolutionsBtn.style.display = 'none';
        this.elements.backToResultsBtn.style.display = 'inline-block';
        this.renderSolutionViewer();
    }
},
    loadSolutionQuestion(index) {
        this.state.currentQuestionIndex = index;
        const q = this.state.analysisData.allQuestions[index];
        const p = this.state.analysisData.userProgress[index];

        this.elements.solQuestionNumber.textContent = index + 1;
        this.elements.solQuestionImage.src = `test-images/${q.image}`;
        
        // Render meta tags
        this.elements.solQuestionMeta.innerHTML = `
            <span class="meta-tag">Marks: +${q.marks.correct} / ${q.marks.incorrect}</span>
            <span class="meta-tag">Type: ${q.type.toUpperCase()}</span>
            <span class="meta-tag">Topic: ${q.topic}</span>
        `;
        
        // Update bookmark button state
        this.elements.solBookmarkBtn.classList.toggle('bookmarked', !!p.isBookmarked);

        this.renderPerQuestionAnalysis(q, p);
        this.updateSolutionIndex();
    },
    renderPerQuestionAnalysis(q, p) {
        const statusClass = p.isCorrect ? 'correct' : 'incorrect';
        const yourAnswer = p.response !== null 
            ? (q.type === 'mcq' ? q.options[p.response] : p.response)
            : 'Unattempted';
        const correctAnswer = q.type === 'mcq' ? q.options[q.answer] : q.answer;

        const mistakeNotebookHTML = !p.isCorrect ? `
            <div id="mistake-notebook-container">
                <h3>Mistake Notebook</h3>
                <div class="mistake-form-group">
                    <label for="mistake-category-select">Categorize your mistake:</label>
                    <select id="mistake-category-select">
                        <option value="" ${!p.mistakeCategory ? 'selected' : ''}>-- Select --</option>
                        <option value="Conceptual Error" ${p.mistakeCategory === 'Conceptual Error' ? 'selected' : ''}>Conceptual Error</option>
                        <option value="Silly Mistake" ${p.mistakeCategory === 'Silly Mistake' ? 'selected' : ''}>Silly Mistake</option>
                        <option value="Calculation Error" ${p.mistakeCategory === 'Calculation Error' ? 'selected' : ''}>Calculation Error</option>
                        <option value="Time Pressure" ${p.mistakeCategory === 'Time Pressure' ? 'selected' : ''}>Time Pressure</option>
                        <option value="Other" ${p.mistakeCategory === 'Other' ? 'selected' : ''}>Other</option>
                    </select>
                </div>
                <div class="mistake-form-group">
                    <label for="mistake-notes-textarea">Notes:</label>
                    <textarea id="mistake-notes-textarea" placeholder="Why did you make this mistake?">${p.mistakeNotes || ''}</textarea>
                </div>
            </div>
        ` : '';

        const analysisHTML = `
            <div class="analysis-grid">
                <div class="analysis-item">
                    <div class="label">Your Answer</div>
                    <div class="value ${p.isCorrect === null ? '' : statusClass}">${yourAnswer}</div>
                </div>
                <div class="analysis-item">
                    <div class="label">Correct Answer</div>
                    <div class="value correct">${correctAnswer}</div>
                </div>
                <div class="analysis-item">
                    <div class="label">Time Taken</div>
                    <div class="value">${Math.round(p.timeSpent)}s</div>
                </div>
            </div>
            ${mistakeNotebookHTML}
            <div id="solution-image-container">
                <h3>Solution</h3>
                <img id="sol-solution-image" src="test-images/${q.solution_image}" alt="Solution Image" onerror="this.alt='Solution not available';"/>
            </div>
        `;
        this.elements.perQuestionAnalysisBox.innerHTML = analysisHTML;
        
        if (!p.isCorrect) {
            document.getElementById('mistake-category-select').onchange = (e) => this.saveMistakeData({ mistakeCategory: e.target.value });
            document.getElementById('mistake-notes-textarea').onblur = (e) => this.saveMistakeData({ mistakeNotes: e.target.value });
        }
    },
    async saveMistakeData(dataToUpdate) {
        const progressItem = this.state.analysisData.userProgress[this.state.currentQuestionIndex];
        
        // Update the local state first for immediate UI feedback
        Object.assign(progressItem, dataToUpdate);

        try {
            if (!window.db) throw new Error("Firestore (window.db) not available");
            const docRef = window.db.collection("testResults").doc(this.state.analysisData.docId);

            await docRef.update({
                userProgress: sanitizeForFirebase(this.state.analysisData.userProgress)
            });
            
            console.log(`Data for Q#${this.state.currentQuestionIndex + 1} saved.`);

        } catch (error) {
            console.error("Failed to save data:", error);
            alert("Could not save your changes. Please check your connection.");
        }
    },
    buildSolutionIndex() {
        const { allQuestions } = this.state.analysisData;
        this.elements.solIndexGrid.innerHTML = allQuestions.map((_, index) => 
            `<button class="index-btn" data-index="${index}">${index + 1}</button>`
        ).join('');
        this.elements.solIndexGrid.querySelectorAll('.index-btn').forEach(btn => {
            btn.onclick = (e) => this.loadSolutionQuestion(parseInt(e.target.dataset.index));
        });
    },
    updateSolutionIndex() {
        const { userProgress, allQuestions } = this.state.analysisData;
        
        const { status, level, subject, chapter } = this.state.filters;
        const filteredIndices = userProgress
            .map((p, i) => i)
            .filter(i => {
                const p = userProgress[i];
                const q = allQuestions[i];
                const statusMatch = status === 'All' ||
                    (status === 'Correct' && p.isCorrect === true) ||
                    (status === 'Incorrect' && p.isCorrect === false) ||
                    (status === 'Unattempted' && p.isCorrect === null);
                const levelMatch = level === 'All' || q.difficulty === level;
                const subjectMatch = subject === 'All' || q.subject === subject;
                const chapterMatch = chapter === 'All' || q.chapter === chapter;
                return statusMatch && levelMatch && subjectMatch && chapterMatch;
            });

        this.elements.solIndexGrid.querySelectorAll('.index-btn').forEach(btn => {
            const index = parseInt(btn.dataset.index);
            const p = userProgress[index];
            btn.className = 'index-btn';
            if (p.isCorrect === true) btn.classList.add('correct');
            else if (p.isCorrect === false) btn.classList.add('incorrect');
            else btn.classList.add('unattempted');

            if (index === this.state.currentQuestionIndex) btn.classList.add('current');
            
            btn.style.display = filteredIndices.includes(index) ? 'flex' : 'none';
        });
    },
    updateSolutionLegend() {
        const { correctCount, incorrectCount, unattemptedCount } = this.state.analysisData.results;
        this.elements.solIndexLegend.innerHTML = `
            <div class="legend-item"><span class="legend-box correct">${correctCount}</span> Correct</div>
            <div class="legend-item"><span class="legend-box incorrect">${incorrectCount}</span> Incorrect</div>
            <div class="legend-item"><span class="legend-box unattempted">${unattemptedCount}</span> Unattempted</div>
        `;
    },
    populateFilters() {
        const { allQuestions } = this.state.analysisData;
        const levels = [...new Set(allQuestions.map(q => q.difficulty))];
        const subjects = [...new Set(allQuestions.map(q => q.subject))];
        const chapters = [...new Set(allQuestions.map(q => q.chapter))];

        this.elements.filterLevel.innerHTML = '<option value="All">All Levels</option>' + levels.map(l => `<option value="${l}">${l}</option>`).join('');
        this.elements.filterSubject.innerHTML = '<option value="All">All Subjects</option>' + subjects.map(s => `<option value="${s}">${s}</option>`).join('');
        this.elements.filterChapter.innerHTML = '<option value="All">All Chapters</option>' + chapters.map(c => `<option value="${c}">${c}</option>`).join('');
    },
    bindEvents() {
        this.elements.backToDashboardBtn.onclick = () => window.router.navigate('/');
        this.elements.viewSolutionsBtn.onclick = () => this.navigateToView('solution-view');
        this.elements.backToResultsBtn.onclick = () => this.navigateToView('results-view');
        
        this.elements.solBackBtn.onclick = () => {
            if (this.state.currentQuestionIndex > 0) this.loadSolutionQuestion(this.state.currentQuestionIndex - 1);
        };
        this.elements.solNextBtn.onclick = () => {
            if (this.state.currentQuestionIndex < this.state.analysisData.allQuestions.length - 1) {
                this.loadSolutionQuestion(this.state.currentQuestionIndex + 1);
            }
        };
        // Corrected code for js/pages/analysis.js

this.elements.solBookmarkBtn.onclick = () => {
    // Find the item we need to change in our local state
    const progressItem = this.state.analysisData.userProgress[this.state.currentQuestionIndex];
    
    // 1. Calculate the NEW intended state and store it in a variable.
    const newBookmarkState = !progressItem.isBookmarked;

    // 2. Save the new state to the database (this also updates the local state).
    this.saveMistakeData({ isBookmarked: newBookmarkState });
    
    // 3. Set the UI class to EXACTLY match the new state.
    this.elements.solBookmarkBtn.classList.toggle('bookmarked', newBookmarkState);
};

        // Filter events
        const applyFilters = () => {
            this.state.filters.status = this.elements.filterStatus.value;
            this.state.filters.level = this.elements.filterLevel.value;
            this.state.filters.subject = this.elements.filterSubject.value;
            this.state.filters.chapter = this.elements.filterChapter.value;
            this.updateSolutionIndex();
        };
        this.elements.filterStatus.onchange = applyFilters;
        this.elements.filterLevel.onchange = applyFilters;
        this.elements.filterSubject.onchange = applyFilters;
        this.elements.filterChapter.onchange = applyFilters;
    },
    cacheDOMElements() {
        this.elements = {
            analysisMain: document.querySelector('.analysis-main'),
            resultsView: document.getElementById('results-view'),
            solutionView: document.getElementById('solution-view'),
            backToDashboardBtn: document.getElementById('back-to-dashboard-btn'),
            viewSolutionsBtn: document.getElementById('view-solutions-btn'),
            backToResultsBtn: document.getElementById('back-to-results-btn'),
            solQuestionNumber: document.getElementById('sol-question-number'),
            solQuestionMeta: document.getElementById('sol-question-meta'),
            solBookmarkBtn: document.getElementById('sol-bookmark-btn'),
            solQuestionImage: document.getElementById('sol-question-image'),
            perQuestionAnalysisBox: document.getElementById('per-question-analysis-box'),
            solBackBtn: document.getElementById('sol-back-btn'),
            solNextBtn: document.getElementById('sol-next-btn'),
            solIndexGrid: document.getElementById('sol-index-grid'),
            solIndexLegend: document.getElementById('sol-index-legend'),
            filterStatus: document.getElementById('filter-status'),
            filterLevel: document.getElementById('filter-level'),
            filterSubject: document.getElementById('filter-subject'),
            filterChapter: document.getElementById('filter-chapter'),
        };
    }
};

export default Analysis;
