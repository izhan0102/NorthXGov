// Analytics tracking script - add this to all website pages
// Tracks unique visitors only once per 24 hours per device/browser
(function() {
    'use strict';
    
    // Only track if not on admin pages
    if (window.location.pathname.includes('admin') || window.location.pathname.includes('dashboard')) {
        return;
    }

    // Check if this visitor has already been tracked
    const visitorId = 'northxgov_visitor_tracked';
    const lastVisit = localStorage.getItem(visitorId);
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    
    // Only track if never visited or last visit was more than 24 hours ago
    if (!lastVisit || (now - parseInt(lastVisit)) > oneDay) {

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
                        // Generate unique visitor ID based on browser fingerprint
                        const fingerprint = btoa(navigator.userAgent + screen.width + screen.height + navigator.language).substring(0, 16);
                        
                        const visitData = {
                            timestamp: now,
                            visitorId: fingerprint,
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
                            viewportSize: `${window.innerWidth}x${window.innerHeight}`,
                            isNewVisitor: !lastVisit
                        };

                        // Log to Firestore
                        await addDoc(collection(db, 'traffic'), visitData);
                        
                        // Mark this visitor as tracked
                        localStorage.setItem(visitorId, now.toString());
                    })
                    .catch(error => {
                        // Fallback tracking without location if IP API fails
                        const fingerprint = btoa(navigator.userAgent + screen.width + screen.height + navigator.language).substring(0, 16);
                        
                        const visitData = {
                            timestamp: now,
                            visitorId: fingerprint,
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
                            viewportSize: `${window.innerWidth}x${window.innerHeight}`,
                            isNewVisitor: !lastVisit
                        };

                        return addDoc(collection(db, 'traffic'), visitData).then(() => {
                            localStorage.setItem(visitorId, now.toString());
                        });
                    });
            })
            .catch(error => {
                // Silently fail - don't break the website if tracking fails
                console.warn('Analytics tracking failed:', error);
            });
    }
})();