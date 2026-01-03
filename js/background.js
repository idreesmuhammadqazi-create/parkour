/**
 * Firefox-Compatible Background Script
 * Converted from Chrome Manifest V3 to Firefox Manifest V2
 * 
 * Key changes:
 * - Uses browser.* APIs instead of chrome.*
 * - Uses background script instead of service worker
 * - Includes browser polyfill for cross-browser compatibility
 */

import info from '/info.mjs';

// Use browser API (with fallback to chrome for compatibility)
const api = typeof browser !== 'undefined' ? browser : chrome;

/**
 * Handle extension icon click
 * Opens the game in a new tab
 */
api.browserAction.onClicked.addListener((tab) => {
  api.tabs.create({
    url: api.runtime.getURL('game.html')
  });
});

/**
 * Handle extension installation
 * Sets uninstall URL and opens game on first install
 */
api.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    // Set uninstall URL for tracking
    const uninstallUrl = `${info.domain}/uninstall?i=${api.runtime.id}&n=${api.i18n.getMessage('extensionGameTitle')}&s=${info.symbolStr}&c=${info.category}`;
    
    // Firefox doesn't support setUninstallURL, so we'll just log it
    if (api.runtime.setUninstallURL) {
      api.runtime.setUninstallURL(uninstallUrl);
    } else {
      console.log('Uninstall URL (Firefox doesn\'t support setUninstallURL):', uninstallUrl);
    }

    // Open install tracking page
    api.tabs.create({
      url: `${info.domain}/install?i=${api.runtime.id}&n=${api.i18n.getMessage('extensionGameTitle')}&s=${info.symbolStr}&c=${info.category}`
    });

    // Open game
    api.tabs.create({
      url: api.runtime.getURL('game.html')
    });
  }
});

console.log('[Background Script] Loaded successfully for Firefox');
