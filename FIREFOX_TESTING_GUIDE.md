# Firefox Extension Testing Guide

## Overview

This guide provides comprehensive testing procedures for the Parkour extension on Firefox.

## Pre-Testing Setup

### 1. Install the Extension

Follow the steps in `FIREFOX_INSTALLATION_GUIDE.md` to install the extension temporarily.

### 2. Open Developer Tools

- Press `F12` or `Ctrl+Shift+I` (Windows/Linux) or `Cmd+Option+I` (Mac)
- Keep the Console tab open during testing to catch any errors

### 3. Open about:debugging

- Type `about:debugging#/runtime/this-firefox` in the address bar
- Keep this tab open for quick access to extension controls

## Testing Phases

### Phase 1: Installation & Loading ✅

**Objective**: Verify the extension loads correctly

#### Tests:

1. **Extension Appears in Toolbar**
   - [ ] Parkour icon visible in Firefox toolbar
   - [ ] Icon is clickable
   - [ ] Icon has correct appearance

2. **Extension Loads Without Errors**
   - [ ] No errors in browser console (F12)
   - [ ] No errors in extension console (about:debugging → Inspect)
   - [ ] Extension status shows "Running"

3. **Manifest is Valid**
   - [ ] No manifest validation errors
   - [ ] All required fields present
   - [ ] File paths are correct

**Expected Result**: Extension loads cleanly with no console errors

---

### Phase 2: Core Functionality 🎮

**Objective**: Verify basic extension features work

#### Test 2.1: Extension Icon Click

1. Click the Parkour extension icon in the toolbar
2. Verify:
   - [ ] New tab opens
   - [ ] `game-firefox.html` loads
   - [ ] No console errors
   - [ ] Page title updates

**Expected Result**: Game page opens in new tab without errors

#### Test 2.2: Game Page Loads

1. Wait for the game page to fully load
2. Verify:
   - [ ] Page displays without layout issues
   - [ ] All images load (check for broken image icons)
   - [ ] Game iframe is visible
   - [ ] Loading spinner appears then disappears
   - [ ] No console errors

**Expected Result**: Game page displays correctly with all assets loaded

#### Test 2.3: Browser Polyfill Works

1. Open browser console (F12)
2. Type: `console.log(typeof browser)`
3. Verify:
   - [ ] Output shows "object" (not "undefined")
   - [ ] `browser` API is available
   - [ ] No polyfill errors in console

**Expected Result**: Browser API is properly polyfilled

---

### Phase 3: Game Features 🎯

**Objective**: Verify game-specific features work

#### Test 3.1: Game Title Display

1. Look at the game page
2. Verify:
   - [ ] Game title displays in page title
   - [ ] Game title displays in bottom-left corner
   - [ ] Title matches extension name from i18n

**Expected Result**: Game title displays correctly in all locations

#### Test 3.2: Game Content Loads

1. Wait for game iframe to load
2. Verify:
   - [ ] Game content appears in iframe
   - [ ] Game is interactive (can click/play)
   - [ ] No iframe loading errors
   - [ ] Game assets load correctly

**Expected Result**: Game loads and is playable

#### Test 3.3: Guide/Tutorial Display

1. Open the game page for the first time (or clear localStorage)
2. Verify:
   - [ ] Guide overlay appears
   - [ ] Guide text is readable
   - [ ] "Done" button is visible and clickable
   - [ ] Clicking "Done" closes the guide
   - [ ] Clicking outside guide closes it

**Expected Result**: Guide displays and can be dismissed

#### Test 3.4: Play More Games Button

1. Locate the "Play More Games" button (bottom-right area)
2. Click it
3. Verify:
   - [ ] New tab opens
   - [ ] URL contains correct parameters
   - [ ] No console errors
   - [ ] Button animation works

**Expected Result**: Button opens more games page in new tab

#### Test 3.5: Fullscreen Button

1. Click the fullscreen icon (bottom-right)
2. Verify:
   - [ ] Game enters fullscreen mode
   - [ ] Icon changes to exit fullscreen
   - [ ] Game is playable in fullscreen
   - [ ] ESC key exits fullscreen
   - [ ] No console errors

**Expected Result**: Fullscreen mode works correctly

#### Test 3.6: Web Full Button

1. Click the "Web Full" button (bottom-right)
2. Verify:
   - [ ] Game expands to fill window
   - [ ] Sidebar content hides
   - [ ] Icon changes to exit web full
   - [ ] Game remains playable
   - [ ] Clicking again restores normal view

**Expected Result**: Web full mode works correctly

---

### Phase 4: API Compatibility 🔌

**Objective**: Verify Firefox APIs work correctly

#### Test 4.1: Runtime API

1. Open extension console (about:debugging → Inspect)
2. Type: `browser.runtime.id`
3. Verify:
   - [ ] Returns a valid extension ID
   - [ ] ID is consistent across reloads
   - [ ] No errors

**Expected Result**: Runtime API works correctly

#### Test 4.2: Tabs API

1. Click extension icon to open game
2. Verify:
   - [ ] New tab is created
   - [ ] Tab is in the current window
   - [ ] Tab URL is correct
   - [ ] No console errors

**Expected Result**: Tabs API works correctly

#### Test 4.3: i18n API

1. Open extension console (about:debugging → Inspect)
2. Type: `browser.i18n.getMessage('extensionName')`
3. Verify:
   - [ ] Returns the extension name string
   - [ ] Not empty or undefined
   - [ ] No errors

**Expected Result**: i18n API works correctly

#### Test 4.4: BrowserAction API

1. Verify extension icon is clickable
2. Click it multiple times
3. Verify:
   - [ ] Each click opens a new tab
   - [ ] No errors in console
   - [ ] Consistent behavior

**Expected Result**: BrowserAction API works correctly

---

### Phase 5: Resource Loading 📦

**Objective**: Verify all resources load correctly

#### Test 5.1: Images Load

1. Open game page
2. Open browser console (F12)
3. Check for 404 errors
4. Verify:
   - [ ] No broken image icons visible
   - [ ] All images display correctly
   - [ ] No 404 errors in console
   - [ ] Image paths are correct

**Expected Result**: All images load without errors

#### Test 5.2: Game Assets Load

1. Wait for game to fully load
2. Open Network tab (F12 → Network)
3. Reload the page
4. Verify:
   - [ ] WASM files load (box2d.wasm)
   - [ ] Game scripts load (.egjdata files)
   - [ ] No 404 errors
   - [ ] All resources have 200 status

**Expected Result**: All game assets load successfully

#### Test 5.3: External Resources

1. Check if external APIs are called
2. Verify:
   - [ ] Recommendation API calls work
   - [ ] External domains load correctly
   - [ ] No CORS errors
   - [ ] No mixed content warnings

**Expected Result**: External resources load without errors

---

### Phase 6: Error Handling 🛡️

**Objective**: Verify error handling works correctly

#### Test 6.1: Console Errors

1. Open browser console (F12)
2. Reload the game page
3. Verify:
   - [ ] No JavaScript errors
   - [ ] No uncaught exceptions
   - [ ] No "undefined" errors
   - [ ] No API errors

**Expected Result**: No console errors

#### Test 6.2: Network Errors

1. Open Network tab (F12 → Network)
2. Reload the page
3. Verify:
   - [ ] No 404 errors
   - [ ] No 500 errors
   - [ ] No CORS errors
   - [ ] All critical resources load

**Expected Result**: No network errors for critical resources

#### Test 6.3: Graceful Degradation

1. Disable JavaScript (about:config → javascript.enabled = false)
2. Reload the page
3. Verify:
   - [ ] Page doesn't crash
   - [ ] Basic structure visible
   - [ ] Graceful fallback message (if any)

4. Re-enable JavaScript

**Expected Result**: Page handles missing JavaScript gracefully

---

### Phase 7: Cross-Browser Compatibility 🌐

**Objective**: Verify polyfill works for both Chrome and Firefox APIs

#### Test 7.1: API Aliases

1. Open extension console
2. Type: `browser === chrome`
3. Verify:
   - [ ] Returns true (polyfill working)
   - [ ] Both APIs available
   - [ ] No conflicts

**Expected Result**: Polyfill correctly aliases APIs

#### Test 7.2: Callback vs Promise

1. Open extension console
2. Type: `browser.tabs.create({url: 'about:blank'})`
3. Verify:
   - [ ] Returns a Promise
   - [ ] Promise resolves correctly
   - [ ] New tab opens

**Expected Result**: API works with both callbacks and promises

---

### Phase 8: Performance 🚀

**Objective**: Verify extension performs well

#### Test 8.1: Load Time

1. Open Network tab (F12 → Network)
2. Click extension icon
3. Measure time to full page load
4. Verify:
   - [ ] Page loads in < 3 seconds
   - [ ] No long-running scripts
   - [ ] Smooth animations

**Expected Result**: Extension loads quickly

#### Test 8.2: Memory Usage

1. Open about:memory
2. Find Parkour extension
3. Verify:
   - [ ] Memory usage is reasonable (< 50MB)
   - [ ] No memory leaks
   - [ ] Stable over time

**Expected Result**: Memory usage is acceptable

#### Test 8.3: CPU Usage

1. Open Task Manager (Windows) or Activity Monitor (Mac)
2. Play the game for 2 minutes
3. Verify:
   - [ ] CPU usage is reasonable
   - [ ] No excessive CPU spikes
   - [ ] Game runs smoothly

**Expected Result**: CPU usage is acceptable

---

## Test Results Template

```
Extension: Parkour
Firefox Version: [VERSION]
Test Date: [DATE]
Tester: [NAME]

Phase 1: Installation & Loading
- [ ] Extension appears in toolbar
- [ ] Extension loads without errors
- [ ] Manifest is valid
Result: PASS / FAIL

Phase 2: Core Functionality
- [ ] Extension icon click works
- [ ] Game page loads
- [ ] Browser polyfill works
Result: PASS / FAIL

Phase 3: Game Features
- [ ] Game title displays
- [ ] Game content loads
- [ ] Guide displays
- [ ] Play More Games button works
- [ ] Fullscreen button works
- [ ] Web Full button works
Result: PASS / FAIL

Phase 4: API Compatibility
- [ ] Runtime API works
- [ ] Tabs API works
- [ ] i18n API works
- [ ] BrowserAction API works
Result: PASS / FAIL

Phase 5: Resource Loading
- [ ] Images load
- [ ] Game assets load
- [ ] External resources load
Result: PASS / FAIL

Phase 6: Error Handling
- [ ] No console errors
- [ ] No network errors
- [ ] Graceful degradation
Result: PASS / FAIL

Phase 7: Cross-Browser Compatibility
- [ ] API aliases work
- [ ] Callback vs Promise works
Result: PASS / FAIL

Phase 8: Performance
- [ ] Load time acceptable
- [ ] Memory usage acceptable
- [ ] CPU usage acceptable
Result: PASS / FAIL

Overall Result: PASS / FAIL

Issues Found:
1. [Issue description]
   - Severity: Critical / High / Medium / Low
   - Steps to reproduce: [Steps]
   - Expected: [Expected behavior]
   - Actual: [Actual behavior]

Notes:
[Any additional notes or observations]
```

## Automated Testing (Optional)

For automated testing, you can use:

- **Selenium WebDriver**: Automate browser interactions
- **Jest**: Unit test JavaScript code
- **Puppeteer**: Headless browser testing

Example Puppeteer test:

```javascript
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Load extension
  await page.goto('about:debugging#/runtime/this-firefox');
  
  // Test extension functionality
  // ... test code ...
  
  await browser.close();
})();
```

## Continuous Integration

Consider setting up CI/CD pipeline:

1. **GitHub Actions**: Automated testing on push
2. **Firefox CI**: Mozilla's testing infrastructure
3. **BrowserStack**: Cross-browser testing

## Sign-Off

Once all tests pass:

- [ ] All phases completed
- [ ] No critical issues
- [ ] Performance acceptable
- [ ] Ready for distribution

**Tested by**: ________________  
**Date**: ________________  
**Status**: ✅ APPROVED / ❌ NEEDS FIXES

---

## Next Steps

1. Fix any issues found
2. Re-run failed tests
3. Get sign-off from QA
4. Submit to Mozilla Add-ons (if permanent installation desired)
5. Monitor user feedback

Good luck with testing! 🎉
