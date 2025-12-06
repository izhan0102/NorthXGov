// Analytics tracking script - add this to all website pages
(function() {
    'use strict';
    
    // Only track if not on admin pages
    if (window.location.pathname.includes('admin') || window.location.pathname.includes('dashboard')) {
        return;
    }

    // Import Firebase modules
    import('https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js')
        .then(({ initializeApp }) => {
            return Promise.all([
                import('https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js'),
                initializeApp({
                    apiKey: "AIzaSyB0ZxOJXUu9a9gtWq8MzLfvNxOaW75BrsA",
                    authDomain: "northxgov.firebaseapp.com",
                    projectId: "northxgov"
                })
            ]);
        })
        .then(([{ getFirestore, addDoc, collection }, app]) => {
            const db = getFirestore(app);
            
            // Get visitor location and log visit
            return fetch('https://ipapi.co/json/')
                .then(response => response.json())
                .then(async (locationData) => {
                    const visitData = {
                        timestamp: Date.now(),
                        path: window.location.pathname,
                        ip: locationData.ip || 'unknown',
                        city: locationData.city || 'unknown',
                        country: locationData.country_name || 'unknown',
                        latitude: locationData.latitude || 0,
                        longitude: locationData.longitude || 0,
                        device: navigator.userAgent,
                        referrer: document.referrer || 'direct',
                        userAgent: navigator.userAgent,
                        language: navigator.language,
                        screenResolution: `${screen.width}x${screen.height}`,
                        viewportSize: `${window.innerWidth}x${window.innerHeight}`
                    };

                    // Log to Firestore
                    await addDoc(collection(db, 'traffic'), visitData);
                })
                .catch(error => {
                    // Fallback tracking without location if IP API fails
                    const visitData = {
                        timestamp: Date.now(),
                        path: window.location.pathname,
                        ip: 'unknown',
                        city: 'unknown',
                        country: 'unknown',
                        latitude: 0,
                        longitude: 0,
                        device: navigator.userAgent,
                        referrer: document.referrer || 'direct',
                        userAgent: navigator.userAgent,
                        language: navigator.language,
                        screenResolution: `${screen.width}x${screen.height}`,
                        viewportSize: `${window.innerWidth}x${window.innerHeight}`
                    };

                    return addDoc(collection(db, 'traffic'), visitData);
                });
        })
        .catch(error => {
            // Silently fail - don't break the website if tracking fails
            console.warn('Analytics tracking failed:', error);
        });
})();