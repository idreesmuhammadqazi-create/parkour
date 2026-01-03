/**
 * Browser Polyfill for Cross-Browser Extension Compatibility
 * Provides compatibility between Chrome (chrome.*) and Firefox (browser.*) APIs
 * 
 * This polyfill allows extensions to work seamlessly across both browsers
 * by providing a unified API interface.
 */

(function() {
  'use strict';

  // If browser API doesn't exist, create it as an alias to chrome
  if (typeof browser === 'undefined' && typeof chrome !== 'undefined') {
    window.browser = chrome;
  }

  // If neither browser nor chrome exists, create a mock (for testing)
  if (typeof browser === 'undefined' && typeof chrome === 'undefined') {
    window.browser = {
      runtime: {
        id: 'mock-extension-id',
        getURL: function(path) {
          return path;
        },
        onInstalled: {
          addListener: function() {}
        },
        setUninstallURL: function() {},
        onMessage: {
          addListener: function() {}
        }
      },
      action: {
        onClicked: {
          addListener: function() {}
        }
      },
      browserAction: {
        onClicked: {
          addListener: function() {}
        }
      },
      tabs: {
        create: function() {},
        query: function() {},
        sendMessage: function() {}
      },
      i18n: {
        getMessage: function(key) {
          return key;
        }
      },
      storage: {
        sync: {
          get: function() {},
          set: function() {}
        },
        local: {
          get: function() {},
          set: function() {}
        }
      }
    };
  }

  // Ensure both chrome and browser APIs are available
  if (typeof chrome === 'undefined' && typeof browser !== 'undefined') {
    window.chrome = browser;
  }

  // Polyfill for browserAction -> action (Manifest V3 compatibility)
  if (browser && browser.action && !browser.browserAction) {
    browser.browserAction = browser.action;
  }

  // Polyfill for action -> browserAction (Manifest V2 compatibility)
  if (browser && browser.browserAction && !browser.action) {
    browser.action = browser.browserAction;
  }

  // Ensure runtime.getURL is available
  if (browser && browser.runtime && !browser.runtime.getURL) {
    browser.runtime.getURL = function(path) {
      return path;
    };
  }

  // Ensure i18n.getMessage is available
  if (browser && browser.i18n && !browser.i18n.getMessage) {
    browser.i18n.getMessage = function(key, substitutions) {
      return key;
    };
  }

  // Polyfill for Promise-based APIs (Firefox uses Promises, Chrome uses callbacks)
  // This wraps callback-based APIs to work with both patterns
  if (browser && browser.tabs && browser.tabs.create) {
    const originalCreate = browser.tabs.create;
    browser.tabs.create = function(createProperties, callback) {
      const result = originalCreate.call(this, createProperties);
      
      // If it returns a Promise, handle it
      if (result && typeof result.then === 'function') {
        if (callback) {
          result.then(callback).catch(function(error) {
            console.error('Error creating tab:', error);
          });
        }
        return result;
      }
      
      // If callback is provided, call it
      if (callback) {
        callback(result);
      }
      
      return result;
    };
  }

  // Polyfill for runtime.onInstalled
  if (browser && browser.runtime && browser.runtime.onInstalled) {
    if (!browser.runtime.onInstalled.addListener) {
      browser.runtime.onInstalled.addListener = function() {};
    }
  }

  // Polyfill for action/browserAction onClicked
  if (browser && browser.action && browser.action.onClicked) {
    if (!browser.action.onClicked.addListener) {
      browser.action.onClicked.addListener = function() {};
    }
  }

  if (browser && browser.browserAction && browser.browserAction.onClicked) {
    if (!browser.browserAction.onClicked.addListener) {
      browser.browserAction.onClicked.addListener = function() {};
    }
  }

  // Ensure storage API is available
  if (browser && !browser.storage) {
    browser.storage = {
      sync: {
        get: function() {},
        set: function() {}
      },
      local: {
        get: function() {},
        set: function() {}
      }
    };
  }

  console.log('[Browser Polyfill] Loaded successfully. Using:', typeof browser !== 'undefined' ? 'browser API' : 'chrome API');
})();
