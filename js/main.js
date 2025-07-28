// FILE: js/main.js
// PURPOSE: The single entry point for the entire application.

import router from './router.js';

// This function runs when the entire page is loaded
window.addEventListener('load', () => {
    // The resolve method handles initial loading based on the URL
    // or navigates to the root if no route is specified.
    router.resolve();

    // If the page loads at the root (e.g., "index.html" with no hash),
    // explicitly navigate to the homepage to ensure the URL is clean.
    if (window.location.hash === '') {
        router.navigate('/');
    }
});
