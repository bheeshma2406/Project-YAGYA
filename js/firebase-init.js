// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASOPc-ozqYx6Jp4fANRoFdTkYWbw31Tis",
  authDomain: "project-yagya-test-platform.firebaseapp.com",
  projectId: "project-yagya-test-platform",
  storageBucket: "project-yagya-test-platform.appspot.com",
  messagingSenderId: "382779336329",
  appId: "1:382779336329:web:275df1ec6f3fdf2985c858"
};

// --- DO NOT EDIT BELOW THIS LINE ---

try {
    // Initialize Firebase using the compat library
    firebase.initializeApp(firebaseConfig);
    
    // Make the v8 Firestore instance globally available. This is the only thing we need.
    window.db = firebase.firestore();

    console.log("Firebase initialized successfully (v8 compat mode).");
} catch (e) {
    console.error("Error initializing Firebase:", e);
    const appContainer = document.getElementById('app-container');
    if (appContainer) {
        appContainer.innerHTML = `
            <div style="padding: 40px; text-align: center; color: #ffcccc;">
                <h2>Firebase Initialization Failed</h2>
                <p>Could not connect to the database. Please check your Firebase configuration in <code>js/firebase-init.js</code> and ensure you have an internet connection.</p>
                <p>See the browser console for more details.</p>
            </div>
        `;
    }
}
