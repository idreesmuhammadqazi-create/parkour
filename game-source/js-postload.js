window.addEventListener('load', function() {
    if (window.parent && window.parent !== window) {
        window.parent.postMessage({type: 'game-loaded'}, '*');
    }
});
