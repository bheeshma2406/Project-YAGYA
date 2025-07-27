// This is a big file! It contains all the logic from the original index.html
// for running a test, showing the summary, calculating results, and analyzing answers.

// Helper function to load a script dynamically
const loadScript = (src) => {
    return new Promise((resolve, reject) => {
        const existingScript = document.querySelector(`script[src="${src}"]`);
        if (existingScript) {
            resolve();
            return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Script load error for ${src}`));
        document.body.appendChild(script);
    });
};

// The main object for the Test page
const Test = {
    // --- STATE ---
    state: {
        appMode: 'test', 
        currentTest: null,
        allQuestions: [],
        userProgress: [],
        finalAnalysis: null, // To store the complete analysis object
        timerInterval: null,
        totalDurationInSeconds: null,
        currentQuestionIndex: 0,
        currentSubject: 'Physics',
    },

    // --- DOM ELEMENTS ---
    elements: {},

    // --- RENDER METHOD ---
    render: async () => {
        const response = await fetch('/pages/test.html');
        const html = await response.text();
        return html;
    },

    // --- MAIN LOGIC (RUNS AFTER RENDER) ---
    after_render: async (id) => {
        console.log(`Test page rendered for test ID: ${id}`);
        
        Test.state.currentTest = allTests.find(t => t.id === id);
        if (!Test.state.currentTest) {
            alert(`Error: Test with ID "${id}" not found.`);
            return window.router.navigate('/');
        }

        try {
            await loadScript(`/${Test.state.currentTest.questionsFile}`);
            if (typeof testQuestions === 'undefined') throw new Error('testQuestions variable not found in script.');
            
            Test.state.allQuestions = testQuestions;
            Test.showInstructions();

        } catch (error) {
            console.error(error);
            alert(`Failed to load question file: ${Test.state.currentTest.questionsFile}`);
            window.router.navigate('/');
        }
    },
    
    // --- PAGE/VIEW MANAGEMENT ---
    navigateToView(viewName) {
        const views = ['instructions-page', 'test-page', 'summary-page', 'results-page', 'analysis-dashboard-page'];
        views.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.remove('active');
        });

        const targetView = document.getElementById(viewName);
        if (targetView) targetView.classList.add('active');

        document.body.className = (viewName === 'test-page') ? 'light-mode' : 'dark-mode';
    },

    showInstructions() {
        const instructionsPage = document.getElementById('instructions-page');
        const test = Test.state.currentTest;
        
        instructionsPage.innerHTML = `
            <div class="instructions-content">
                <h1>General Instructions for ${test.title}</h1>
                <p>1. Total duration for the test is <strong>${test.duration} minutes</strong>.</p>
                <p>2. Marking scheme: <strong>+${test.marks.correct}</strong> for correct, <strong>${test.marks.incorrect}</strong> for incorrect.</p>
                <div class.instructions-buttons" style="margin-top: 30px;">
                    <button id="back-to-dashboard-btn">Back</button>
                    <button id="start-test-btn-from-instructions">I am ready to begin</button>
                </div>
            </div>`;
        
        document.getElementById('start-test-btn-from-instructions').onclick = () => Test.startTest();
        document.getElementById('back-to-dashboard-btn').onclick = () => window.router.navigate('/');
        
        Test.navigateToView('instructions-page');
    },
    
    // --- TEST LIFECYCLE ---
    startTest() {
        Test.state.appMode = 'test';
        Test.state.totalDurationInSeconds = Test.state.currentTest.duration * 60;

        Test.state.userProgress = Test.state.allQuestions.map((q, index) => ({
            index,
            subject: q.subject,
            status: 'not-visited',
            response: null,
            timeSpent: 0,
            isBookmarked: false,
        }));

        Test.cacheDOMElements();
        Test.bindEvents();
        Test.wrapScrollableContent(); // Important for scrolling fix
        Test.buildQuestionIndex();
        Test.startTimer();
        Test.loadQuestion(0);
        Test.navigateToView('test-page');
    },

    finishTest() {
        clearInterval(Test.state.timerInterval);
        Test.state.timerInterval = null;
        
        const results = {
            totalScore: 0,
            totalMaxMarks: 0,
            correctCount: 0,
            incorrectCount: 0,
            unattemptedCount: 0,
            sections: {
                Physics: { score: 0, correct: 0, incorrect: 0, unattempted: 0, total: 0, maxMarks: 0 },
                Chemistry: { score: 0, correct: 0, incorrect: 0, unattempted: 0, total: 0, maxMarks: 0 },
                Maths: { score: 0, correct: 0, incorrect: 0, unattempted: 0, total: 0, maxMarks: 0 },
            }
        };

        Test.state.userProgress.forEach((p, i) => {
            const q = Test.state.allQuestions[i];
            const section = results.sections[q.subject];
            const marks = q.marks;

            results.totalMaxMarks += marks.correct;
            section.total++;
            section.maxMarks += marks.correct;

            const hasAnswered = p.status === 'answered' || p.status === 'answered-marked';
            
            if (hasAnswered) {
                if (String(p.response).trim() === String(q.answer).trim()) {
                    p.isCorrect = true;
                    results.totalScore += marks.correct;
                    section.score += marks.correct;
                    results.correctCount++;
                    section.correct++;
                } else {
                    p.isCorrect = false;
                    results.totalScore += marks.incorrect;
                    section.score += marks.incorrect;
                    results.incorrectCount++;
                    section.incorrect++;
                }
            } else {
                p.isCorrect = null;
                results.unattemptedCount++;
                section.unattempted++;
            }
        });
        
        Test.state.finalAnalysis = { results, userProgress: Test.state.userProgress, allQuestions: Test.state.allQuestions, testTitle: Test.state.currentTest.title };
        Test.generateResults(Test.state.finalAnalysis);
        Test.navigateToView('results-page');
    },

    // --- TIMER ---
    startTimer() {
        const timer = () => {
            Test.state.totalDurationInSeconds--;
            const h = String(Math.floor(Test.state.totalDurationInSeconds / 3600)).padStart(2, '0');
            const m = String(Math.floor((Test.state.totalDurationInSeconds % 3600) / 60)).padStart(2, '0');
            const s = String(Test.state.totalDurationInSeconds % 60).padStart(2, '0');
            Test.elements.timerDisplay.textContent = `${h}:${m}:${s}`;
            if (Test.state.totalDurationInSeconds <= 0) {
                alert("Time is up!");
                Test.finishTest();
            }
        };
        timer();
        Test.state.timerInterval = setInterval(timer, 1000);
    },
    
    // --- QUESTION HANDLING ---
    loadQuestion(index) {
        Test.state.currentQuestionIndex = index;
        const q = Test.state.allQuestions[index];
        const p = Test.state.userProgress[index];

        if (p.status === 'not-visited') p.status = 'not-answered';

        Test.elements.questionNumberDisplay.textContent = index + 1;
        Test.elements.marksDisplay.textContent = `${q.marks.correct} / ${q.marks.incorrect}`;
        Test.elements.typeDisplay.textContent = q.type;
        Test.elements.questionImage.src = `/test-images/${q.image}`;
        
        Test.state.currentSubject = q.subject;
        Test.elements.subjectTabs.forEach(t => t.classList.toggle('active', t.dataset.subject === Test.state.currentSubject));

        if (q.type === 'mcq') {
            Test.elements.mcqOptionsContainer.style.display = 'block';
            Test.elements.integerInputArea.style.display = 'none';
            Test.elements.mcqOptionsContainer.innerHTML = q.options.map((opt, i) => `
                <div class="option ${p.response === i ? 'selected' : ''}" data-index="${i}">
                    <div class="option-radio"></div>
                    <div class="option-text">${opt}</div>
                </div>
            `).join('');
            Test.elements.mcqOptionsContainer.querySelectorAll('.option').forEach(opt => {
                opt.onclick = () => Test.selectOption(parseInt(opt.dataset.index));
            });
        } else {
            Test.elements.mcqOptionsContainer.style.display = 'none';
            Test.elements.integerInputArea.style.display = 'block';
            Test.elements.integerAnswerInput.value = p.response ?? '';
        }

        Test.updateUI();
    },
    
    selectOption(optionIndex) {
        const p = Test.state.userProgress[Test.state.currentQuestionIndex];
        p.response = p.response === optionIndex ? null : optionIndex;
        Test.loadQuestion(Test.state.currentQuestionIndex);
    },

    handleAction(action) {
        const p = Test.state.userProgress[Test.state.currentQuestionIndex];
        const q = Test.state.allQuestions[Test.state.currentQuestionIndex];
        
        if (q.type === 'integer') p.response = Test.elements.integerAnswerInput.value.trim() || null;
        
        const hasResponse = p.response !== null;
        
        if (action === 'save-next') p.status = hasResponse ? 'answered' : 'not-answered';
        else if (action === 'mark-next') p.status = hasResponse ? 'answered-marked' : 'marked';
        else if (action === 'save-mark') p.status = hasResponse ? 'answered-marked' : 'marked';

        if (action.includes('next') && Test.state.currentQuestionIndex < Test.state.allQuestions.length - 1) {
            Test.loadQuestion(Test.state.currentQuestionIndex + 1);
        } else {
            Test.updateUI();
        }
    },
    
    // --- UI & UX ---
    updateUI() {
        Test.updateQuestionIndex();
        Test.updateLegend();
    },
    
    buildQuestionIndex() {
        Test.elements.questionIndexGrid.innerHTML = Test.state.allQuestions.map((_, index) => 
            `<button class="index-btn" data-index="${index}">${index + 1}</button>`
        ).join('');
        Test.elements.questionIndexGrid.querySelectorAll('.index-btn').forEach(btn => {
            btn.onclick = (e) => Test.loadQuestion(parseInt(e.target.dataset.index));
        });
    },
    
    updateQuestionIndex() {
        Test.elements.questionIndexGrid.querySelectorAll('.index-btn').forEach(btn => {
            const index = parseInt(btn.dataset.index);
            const p = Test.state.userProgress[index];
            const q = Test.state.allQuestions[index];
            btn.className = 'index-btn';
            btn.classList.add(p.status);
            if (index === Test.state.currentQuestionIndex) btn.classList.add('current');
            btn.style.display = q.subject === Test.state.currentSubject ? 'block' : 'none';
        });
    },
    
    updateLegend() {
        const counts = { answered: 0, notAnswered: 0, notVisited: 0, marked: 0, answeredMarked: 0 };
        Test.state.userProgress.forEach(p => {
            if (p.status === 'answered') counts.answered++;
            else if (p.status === 'not-answered') counts.notAnswered++;
            else if (p.status === 'not-visited') counts.notVisited++;
            else if (p.status === 'marked') counts.marked++;
            else if (p.status === 'answered-marked') counts.answeredMarked++;
        });
        Test.elements.indexLegend.innerHTML = `
            <div class="legend-item"><span class="legend-box answered">${counts.answered}</span> Answered</div>
            <div class="legend-item"><span class="legend-box not-answered">${counts.notAnswered}</span> Not Answered</div>
            <div class="legend-item"><span class="legend-box not-visited">${counts.notVisited}</span> Not Visited</div>
            <div class="legend-item"><span class="legend-box marked">${counts.marked}</span> Marked</div>
            <div class="legend-item"><span class="legend-box answered-marked">${counts.answeredMarked}</span> Ans & Marked</div>
        `;
    },

    showSummary() {
        const counts = { total: Test.state.allQuestions.length, answered: 0, notAnswered: 0, notVisited: 0, marked: 0, answeredMarked: 0 };
        Test.state.userProgress.forEach(p => {
            if (p.status === 'answered') counts.answered++;
            else if (p.status === 'not-answered') counts.notAnswered++;
            else if (p.status === 'not-visited') counts.notVisited++;
            else if (p.status === 'marked') counts.marked++;
            else if (p.status === 'answered-marked') counts.answeredMarked++;
        });

        document.getElementById('summary-total').textContent = counts.total;
        document.getElementById('summary-answered').textContent = counts.answered + counts.answeredMarked;
        document.getElementById('summary-not-answered').textContent = counts.notAnswered;
        document.getElementById('summary-not-visited').textContent = counts.notVisited;
        document.getElementById('summary-marked').textContent = counts.marked;
        document.getElementById('summary-answered-marked').textContent = counts.answeredMarked;
        
        Test.navigateToView('summary-page');
    },

    generateResults(analysis) {
        const { testTitle, results } = analysis;
        const resultsPage = document.getElementById('results-page');
        resultsPage.innerHTML = `
        <div class="results-content">
            <div class="results-header">
                <h2>Results: ${testTitle}</h2>
                <div class="results-actions">
                    <button id="advanced-analysis-btn">Advanced Analysis</button>
                    <button id="view-solutions-btn">View Solutions</button>
                    <button id="save-analysis-btn">Save Analysis</button>
                </div>
            </div>
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
        </div>`;
        document.getElementById('view-solutions-btn').onclick = () => Test.enterAnalysisMode();
        document.getElementById('advanced-analysis-btn').onclick = () => alert('Advanced Analysis coming soon!');
        document.getElementById('save-analysis-btn').onclick = () => alert('Save Analysis coming soon!');
    },
    
    enterAnalysisMode() {
        alert("Entering Analysis Mode. Note: This is a feature in development.");
        // This is where you would transition to the analysis view.
        // For now, it just shows an alert.
    },
    
    // --- UTILITIES ---
    cacheDOMElements() {
        this.elements.timerDisplay = document.getElementById('timer-display');
        this.elements.testName = document.getElementById('test-name');
        this.elements.questionNumberDisplay = document.getElementById('question-number-display');
        this.elements.marksDisplay = document.getElementById('marks-display');
        this.elements.typeDisplay = document.getElementById('type-display');
        this.elements.questionImage = document.getElementById('question-image');
        this.elements.mcqOptionsContainer = document.getElementById('mcq-options');
        this.elements.integerInputArea = document.getElementById('integer-input-area');
        this.elements.integerAnswerInput = document.getElementById('integer-answer');
        this.elements.questionIndexGrid = document.getElementById('question-index-grid');
        this.elements.indexLegend = document.querySelector('.index-legend');
        this.elements.subjectTabs = document.querySelectorAll('.subject-tab');
    },

    bindEvents() {
        document.getElementById('save-next-btn').onclick = () => this.handleAction('save-next');
        document.getElementById('mark-next-btn').onclick = () => this.handleAction('mark-next');
        document.getElementById('save-mark-btn').onclick = () => this.handleAction('save-mark');
        document.getElementById('clear-btn').onclick = () => {
            const p = this.state.userProgress[this.state.currentQuestionIndex];
            p.response = null;
            if (p.status === 'answered' || p.status === 'answered-marked') {
                p.status = p.status === 'answered' ? 'not-answered' : 'marked';
            }
            this.loadQuestion(this.state.currentQuestionIndex);
        };
        document.getElementById('back-btn').onclick = () => {
            if (this.state.currentQuestionIndex > 0) this.loadQuestion(this.state.currentQuestionIndex - 1);
        };
        document.getElementById('next-btn').onclick = () => {
            if (this.state.currentQuestionIndex < this.state.allQuestions.length - 1) this.loadQuestion(this.state.currentQuestionIndex + 1);
        };
        document.getElementById('submit-test-btn').onclick = () => this.showSummary();
        document.getElementById('resume-btn').onclick = () => this.navigateToView('test-page');
        document.getElementById('final-submit-btn').onclick = () => this.finishTest();
    },

    wrapScrollableContent() {
        const questionArea = document.querySelector('.question-area');
        if (!questionArea || questionArea.querySelector('.question-scroll-container')) return;

        const scrollContainer = document.createElement('div');
        scrollContainer.className = 'question-scroll-container';

        const elementsToWrap = [
            questionArea.querySelector('.question-container'),
            questionArea.querySelector('.answer-area'),
            questionArea.querySelector('#per-question-analysis-box')
        ];

        elementsToWrap.forEach(el => {
            if (el) scrollContainer.appendChild(el);
        });

        // Insert the scroll container after the subject tabs
        const subjectTabs = questionArea.querySelector('.subject-tabs');
        subjectTabs.after(scrollContainer);
    }
};

export default Test;
