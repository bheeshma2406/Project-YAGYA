// FILE: js/pages/dashboard.js

const Dashboard = {
    theme: 'dark-mode', // <-- ADD THIS LINE (OPTIONAL BUT RECOMMENDED)

    render: async () => {
        const response = await fetch('pages/dashboard.html');
        if (!response.ok) {
            throw new Error(`Failed to fetch dashboard.html: ${response.statusText}`);
        }
        return await response.text();
    },
    after_render: async () => {
        console.log("Dashboard logic initialized.");
        
        const testListEl = document.getElementById('test-list');
        const historyListEl = document.getElementById('sidebar-history-list');

        // --- 1. Render the list of available tests ---
        if (typeof allTests !== 'undefined' && Array.isArray(allTests)) {
            testListEl.innerHTML = allTests.map(test => `
                <div class="test-item">
                    <span class="test-item-title">${test.title}</span>
                    <span class="test-item-date">${test.date}</span>
                    <span class="test-item-status">Not Attempted</span>
                    <div class="test-item-actions">
                        <a href="/test/${test.id}" data-navigo class="action-btn start-test-btn">Start Test</a>
                    </div>
                </div>
            `).join('');
        } else {
             testListEl.innerHTML = `<div class="test-item"><p>Error: test-manifest.js not found or invalid.</p></div>`;
        }

        // --- 2. Fetch and render the test history from Firebase ---
        if (!historyListEl) {
            console.error("Sidebar history list element not found!");
            return;
        }

        historyListEl.innerHTML = `<p class="history-loading">Loading history...</p>`;

        try {
            // **THE FIX: Use the v8 compatibility syntax which works with the loaded scripts**
            if (!window.db) throw new Error("Firestore (window.db) is not initialized.");
            
            const querySnapshot = await window.db
                .collection("testResults")
                .orderBy("attemptedOn", "desc")
                .get();
            
            if (querySnapshot.empty) {
                historyListEl.innerHTML = `<p class="history-empty">No test history found.</p>`;
                return;
            }

            const historyHTML = querySnapshot.docs.map(doc => {
                const data = doc.data();
                const attemptDate = new Date(data.attemptedOn).toLocaleString('en-IN', { day: 'numeric', month: 'short' });
                const score = data.results?.totalScore ?? 'N/A';

                return `
                    <a href="/analysis/${doc.id}" data-navigo class="sidebar-history-item">
                        <p class="title">${data.testTitle}</p>
                        <div class="details">
                            <span>${attemptDate}</span>
                            <span>Score: ${score}</span>
                        </div>
                    </a>
                `;
            }).join('');
            
            historyListEl.innerHTML = historyHTML;

        } catch (error) {
            console.error("Error fetching test history: ", error);
            historyListEl.innerHTML = `<p class="history-error">Error loading history.</p>`;
            // Log the specific Firestore error to the console for better debugging
            if (error.code) {
                 console.error(`Firestore Error Code: ${error.code}`);
                 console.error(`Firestore Error Message: ${error.message}`);
            }
        }
    }
};

export default Dashboard;
