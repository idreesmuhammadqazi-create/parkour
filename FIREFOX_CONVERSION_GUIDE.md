# Converting Parkour Chrome Extension to Firefox

## Overview
This guide explains how to convert the Parkour Chrome extension (Manifest V3) to work with Firefox. The extension is a game launcher that opens a game in a new tab when clicked.

## Key Differences Between Chrome and Firefox Extensions

### 1. **Manifest Version**
- **Chrome**: Uses Manifest V3 (required for new extensions)
- **Firefox**: Supports Manifest V2 and V3 (V3 support is newer)
- **Recommendation**: Use Manifest V2 for broader compatibility

### 2. **API Differences**
| Feature | Chrome | Firefox |
|---------|--------|---------|
| `chrome.*` APIs | ✅ Native | ⚠️ Use `browser.*` instead |
| `chrome.action` | ✅ Supported | ✅ Supported (but use `browser.action`) |
| `chrome.tabs` | ✅ Supported | ✅ Supported (but use `browser.tabs`) |
| `chrome.runtime` | ✅ Supported | ✅ Supported (but use `browser.runtime`) |
| `chrome.i18n` | ✅ Supported | ✅ Supported (but use `browser.i18n`) |
| Service Workers | ✅ Manifest V3 | ⚠️ Use background scripts instead |

### 3. **Service Workers vs Background Scripts**
- **Chrome MV3**: Uses Service Workers (`"service_worker"`)
- **Firefox**: Prefers persistent background scripts (`"scripts"`)

## Step-by-Step Conversion

### Step 1: Create Firefox Manifest (manifest.json)

Replace the current manifest with a Firefox-compatible version:

```json
{
  "manifest_version": 2,
  "name": "__MSG_extensionName__",
  "version": "1.0.5",
  "description": "__MSG_extensionDescription__",
  "default_locale": "en",
  
  "icons": {
    "128": "icon/128.png"
  },
  
  "browser_action": {
    "default_title": "__MSG_extensionActionTitle__"
  },
  
  "background": {
    "scripts": ["js/background.js"]
  },
  
  "web_accessible_resources": [
    "/game-source/box2d.wasm",
    "/game-source/box2d.wasm.egjdata",
    "/game-source/data.json",
    "/game-source/file.css",
    "/game-source/images/*",
    "/game-source/media/*",
    "/game-source/panko1.scon",
    "/game-source/readme.md",
    "/game-source/scripts/*",
    "/game-source/style.css"
  ],
  
  "permissions": [
    "tabs",
    "activeTab",
    "storage"
  ]
}
```

### Step 2: Update background.js

Convert Chrome API calls to Firefox-compatible code:

**Current (Chrome):**
```javascript
chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.create({
        url: 'game.html'
    });
});
```

**Updated (Firefox):**
```javascript
browser.browserAction.onClicked.addListener((tab) => {
    browser.tabs.create({
        url: browser.runtime.getURL('game.html')
    });
});
```

### Step 3: Create a Polyfill (Optional but Recommended)

Create a file `js/browser-polyfill.js` to handle both Chrome and Firefox:

```javascript
// Polyfill for cross-browser compatibility
if (typeof browser === 'undefined') {
    window.browser = chrome;
}
```

Then include it in your HTML files before other scripts:
```html
<script src="/js/browser-polyfill.js"></script>
```

### Step 4: Update game.html

Add the polyfill script at the top of the `<head>`:

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
    <script src="/js/browser-polyfill.js"></script>
    <link rel="stylesheet" href="/css/style.css">
    <script defer type="module" src="/js/game.js"></script>
</head>
```

### Step 5: Update game.js

If `game.js` uses Chrome APIs, update them:

**Chrome:**
```javascript
chrome.runtime.getURL('path/to/resource')
```

**Firefox:**
```javascript
browser.runtime.getURL('path/to/resource')
```

## Testing in Firefox

### Method 1: Temporary Installation (Development)

1. Open Firefox
2. Go to `about:debugging#/runtime/this-firefox`
3. Click "Load Temporary Add-on"
4. Select the `manifest.json` file from your extension folder
5. The extension will load temporarily (until Firefox restarts)

### Method 2: Permanent Installation (Requires Signing)

1. Package the extension as a ZIP file
2. Submit to [Firefox Add-ons](https://addons.mozilla.org/)
3. After review and signing, users can install it

## Common Issues and Solutions

### Issue 1: "browser is not defined"
**Solution**: Add the polyfill script or use the conditional check:
```javascript
const api = typeof browser !== 'undefined' ? browser : chrome;
```

### Issue 2: Service Worker not working
**Solution**: Firefox doesn't support Service Workers in extensions. Use background scripts instead.

### Issue 3: Web Accessible Resources not loading
**Solution**: Ensure paths in `web_accessible_resources` match your file structure exactly.

### Issue 4: WASM files not loading
**Solution**: Make sure `.wasm` files are listed in `web_accessible_resources` and served with correct MIME types.

## File Structure

```
parkour/
├── manifest.json (UPDATED for Firefox)
├── game.html
├── js/
│   ├── background.js (UPDATED)
│   ├── browser-polyfill.js (NEW)
│   ├── game.js
│   └── ...
├── css/
│   └── style.css
├── images/
│   └── ...
├── icon/
│   └── 128.png
├── game-source/
│   ├── box2d.wasm
│   ├── images/
│   ├── media/
│   ├── scripts/
│   └── ...
└── _locales/
    └── en/
        └── messages.json
```

## Manifest V3 vs V2 Comparison

### Manifest V3 (Chrome - Current)
```json
{
  "manifest_version": 3,
  "action": { ... },
  "background": {
    "service_worker": "/js/background.js"
  }
}
```

### Manifest V2 (Firefox - Recommended)
```json
{
  "manifest_version": 2,
  "browser_action": { ... },
  "background": {
    "scripts": ["js/background.js"]
  }
}
```

## Additional Resources

- [Firefox Extension Development Documentation](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions)
- [Chrome to Firefox Migration Guide](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Chrome_incompatibilities)
- [WebExtensions API Reference](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API)

## Summary of Changes Required

1. ✅ Create Firefox-compatible `manifest.json` (Manifest V2)
2. ✅ Update `background.js` to use `browser.*` APIs
3. ✅ Add `browser-polyfill.js` for compatibility
4. ✅ Update HTML files to include polyfill
5. ✅ Test in Firefox using `about:debugging`
6. ✅ Verify all resources load correctly
7. ✅ Test extension functionality

## Next Steps

1. Follow the steps above to create the Firefox version
2. Test thoroughly in Firefox
3. Consider maintaining both Chrome and Firefox versions
4. Use the polyfill approach for easier maintenance
