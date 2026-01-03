// Skin Price Modifier - Sets all skin prices to 500 gold
(function() {
    console.log('[Skin Mod] Initializing skin price modifier...');

    // Wait for localStorage to be available and game to load
    function modifySkinPrices() {
        try {
            // Get all localStorage keys
            const keys = Object.keys(localStorage);
            let modified = false;

            // Look for skin-related data
            keys.forEach(key => {
                const value = localStorage.getItem(key);

                // Try to parse as JSON
                try {
                    const data = JSON.parse(value);

                    // Check if this contains skin price data
                    if (data && typeof data === 'object') {
                        let changed = false;

                        // Common patterns for skin prices in games
                        const priceKeys = ['price', 'cost', 'unlock', 'gold', 'coins'];

                        function modifyPrices(obj) {
                            for (let k in obj) {
                                if (typeof obj[k] === 'object' && obj[k] !== null) {
                                    modifyPrices(obj[k]);
                                } else if (priceKeys.some(pk => k.toLowerCase().includes(pk))) {
                                    if (typeof obj[k] === 'number' && obj[k] !== 500) {
                                        console.log(`[Skin Mod] Changing ${k} from ${obj[k]} to 500`);
                                        obj[k] = 500;
                                        changed = true;
                                    }
                                }
                            }
                        }

                        modifyPrices(data);

                        if (changed) {
                            localStorage.setItem(key, JSON.stringify(data));
                            modified = true;
                            console.log(`[Skin Mod] Modified key: ${key}`);
                        }
                    }
                } catch (e) {
                    // Not JSON, skip
                }
            });

            if (modified) {
                console.log('[Skin Mod] Skin prices modified! Reload the game to see changes.');
            } else {
                console.log('[Skin Mod] No skin prices found yet. Game may need to run first.');
            }
        } catch (error) {
            console.error('[Skin Mod] Error:', error);
        }
    }

    // Run after a delay to let game initialize
    setTimeout(modifySkinPrices, 3000);
    setTimeout(modifySkinPrices, 6000);
    setTimeout(modifySkinPrices, 10000);

    // Also expose function globally for manual trigger
    window.modifySkinPrices = modifySkinPrices;
    console.log('[Skin Mod] Loaded! Call window.modifySkinPrices() to manually trigger.');
})();
