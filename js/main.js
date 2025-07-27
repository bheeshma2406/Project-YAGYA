// FILE: js/main.js
// PURPOSE: The single entry point for the entire application.

import router from './router.js';

// This is the only place where the router is started.
// We wait for the entire window to load to ensure all files and the DOM are ready.
window.addEventListener('load', () => {
    router.resolve();
});
