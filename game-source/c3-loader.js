// Dynamically load c3main.egjdata as an ES6 module
// This works around Firefox extension limitations with static module imports
(async function() {
    try {
        await import('./scripts/c3main.egjdata');
    } catch (error) {
        console.error('Failed to load c3main module:', error);
    }
})();
