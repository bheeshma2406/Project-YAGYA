// FILE: js/router.js
// PURPOSE: Defines all application routes and how to load pages.

// Import page modules
import Dashboard from './pages/dashboard.js';
import Test from './pages/test.js';
import Analysis from './pages/analysis.js';
import Bookmarks from './pages/bookmarks.js'; // <-- ADD THIS LINE

// Initialize the router
const router = new Navigo('/', { hash: true });

// Helper function to load page content into the main container
const loadPage = async (pageModule, params = null) => {
    const appContainer = document.getElementById('app-container');
    if (!appContainer) {
        console.error("Fatal Error: #app-container not found in DOM.");
        return;
    }
    
    appContainer.innerHTML = '<div class="loading-spinner"></div>';
    document.body.className = pageModule.theme || 'dark-mode';
    
    try {
        const html = await pageModule.render();
        appContainer.innerHTML = html;

        if (pageModule.after_render) {
            await pageModule.after_render(params);
        }
        
        router.updatePageLinks();

    } catch (err) {
        console.error("Error loading page:", err);
        appContainer.innerHTML = `
            <div style="padding: 40px; text-align: center; color: #ffcccc;">
                <h2>Failed to Load Page Content</h2>
                <p><i>Error: ${err.message}</i></p>
            </div>
        `;
    }
};

// Define all the routes for the application
router.on({
    '/': () => loadPage(Dashboard),
    '/bookmarks': () => loadPage(Bookmarks), // <-- ADD THIS LINE
    '/test/:id': ({ data }) => loadPage(Test, data.id),
    '/analysis/:id': ({ data }) => loadPage(Analysis, data.id),
});

// A catch-all for any route that is not found
router.notFound(() => {
    const appContainer = document.getElementById('app-container');
    appContainer.innerHTML = '<h2>404 - Page Not Found</h2>';
    console.warn(`Navigo: route not found for ${window.location.hash}`);
});

// Make the router instance globally available
window.router = router;

// Export the router to be started by main.js
export default router;
