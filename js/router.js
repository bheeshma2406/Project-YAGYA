// FILE: js/router.js
// PURPOSE: Defines all application routes and how to load pages.

import Dashboard from './pages/dashboard.js';
import Test from './pages/test.js';

// Initialize the router
const router = new Navigo('/', { hash: true });

// Helper function to load page content into the main container
const loadPage = async (page, id = null) => {
    const appContainer = document.getElementById('app-container');
    if (!appContainer) {
        console.error("Fatal Error: #app-container not found in DOM.");
        return;
    }
    
    // Show a loading message while fetching content
    appContainer.innerHTML = '<h2>Loading...</h2>';
    
    const html = await page.render();

    // Directly set the innerHTML. This is simpler and often more reliable.
    appContainer.innerHTML = html;

    // Now that the content is on the page, run the after_render logic.
    // We use a setTimeout with a delay of 0. This is a standard trick
    // to push the execution to the end of the browser's event queue,
    // ensuring the DOM is fully painted and ready before the script runs.
    if (page.after_render) {
        setTimeout(async () => {
            try {
                await page.after_render(id);
                // IMPORTANT: This makes sure Navigo updates links in the new content
                router.updatePageLinks();
            } catch (err) {
                console.error("Error during after_render:", err);
                appContainer.innerHTML = `<h2>An error occurred while loading the page.</h2><p>Check the console for details.</p>`;
            }
        }, 0);
    } else {
        router.updatePageLinks();
    }
};

// Define all the routes for the application
router.on({
    '/': () => loadPage(Dashboard),
    '/test/:id': ({ data }) => loadPage(Test, data.id),
    // Future routes like '/analysis' will be added here
});

// A catch-all for any route that is not found
router.notFound(() => {
    document.getElementById('app-container').innerHTML = '<h2>404 - Page Not Found</h2>';
});

// Make the router instance globally available for convenience
window.router = router;

// Export the router to be started by main.js
export default router;
