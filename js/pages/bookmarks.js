// FILE: js/pages/bookmarks.js

const Bookmarks = {
    theme: 'light-mode',
    state: {
        allBookmarkedQuestions: [],
        allTests: [],
        filteredQuestions: [], // Holds the currently filtered list
        currentQuestionIndex: 0, // Index within the filtered list
        isLoading: true,
    },
    elements: {},

    render: async () => {
        const response = await fetch('pages/bookmarks.html');
        if (!response.ok) throw new Error('Failed to fetch bookmarks.html');
        return await response.text();
    },

    after_render: async () => {
        Bookmarks.cacheDOMElements();
        Bookmarks.bindEvents();
        await Bookmarks.loadAllBookmarkedQuestions();
        Bookmarks.populateInitialFilters();
        Bookmarks.applyFiltersAndRender();
    },

    // --- DATA FETCHING ---
    loadAllBookmarkedQuestions: async () => {
        Bookmarks.state.isLoading = true;
        try {
            if (!window.db) throw new Error("Firestore (window.db) is not initialized.");
            
            const querySnapshot = await window.db.collection("testResults").get();
            
            let bookmarkedQuestions = [];
            let allTests = [];

            querySnapshot.forEach(doc => {
                const testData = doc.data();
                if (!testData.userProgress || !testData.allQuestions) return;

                allTests.push({ id: doc.id, title: testData.testTitle });

                testData.userProgress.forEach((progress, index) => {
                    if (progress.isBookmarked) {
                        const question = testData.allQuestions[index];
                        bookmarkedQuestions.push({
                            ...question,
                            ...progress,
                            testId: doc.id,
                            testTitle: testData.testTitle,
                            questionIndexInDb: index, // The original index in the DB
                        });
                    }
                });
            });

            Bookmarks.state.allBookmarkedQuestions = bookmarkedQuestions;
            Bookmarks.state.allTests = allTests;
            console.log(`Loaded ${bookmarkedQuestions.length} bookmarked questions.`);

        } catch (error) {
            console.error("Error fetching bookmarked questions:", error);
            Bookmarks.elements.mainContent.innerHTML = `<div class="no-bookmarks-placeholder"><h3>Error</h3><p>Could not load bookmarks from the database.</p></div>`;
        } finally {
            Bookmarks.state.isLoading = false;
        }
    },

    // --- FILTERING LOGIC ---
    populateInitialFilters: () => {
        const { allBookmarkedQuestions, allTests } = Bookmarks.state;
        const container = Bookmarks.elements.filtersContainer;

        const filters = [
            { id: 'status', label: 'Status', options: ['All', 'Correct', 'Incorrect', 'Unattempted'] },
            { id: 'test', label: 'Test', options: ['All', ...allTests.map(t => t.title)] },
            { id: 'level', label: 'Level', options: ['All', ...new Set(allBookmarkedQuestions.map(q => q.difficulty))] },
            { id: 'qtype', label: 'Question Type', options: ['All', 'mcq', 'integer'] },
            { id: 'subject', label: 'Subject', options: ['All', ...new Set(allBookmarkedQuestions.map(q => q.subject))] },
            { id: 'mistake', label: 'Mistake Type', options: ['All', ...new Set(allBookmarkedQuestions.map(q => q.mistakeCategory).filter(Boolean))] },
            { id: 'chapter', label: 'Chapter', options: ['All'], disabled: true },
            { id: 'time', label: 'Time Analysis', options: ['All', 'perfect', 'overtime', 'wasted', 'painful'] },
            { id: 'topic', label: 'Topic', options: ['All'], disabled: true },
        ];

        container.innerHTML = filters.map(f => `
            <div class="filter-group">
                <label>${f.label}</label>
                <select id="bm-filter-${f.id}" ${f.disabled ? 'disabled' : ''}>
                    ${f.options.map(o => `<option value="${o}">${o.charAt(0).toUpperCase() + o.slice(1)}</option>`).join('')}
                </select>
            </div>
        `).join('');

        // Re-cache elements after creating them
        Bookmarks.cacheFilterElements();
        Bookmarks.bindFilterEvents();
    },
    
    updateDependentFilters: () => {
        const { allBookmarkedQuestions } = Bookmarks.state;
        const selectedSubject = Bookmarks.elements.filters['bm-filter-subject'].value;
        const selectedChapter = Bookmarks.elements.filters['bm-filter-chapter'].value;

        const populateSelect = (selectEl, options) => {
            selectEl.innerHTML = `<option value="All">All ${selectEl.id.split('-')[2]}s</option>` + 
                                 [...new Set(options)].map(opt => `<option value="${opt}">${opt}</option>`).join('');
        };

        if (selectedSubject !== 'All') {
            const chapters = allBookmarkedQuestions.filter(q => q.subject === selectedSubject).map(q => q.chapter);
            populateSelect(Bookmarks.elements.filters['bm-filter-chapter'], chapters);
            Bookmarks.elements.filters['bm-filter-chapter'].disabled = false;
        } else {
            Bookmarks.elements.filters['bm-filter-chapter'].innerHTML = '<option value="All">All Chapters</option>';
            Bookmarks.elements.filters['bm-filter-chapter'].disabled = true;
            Bookmarks.elements.filters['bm-filter-topic'].innerHTML = '<option value="All">All Topics</option>';
            Bookmarks.elements.filters['bm-filter-topic'].disabled = true;
        }

        if (selectedChapter !== 'All') {
             const topics = allBookmarkedQuestions.filter(q => q.chapter === selectedChapter).map(q => q.topic);
            populateSelect(Bookmarks.elements.filters['bm-filter-topic'], topics);
            Bookmarks.elements.filters['bm-filter-topic'].disabled = false;
        } else {
            Bookmarks.elements.filters['bm-filter-topic'].innerHTML = '<option value="All">All Topics</option>';
            Bookmarks.elements.filters['bm-filter-topic'].disabled = true;
        }
    },

    // REPLACE your old function with this new one in js/pages/bookmarks.js

applyFiltersAndRender: () => {
    let questions = [...Bookmarks.state.allBookmarkedQuestions];
    const filters = Bookmarks.elements.filters;
    
    // --- NEW LOGIC: Helper function to classify time spent ---
    const getTimeClassification = (q) => {
        if (!q.idealTime) return 'unknown'; // Safety check
        const timeRatio = q.timeSpent / q.idealTime;

        if (q.isCorrect) {
            return (timeRatio <= 1.1) ? 'perfect' : 'overtime';
        } else {
            return (timeRatio < 0.5) ? 'wasted' : 'painful';
        }
    };

    // Get all the filter values from the dropdowns
    const status = filters['bm-filter-status'].value;
    const testTitle = filters['bm-filter-test'].value;
    const level = filters['bm-filter-level'].value;
    const qtype = filters['bm-filter-qtype'].value;
    const subject = filters['bm-filter-subject'].value;
    const mistake = filters['bm-filter-mistake'].value;
    const time = filters['bm-filter-time'].value;
    const chapter = filters['bm-filter-chapter'].value;
    const topic = filters['bm-filter-topic'].value;

    questions = questions.filter(q => {
        const statusMatch = status === 'All' ||
            (status === 'Correct' && q.isCorrect === true) ||
            (status === 'Incorrect' && q.isCorrect === false) ||
            (status === 'Unattempted' && q.isCorrect === null);
        
        // --- NEW LOGIC: Match the new filters ---
        const timeMatch = time === 'All' || getTimeClassification(q) === time;
        const mistakeMatch = mistake === 'All' || q.mistakeCategory === mistake;
        
        const testMatch = testTitle === 'All' || q.testTitle === testTitle;
        const levelMatch = level === 'All' || q.difficulty === level;
        const qtypeMatch = qtype === 'All' || q.type === qtype;
        const subjectMatch = subject === 'All' || q.subject === subject;
        const chapterMatch = chapter === 'All' || q.chapter === chapter;
        const topicMatch = topic === 'All' || q.topic === topic;

        return statusMatch && testMatch && levelMatch && qtypeMatch && subjectMatch && mistakeMatch && timeMatch && chapterMatch && topicMatch;
    });

    Bookmarks.state.filteredQuestions = questions;
    Bookmarks.elements.questionCount.textContent = questions.length;
    
    if (questions.length > 0) {
        Bookmarks.renderQuestionIndex();
        Bookmarks.loadBookmarkedQuestion(0);
        Bookmarks.elements.questionViewer.style.display = 'block';
        Bookmarks.elements.noQuestionsPlaceholder.style.display = 'none';
        Bookmarks.elements.navigationFooter.style.display = 'flex';
    } else {
        Bookmarks.elements.indexGrid.innerHTML = '';
        Bookmarks.elements.questionViewer.style.display = 'none';
        Bookmarks.elements.noQuestionsPlaceholder.style.display = 'flex';
        Bookmarks.elements.navigationFooter.style.display = 'none';
    }
},

    // --- RENDERING ---
    renderQuestionIndex: () => {
        Bookmarks.elements.indexGrid.innerHTML = Bookmarks.state.filteredQuestions.map((q, index) =>
            `<button class="index-btn" data-index="${index}">${index + 1}</button>`
        ).join('');
        
        Bookmarks.elements.indexGrid.querySelectorAll('.index-btn').forEach(btn => {
            btn.onclick = (e) => Bookmarks.loadBookmarkedQuestion(parseInt(e.target.dataset.index));
        });
    },

    loadBookmarkedQuestion: (indexInFilteredList) => {
        Bookmarks.state.currentQuestionIndex = indexInFilteredList;
        const q = Bookmarks.state.filteredQuestions[indexInFilteredList];

        Bookmarks.elements.questionNumber.textContent = indexInFilteredList + 1;
        Bookmarks.elements.testTitle.textContent = `(${q.testTitle})`;
        Bookmarks.elements.questionImage.src = `test-images/${q.image}`;

        Bookmarks.elements.questionMeta.innerHTML = `
            <span class="meta-tag">Topic: ${q.topic}</span>
            <span class="meta-tag">Level: ${q.difficulty}</span>
        `;
        
        Bookmarks.elements.unbookmarkBtn.classList.add('bookmarked'); // It's always bookmarked here

        Bookmarks.renderPerQuestionAnalysis(Bookmarks.elements.analysisBox, q);
        
        // Update index highlighting
        Bookmarks.elements.indexGrid.querySelectorAll('.index-btn').forEach(btn => {
            btn.classList.toggle('current', parseInt(btn.dataset.index) === indexInFilteredList);
        });
    },

    // PASTE THIS NEW, CORRECTED VERSION IN ITS PLACE
renderPerQuestionAnalysis(container, q) {
    const statusClass = q.isCorrect ? 'correct' : 'incorrect';
    const yourAnswer = q.response !== null
        ? (q.type === 'mcq' ? q.options[q.response] : q.response)
        : 'Unattempted';
    const correctAnswer = q.type === 'mcq' ? q.options[q.answer] : q.answer;

    const mistakeNotebookHTML = !q.isCorrect ? `
        <div id="mistake-notebook-container">
            <h3>Mistake Notebook</h3>
            <div class="mistake-form-group">
                <label for="mistake-category-select">Categorize your mistake:</label>
                <select id="mistake-category-select" disabled>
                    <option>${q.mistakeCategory || '-- Not set --'}</option>
                </select>
            </div>
            <div class="mistake-form-group">
                <label for="mistake-notes-textarea">Notes:</label>
                <textarea id="mistake-notes-textarea" readonly>${q.mistakeNotes || ''}</textarea>
            </div>
        </div>
    ` : '';

    const fullHTML = `
        <div class="analysis-grid">
            <div class="analysis-item">
                <div class="label">Your Answer</div>
                <div class="value ${q.isCorrect === null ? '' : statusClass}">${yourAnswer}</div>
            </div>
            <div class="analysis-item">
                <div class="label">Correct Answer</div>
                <div class="value correct">${correctAnswer}</div>
            </div>
            <div class="analysis-item">
                <div class="label">Time Taken</div>
                <div class="value">${Math.round(q.timeSpent)}s</div>
            </div>
        </div>
        ${mistakeNotebookHTML}
        <div id="solution-image-container">
            <h3>Solution</h3>
            
        
            <img id="sol-solution-image" src="test-images/${q.solution_image}" alt="Solution Image" onerror="this.alt='Solution not available';"/>

        </div>
    `;

    container.innerHTML = fullHTML;
},

    // --- EVENT HANDLING & ACTIONS ---
    handleUnbookmark: async () => {
        const questionToUnbookmark = Bookmarks.state.filteredQuestions[Bookmarks.state.currentQuestionIndex];
        if (!questionToUnbookmark) return;

        try {
            const docRef = window.db.collection("testResults").doc(questionToUnbookmark.testId);
            const docSnap = await docRef.get();
            if (!docSnap.exists) throw new Error("Test document not found");

            const testData = docSnap.data();
            testData.userProgress[questionToUnbookmark.questionIndexInDb].isBookmarked = false;

            await docRef.update({ userProgress: testData.userProgress });
            
            console.log("Unbookmark successful.");
            
            // Refresh data locally and re-render
            await Bookmarks.loadAllBookmarkedQuestions();
            Bookmarks.applyFiltersAndRender();

        } catch (error) {
            console.error("Failed to unbookmark:", error);
            alert("Could not save the change. Please try again.");
        }
    },

    bindEvents: () => {
        Bookmarks.elements.backBtn.onclick = () => {
            if (Bookmarks.state.currentQuestionIndex > 0) {
                Bookmarks.loadBookmarkedQuestion(Bookmarks.state.currentQuestionIndex - 1);
            }
        };
        Bookmarks.elements.nextBtn.onclick = () => {
            if (Bookmarks.state.currentQuestionIndex < Bookmarks.state.filteredQuestions.length - 1) {
                Bookmarks.loadBookmarkedQuestion(Bookmarks.state.currentQuestionIndex + 1);
            }
        };
        Bookmarks.elements.unbookmarkBtn.onclick = Bookmarks.handleUnbookmark;
    },
    
    bindFilterEvents: () => {
        Object.values(Bookmarks.elements.filters).forEach(select => {
            select.onchange = () => {
                if (select.id === 'bm-filter-subject' || select.id === 'bm-filter-chapter') {
                    Bookmarks.updateDependentFilters();
                }
                Bookmarks.applyFiltersAndRender();
            };
        });
    },

    // --- UTILITIES ---
    cacheDOMElements: () => {
        Bookmarks.elements = {
            mainContent: document.getElementById('bookmarks-main-content'),
            filtersContainer: document.getElementById('bookmarks-filters'),
            indexGrid: document.getElementById('bm-index-grid'),
            questionCount: document.getElementById('bm-question-count'),
            questionViewer: document.getElementById('bm-question-viewer'),
            noQuestionsPlaceholder: document.getElementById('bm-no-questions-placeholder'),
            navigationFooter: document.getElementById('bm-navigation-footer'),
            questionNumber: document.getElementById('bm-question-number'),
            testTitle: document.getElementById('bm-test-title'),
            unbookmarkBtn: document.getElementById('bm-unbookmark-btn'),
            questionMeta: document.getElementById('bm-question-meta'),
            questionImage: document.getElementById('bm-question-image'),
            analysisBox: document.getElementById('bm-per-question-analysis-box'),
            backBtn: document.getElementById('bm-back-btn'),
            nextBtn: document.getElementById('bm-next-btn'),
        };
    },
    cacheFilterElements: () => {
        Bookmarks.elements.filters = {
            'bm-filter-status': document.getElementById('bm-filter-status'),
            'bm-filter-test': document.getElementById('bm-filter-test'),
            'bm-filter-level': document.getElementById('bm-filter-level'),
            'bm-filter-qtype': document.getElementById('bm-filter-qtype'),
            'bm-filter-subject': document.getElementById('bm-filter-subject'),
            'bm-filter-mistake': document.getElementById('bm-filter-mistake'),
            'bm-filter-chapter': document.getElementById('bm-filter-chapter'),
            'bm-filter-time': document.getElementById('bm-filter-time'),
            'bm-filter-topic': document.getElementById('bm-filter-topic'),
        };
    },
};

export default Bookmarks;
