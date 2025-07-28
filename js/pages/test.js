// FILE: js/pages/test.js

// Helper function to load a script dynamically
const loadScript = (src) => {
    return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
            resolve();
            return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Script load error for ${src}`));
        document.head.appendChild(script);
    });
};

// Helper function to clean data before saving to Firebase.
const sanitizeForFirebase = (obj) => {
    return JSON.parse(JSON.stringify(obj, (key, value) => {
        return (value === undefined) ? null : value;
    }));
};

const Test = {
    theme: 'light-mode', // <-- ADD THIS LINE
    state: {
        currentTest: null,
        allQuestions: [],
        userProgress: [],
        timerInterval: null,
        totalDurationInSeconds: null,
        currentQuestionIndex: 0,
        currentSubject: 'Physics',
        timeSpentOnCurrentQuestionStart: null,
    },
    elements: {},
    render: async () => {
        const response = await fetch('pages/test.html');
        if (!response.ok) throw new Error('Failed to fetch test.html');
        return await response.text();
    },
    after_render: async (id) => {
        console.log(`Test page rendered for test ID: ${id}`);
        
        Test.state.currentTest = allTests.find(t => t.id === id);
        if (!Test.state.currentTest) {
            alert(`Error: Test with ID "${id}" not found.`);
            return window.router.navigate('/');
        }

        try {
            await loadScript(Test.state.currentTest.questionsFile);
            if (typeof testQuestions === 'undefined') throw new Error('testQuestions variable not found in script.');
            
            Test.state.allQuestions = JSON.parse(JSON.stringify(testQuestions));
            Test.showInstructions();

        } catch (error) {
            console.error(error);
            alert(`Failed to load question file: ${Test.state.currentTest.questionsFile}`);
            window.router.navigate('/');
        }
    },
    navigateToView(viewName) {
        const views = ['instructions-page', 'test-page', 'summary-page'];
        views.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = 'none';
        });

        const targetView = document.getElementById(viewName);
        if (targetView) targetView.style.display = 'flex';

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
                <div class="instructions-buttons">
                    <button id="back-to-dashboard-btn">Back</button>
                    <button id="start-test-btn-from-instructions">I am ready to begin</button>
                </div>
            </div>`;
        
        document.getElementById('start-test-btn-from-instructions').onclick = () => Test.startTest();
        document.getElementById('back-to-dashboard-btn').onclick = () => window.router.navigate('/');
        
        Test.navigateToView('instructions-page');
    },
    startTest() {
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
        Test.elements.testName.textContent = Test.state.currentTest.title;
        Test.bindEvents();
        Test.wrapScrollableContent(); 
        Test.buildQuestionIndex();
        Test.startTimer();
        Test.loadQuestion(0);
        Test.navigateToView('test-page');
    },
    async finishTest() {
        clearInterval(Test.state.timerInterval);
        Test.state.timerInterval = null;
        
        Test.recordTimeOnCurrentQuestion();

        const appContainer = document.getElementById('app-container');
        appContainer.innerHTML = '<div class="loading-spinner"></div><h2>Calculating and saving results...</h2>';

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
            const hasAnswered = p.status === 'answered' || p.status === 'answered-marked';
            const section = results.sections[q.subject];
            const marks = q.marks;

            results.totalMaxMarks += marks.correct;
            section.total++;
            section.maxMarks += marks.correct;
            
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

        const finalAnalysis = { 
            version: "YAGYA-v1.0",
            testId: Test.state.currentTest.id,
            testTitle: Test.state.currentTest.title,
            attemptedOn: new Date().toISOString(),
            results: results, 
            userProgress: Test.state.userProgress, 
            allQuestions: Test.state.allQuestions,
        };
        
        try {
            if (!window.db) throw new Error("Firestore (window.db) not available");
            
            const cleanData = sanitizeForFirebase(finalAnalysis);
            const docRef = await window.db.collection("testResults").add(cleanData);
            
            console.log("%cSUCCESS: Test result saved with ID: " + docRef.id, "color: green; font-weight: bold;");
            
            window.router.navigate(`/analysis/${docRef.id}`);

        } catch (e) {
            console.error("%cERROR: Failed to save result to Firestore:", "color: red; font-weight: bold;", e);
            alert("There was an error saving your results. Please check the console.");
            window.router.navigate('/');
        }
    },
    startTimer() {
        const timer = () => {
            if (Test.state.totalDurationInSeconds <= 0) {
                clearInterval(Test.state.timerInterval);
                alert("Time is up!");
                Test.finishTest();
                return;
            }
            Test.state.totalDurationInSeconds--;
            const h = String(Math.floor(Test.state.totalDurationInSeconds / 3600)).padStart(2, '0');
            const m = String(Math.floor((Test.state.totalDurationInSeconds % 3600) / 60)).padStart(2, '0');
            const s = String(Test.state.totalDurationInSeconds % 60).padStart(2, '0');
            if(Test.elements.timerDisplay) Test.elements.timerDisplay.textContent = `${h}:${m}:${s}`;
        };
        timer();
        Test.state.timerInterval = setInterval(timer, 1000);
    },
    recordTimeOnCurrentQuestion() {
        if (Test.state.timeSpentOnCurrentQuestionStart === null) return;
        
        const timeDelta = (Date.now() - Test.state.timeSpentOnCurrentQuestionStart) / 1000;
        const progress = Test.state.userProgress[Test.state.currentQuestionIndex];
        if (progress) {
            progress.timeSpent = (progress.timeSpent || 0) + timeDelta;
        }
    },
    loadQuestion(index) {
        this.recordTimeOnCurrentQuestion();

        this.state.currentQuestionIndex = index;
        const q = this.state.allQuestions[index];
        const p = this.state.userProgress[index];

        if (p.status === 'not-visited') p.status = 'not-answered';

        this.elements.questionNumberDisplay.textContent = index + 1;
        this.elements.marksDisplay.textContent = `+${q.marks.correct} / ${q.marks.incorrect}`;
        this.elements.typeDisplay.textContent = q.type.toUpperCase();
        this.elements.questionImage.src = q.image ? `test-images/${q.image}` : '';
        this.elements.questionImage.alt = q.image ? `Question ${index+1}` : 'Question image not available.';

        this.state.currentSubject = q.subject;
        this.elements.subjectTabs.forEach(t => t.classList.toggle('active', t.dataset.subject === this.state.currentSubject));

        if (q.type === 'mcq') {
            this.elements.mcqOptionsContainer.style.display = 'block';
            this.elements.integerInputArea.style.display = 'none';
            this.elements.mcqOptionsContainer.innerHTML = q.options.map((opt, i) => `
                <div class="option ${p.response === i ? 'selected' : ''}" data-index="${i}">
                    <div class="option-radio"></div>
                    <div class="option-text">${opt}</div>
                </div>
            `).join('');
            this.elements.mcqOptionsContainer.querySelectorAll('.option').forEach(opt => {
                opt.onclick = () => this.selectOption(parseInt(opt.dataset.index));
            });
        } else {
            this.elements.mcqOptionsContainer.style.display = 'none';
            this.elements.integerInputArea.style.display = 'block';
            this.elements.integerAnswerInput.value = p.response ?? '';
        }

        this.updateUI();
        
        this.state.timeSpentOnCurrentQuestionStart = Date.now();
    },
    selectOption(optionIndex) {
        const p = this.state.userProgress[this.state.currentQuestionIndex];
        p.response = p.response === optionIndex ? null : optionIndex;
        
        const q = this.state.allQuestions[this.state.currentQuestionIndex];
        this.elements.mcqOptionsContainer.innerHTML = q.options.map((opt, i) => `
            <div class="option ${p.response === i ? 'selected' : ''}" data-index="${i}">
                <div class="option-radio"></div>
                <div class="option-text">${opt}</div>
            </div>
        `).join('');
        this.elements.mcqOptionsContainer.querySelectorAll('.option').forEach(opt => {
            opt.onclick = () => this.selectOption(parseInt(opt.dataset.index));
        });
    },
    handleAction(action) {
        const p = this.state.userProgress[this.state.currentQuestionIndex];
        const q = this.state.allQuestions[this.state.currentQuestionIndex];
        
        if (q.type === 'integer') {
            const val = this.elements.integerAnswerInput.value.trim();
            p.response = val === '' ? null : val;
        }
        
        const hasResponse = p.response !== null;
        
        if (action === 'save-next') {
             p.status = hasResponse ? 'answered' : 'not-answered';
        } else if (action === 'mark-next') {
            p.status = hasResponse ? 'answered-marked' : 'marked';
        } else if (action === 'save-mark') {
            p.status = hasResponse ? 'answered-marked' : 'marked';
        }

        if (action.includes('next')) {
            if (this.state.currentQuestionIndex < this.state.allQuestions.length - 1) {
                this.loadQuestion(this.state.currentQuestionIndex + 1);
            } else {
                this.updateUI();
            }
        } else {
            this.updateUI();
        }
    },
    updateUI() {
        this.updateQuestionIndex();
        this.updateLegend();
    },
    buildQuestionIndex() {
        this.elements.questionIndexGrid.innerHTML = this.state.allQuestions.map((_, index) => 
            `<button class="index-btn" data-index="${index}">${index + 1}</button>`
        ).join('');
        this.elements.questionIndexGrid.querySelectorAll('.index-btn').forEach(btn => {
            btn.onclick = (e) => this.loadQuestion(parseInt(e.target.dataset.index));
        });
    },
    updateQuestionIndex() {
        if (!this.elements.questionIndexGrid) return;
        this.elements.questionIndexGrid.querySelectorAll('.index-btn').forEach(btn => {
            const index = parseInt(btn.dataset.index);
            const p = this.state.userProgress[index];
            const q = this.state.allQuestions[index];
            btn.className = 'index-btn';
            btn.classList.add(p.status);
            if (index === this.state.currentQuestionIndex) btn.classList.add('current');
            btn.style.display = (q.subject === this.state.currentSubject) ? 'flex' : 'none';
        });
    },
    updateLegend() {
        const counts = { answered: 0, notAnswered: 0, notVisited: 0, marked: 0, answeredMarked: 0 };
        this.state.userProgress.forEach(p => {
            if (p.status === 'answered') counts.answered++;
            else if (p.status === 'not-answered') counts.notAnswered++;
            else if (p.status === 'not-visited') counts.notVisited++;
            else if (p.status === 'marked') counts.marked++;
            else if (p.status === 'answered-marked') counts.answeredMarked++;
        });
        if(this.elements.indexLegend) {
            this.elements.indexLegend.innerHTML = `
                <div class="legend-item"><span class="legend-box answered">${counts.answered}</span> Answered</div>
                <div class="legend-item"><span class="legend-box not-answered">${counts.notAnswered}</span> Not Answered</div>
                <div class="legend-item"><span class="legend-box not-visited">${counts.notVisited}</span> Not Visited</div>
                <div class="legend-item"><span class="legend-box marked">${counts.marked}</span> Marked</div>
                <div class="legend-item"><span class="legend-box answered-marked">${counts.answeredMarked}</span> Ans & Marked</div>
            `;
        }
    },
    showSummary() {
        const counts = { total: this.state.allQuestions.length, answered: 0, notAnswered: 0, notVisited: 0, marked: 0, answeredMarked: 0 };
        this.state.userProgress.forEach(p => {
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
        
        this.navigateToView('summary-page');
    },
    cacheDOMElements() {
        this.elements = {
            timerDisplay: document.getElementById('timer-display'),
            testName: document.getElementById('test-name'),
            questionNumberDisplay: document.getElementById('question-number-display'),
            marksDisplay: document.getElementById('marks-display'),
            typeDisplay: document.getElementById('type-display'),
            questionImage: document.getElementById('question-image'),
            mcqOptionsContainer: document.getElementById('mcq-options'),
            integerInputArea: document.getElementById('integer-input-area'),
            integerAnswerInput: document.getElementById('integer-answer'),
            questionIndexGrid: document.getElementById('question-index-grid'),
            indexLegend: document.querySelector('.index-legend'),
            subjectTabs: document.querySelectorAll('.subject-tab'),
        };
    },
    bindEvents() {
        document.getElementById('save-next-btn').onclick = () => this.handleAction('save-next');
        document.getElementById('mark-next-btn').onclick = () => this.handleAction('mark-next');
        document.getElementById('save-mark-btn').onclick = () => this.handleAction('save-mark');
        document.getElementById('clear-btn').onclick = () => {
            const p = this.state.userProgress[this.state.currentQuestionIndex];
            p.response = null;
            if (p.status === 'answered') p.status = 'not-answered';
            if (p.status === 'answered-marked') p.status = 'marked';
            this.loadQuestion(this.state.currentQuestionIndex);
        };
        document.getElementById('back-btn').onclick = () => {
            if (this.state.currentQuestionIndex > 0) this.loadQuestion(this.state.currentQuestionIndex - 1);
        };
        document.getElementById('next-btn').onclick = () => {
            if (this.state.currentQuestionIndex < this.state.allQuestions.length - 1) this.loadQuestion(this.state.currentQuestionIndex + 1);
        };
        this.elements.subjectTabs.forEach(tab => {
            tab.onclick = () => {
                this.state.currentSubject = tab.dataset.subject;
                const firstQuestionIndex = this.state.allQuestions.findIndex(q => q.subject === this.state.currentSubject);
                if(firstQuestionIndex !== -1) this.loadQuestion(firstQuestionIndex);
            }
        });
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
        ].filter(Boolean);

        elementsToWrap.forEach(el => {
            scrollContainer.appendChild(el);
        });
        
        const subjectTabs = questionArea.querySelector('.subject-tabs');
        if (subjectTabs) {
            subjectTabs.after(scrollContainer);
        } else {
             questionArea.prepend(scrollContainer);
        }
    }
};

export default Test;
