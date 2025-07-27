// js/pages/dashboard.js

const Dashboard = {
    render: async () => {
        // Fetch the HTML for the dashboard
        const response = await fetch('/pages/dashboard.html');
        const html = await response.text();
        return html;
    },
    after_render: async () => {
        // This function is called after the HTML is inserted into the DOM
        console.log("Dashboard page rendered. Initializing logic.");
        
        const testListEl = document.getElementById('test-list');
        const loadAnalysisBtn = document.getElementById('load-analysis-btn');
        const analysisFileInput = document.getElementById('analysis-file-input');

        // Check if test manifest is loaded
        if (typeof allTests === 'undefined' || !Array.isArray(allTests)) {
            testListEl.innerHTML = `<p style="padding: 20px;">Error: test-manifest.js not found or invalid.</p>`;
            return;
        }

        // Populate the test list
        testListEl.innerHTML = allTests.map(test => `
            <div class="test-item">
                <span class="test-item-title">${test.title}</span>
                <span class="test-item-date">${test.date}</span>
                <span class="test-item-status">Not Attempted</span>
                <div class="test-item-actions">
                    <a href="/test/${test.id}" data-navigo class="action-btn start-test-btn" style="text-decoration: none;">Start Test</a>
                </div>
            </div>
        `).join('');
        
        // Event listener for loading analysis files
        loadAnalysisBtn.addEventListener('click', () => analysisFileInput.click());
        analysisFileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const analysisData = JSON.parse(event.target.result);
                    if (analysisData.version && analysisData.version.startsWith("YAGYA")) {
                        // Save to localStorage to pass it to the analysis page
                        localStorage.setItem('loadedAnalysisData', JSON.stringify(analysisData));
                        // Navigate to the analysis page (we will create this route later)
                        window.router.navigate('/analysis');
                    } else {
                        alert("Invalid or corrupted analysis file.");
                    }
                } catch (error) {
                    console.error("Error parsing analysis file:", error);
                    alert("Could not parse the selected file.");
                }
            };
            reader.readAsText(file);
            e.target.value = ''; // Reset input
        });
    }
};

// Export the object for the router to use
export default Dashboard;