# Firefox Installation Guide for Parkour Extension

## Quick Start

This guide will help you install and test the Parkour extension on Firefox.

## Prerequisites

- Firefox browser (version 55 or later)
- The converted Parkour extension files

## Installation Methods

### Method 1: Temporary Installation (Development/Testing) ⭐ RECOMMENDED

This method is perfect for testing and development. The extension will be loaded temporarily until Firefox restarts.

#### Steps:

1. **Open Firefox Developer Tools**
   - Press `Ctrl+Shift+K` (Windows/Linux) or `Cmd+Shift+K` (Mac)
   - Or go to Menu → More Tools → Web Developer Tools

2. **Navigate to about:debugging**
   - Type `about:debugging#/runtime/this-firefox` in the address bar
   - Press Enter

3. **Load the Extension**
   - Click the "Load Temporary Add-on" button
   - Navigate to your parkour extension folder
   - Select the `manifest-firefox.json` file
   - Click "Open"

4. **Verify Installation**
   - You should see the Parkour extension listed with:
     - Extension name
     - Version number
     - Extension ID
     - Buttons for "Inspect", "Reload", and "Remove"

5. **Test the Extension**
   - Click the Parkour extension icon in the Firefox toolbar
   - The game should open in a new tab
   - Verify all features work correctly

#### Advantages:
- ✅ No signing required
- ✅ Quick testing and iteration
- ✅ Perfect for development
- ✅ Resets on Firefox restart

#### Disadvantages:
- ❌ Extension unloads when Firefox restarts
- ❌ Not suitable for permanent installation

---

### Method 2: Permanent Installation (Requires Signing)

For permanent installation, you need to submit the extension to Mozilla's Add-ons platform.

#### Steps:

1. **Prepare Your Extension**
   - Ensure all files are in the correct structure
   - Verify `manifest-firefox.json` is valid
   - Test thoroughly using Method 1

2. **Create Mozilla Developer Account**
   - Go to [addons.mozilla.org](https://addons.mozilla.org/)
   - Click "Sign In" (top right)
   - Create a new account or sign in with existing account

3. **Submit for Review**
   - Go to [Developer Hub](https://addons.mozilla.org/developers/)
   - Click "Submit a New Add-on"
   - Choose "On This Computer" or "Upload a File"
   - Upload your extension as a ZIP file
   - Fill in required information:
     - Name
     - Summary
     - Description
     - Category
     - License
     - Screenshots (recommended)

4. **Wait for Review**
   - Mozilla will review your extension (typically 1-7 days)
   - You'll receive email notifications about the status
   - Once approved, it will be signed and available for installation

5. **Install Signed Extension**
   - After approval, download the signed `.xpi` file
   - Open Firefox
   - Drag and drop the `.xpi` file into Firefox
   - Or go to about:addons and click "Install Add-on from File"

#### Advantages:
- ✅ Permanent installation
- ✅ Available in Firefox Add-ons store
- ✅ Automatic updates
- ✅ Professional distribution

#### Disadvantages:
- ❌ Requires Mozilla review (1-7 days)
- ❌ Must follow Mozilla policies
- ❌ Longer process

---

## File Structure for Installation

Ensure your extension has this structure:

```
parkour/
├── manifest-firefox.json          ← Use this manifest for Firefox
├── game-firefox.html              ← Use this HTML file
├── js/
│   ├── browser-polyfill.js        ← NEW: Cross-browser compatibility
│   ├── background-firefox.js      ← NEW: Firefox background script
│   ├── game-firefox.js            ← NEW: Firefox game script
│   └── ... (other JS files)
├── css/
│   └── style.css
├── images/
│   └── ... (all image files)
├── icon/
│   └── 128.png
├── game-source/
│   └── ... (all game assets)
├── _locales/
│   └── en/
│       └── messages.json
└── ... (other files)
```

## Troubleshooting

### Issue 1: "manifest-firefox.json not found"
**Solution**: Make sure you're selecting the correct manifest file. The file must be named exactly `manifest-firefox.json`.

### Issue 2: Extension doesn't appear in toolbar
**Solution**: 
- Reload the extension (click "Reload" button in about:debugging)
- Check the browser console for errors (F12 → Console tab)
- Verify all file paths in manifest are correct

### Issue 3: "Game fails to load" or "Blank page"
**Solution**:
- Check browser console for errors (F12 → Console)
- Verify `game-firefox.html` is being loaded
- Check that `browser-polyfill.js` is loaded first
- Ensure all resource paths use `/` prefix (e.g., `/js/game-firefox.js`)

### Issue 4: "chrome is not defined" error
**Solution**:
- Ensure `browser-polyfill.js` is loaded FIRST in all HTML files
- Check that the script tag appears before other scripts
- Verify the polyfill file exists and is accessible

### Issue 5: Extension icon doesn't work
**Solution**:
- Check that `background-firefox.js` is loaded
- Verify `browser.browserAction.onClicked` listener is registered
- Check browser console for errors
- Reload the extension

### Issue 6: i18n messages not displaying
**Solution**:
- Verify `_locales/en/messages.json` exists
- Check that message keys match those used in code
- Ensure `browser.i18n.getMessage()` is being called correctly
- Check browser console for i18n errors

## Testing Checklist

After installation, verify these features work:

- [ ] Extension icon appears in Firefox toolbar
- [ ] Clicking extension icon opens game in new tab
- [ ] Game page loads without errors
- [ ] Game title displays correctly
- [ ] Game iframe loads the game content
- [ ] "Play More Games" button works
- [ ] Fullscreen button works
- [ ] Web full button works
- [ ] Guide/tutorial displays on first load
- [ ] No console errors (F12 → Console)
- [ ] All images load correctly
- [ ] Game is playable

## Debugging Tips

### Enable Debug Logging

Add this to the top of any script to enable debug logging:

```javascript
const DEBUG = true;
const log = (msg, data) => {
  if (DEBUG) {
    console.log(`[Parkour] ${msg}`, data || '');
  }
};
```

### Check Extension Logs

1. Open `about:debugging#/runtime/this-firefox`
2. Find your extension
3. Click "Inspect" to open the extension's developer tools
4. Check the Console tab for errors and logs

### Monitor Network Requests

1. Open `about:debugging#/runtime/this-firefox`
2. Click "Inspect" on your extension
3. Go to Network tab
4. Reload the extension
5. Check for failed requests

## Differences from Chrome Version

| Feature | Chrome | Firefox |
|---------|--------|---------|
| Manifest | `manifest.json` (V3) | `manifest-firefox.json` (V2) |
| Background | Service Worker | Background Script |
| API Prefix | `chrome.*` | `browser.*` |
| Installation | Chrome Web Store | Firefox Add-ons |
| Uninstall URL | Supported | Not supported |
| Signing | Not required | Required for permanent install |

## Next Steps

1. **Test thoroughly** using Method 1 (Temporary Installation)
2. **Fix any issues** using the troubleshooting guide
3. **Submit to Mozilla** (Method 2) for permanent distribution
4. **Maintain both versions** - Keep Chrome and Firefox versions in sync

## Support Resources

- [Firefox WebExtensions Documentation](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions)
- [Firefox Extension Development Guide](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension)
- [Firefox Add-ons Submission Guide](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/Distribution)
- [Browser Compatibility Table](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Browser_compatibility)

## Questions?

If you encounter issues not covered in this guide:

1. Check the browser console (F12 → Console)
2. Review the error messages carefully
3. Check the troubleshooting section above
4. Consult the Mozilla WebExtensions documentation
5. Test with a fresh Firefox profile if needed

Good luck! 🚀
