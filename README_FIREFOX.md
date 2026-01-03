# Parkour Extension - Firefox Version

Welcome! This is the Firefox-compatible version of the Parkour Chrome extension. This README will guide you through everything you need to know.

## 📋 Quick Navigation

- **Getting Started**: See [Installation Guide](#installation-guide)
- **How to Install**: See [FIREFOX_INSTALLATION_GUIDE.md](./FIREFOX_INSTALLATION_GUIDE.md)
- **How to Test**: See [FIREFOX_TESTING_GUIDE.md](./FIREFOX_TESTING_GUIDE.md)
- **Technical Details**: See [FIREFOX_CONVERSION_GUIDE.md](./FIREFOX_CONVERSION_GUIDE.md)
- **Summary**: See [FIREFOX_CONVERSION_SUMMARY.md](./FIREFOX_CONVERSION_SUMMARY.md)

## 🎮 What is Parkour?

Parkour is a browser extension that brings an exciting parkour game directly to your browser. Click the extension icon to open the game in a new tab and start playing!

## ✨ Features

- 🎯 Click extension icon to play
- 🎮 Full game experience in browser
- 🖼️ Beautiful graphics and animations
- 🌐 Works offline
- 📱 Responsive design
- 🎨 Smooth gameplay

## 🚀 Installation Guide

### Option 1: Quick Test (Recommended for First-Time Users)

1. **Open Firefox**
2. **Type this in address bar**: `about:debugging#/runtime/this-firefox`
3. **Click**: "Load Temporary Add-on"
4. **Select**: `manifest-firefox.json` from the parkour folder
5. **Done!** The extension is now loaded

**Note**: This temporary installation lasts until you restart Firefox.

### Option 2: Permanent Installation

For permanent installation, you need to submit to Mozilla's Add-ons store. See [FIREFOX_INSTALLATION_GUIDE.md](./FIREFOX_INSTALLATION_GUIDE.md) for detailed steps.

## 🧪 Testing

After installation, verify everything works:

1. ✅ Extension icon appears in toolbar
2. ✅ Click icon → game opens in new tab
3. ✅ Game loads and is playable
4. ✅ No errors in console (F12)

For comprehensive testing, see [FIREFOX_TESTING_GUIDE.md](./FIREFOX_TESTING_GUIDE.md).

## 📁 File Structure

```
parkour/
├── manifest-firefox.json          ← Use this for Firefox
├── game-firefox.html              ← Firefox game page
├── js/
│   ├── browser-polyfill.js        ← Cross-browser compatibility
│   ├── background-firefox.js      ← Firefox background script
│   ├── game-firefox.js            ← Firefox game script
│   └── ... (other files)
├── css/
│   └── style.css
├── images/
│   └── ... (game images)
├── icon/
│   └── 128.png
├── game-source/
│   └── ... (game assets)
├── FIREFOX_INSTALLATION_GUIDE.md  ← Installation instructions
├── FIREFOX_TESTING_GUIDE.md       ← Testing procedures
├── FIREFOX_CONVERSION_GUIDE.md    ← Technical details
└── README_FIREFOX.md              ← This file
```

## 🔧 What's Different from Chrome?

| Aspect | Chrome | Firefox |
|--------|--------|---------|
| **Manifest** | manifest.json | manifest-firefox.json |
| **API Prefix** | chrome.* | browser.* |
| **Background** | Service Worker | Background Script |
| **Installation** | Chrome Web Store | Firefox Add-ons |

All functionality is identical - the differences are technical implementation details.

## 🐛 Troubleshooting

### Extension doesn't appear in toolbar
- Reload the extension (about:debugging → Reload button)
- Check browser console for errors (F12)
- Verify manifest-firefox.json is valid

### Game doesn't load
- Check browser console (F12) for errors
- Verify game-firefox.html is being loaded
- Check that all resources load (Network tab in F12)

### "chrome is not defined" error
- Ensure browser-polyfill.js loads first
- Check that the script tag appears before other scripts
- Reload the extension

### Other issues
See [FIREFOX_INSTALLATION_GUIDE.md](./FIREFOX_INSTALLATION_GUIDE.md) → Troubleshooting section

## 📚 Documentation

This package includes comprehensive documentation:

1. **FIREFOX_INSTALLATION_GUIDE.md**
   - Step-by-step installation instructions
   - Two installation methods
   - Troubleshooting guide
   - Testing checklist

2. **FIREFOX_TESTING_GUIDE.md**
   - 8 testing phases
   - 30+ test cases
   - Performance testing
   - Test results template

3. **FIREFOX_CONVERSION_GUIDE.md**
   - Technical conversion details
   - API differences
   - Code examples
   - Common issues and solutions

4. **FIREFOX_CONVERSION_SUMMARY.md**
   - Project overview
   - Files created
   - Key changes made
   - Browser compatibility

## 🎯 Getting Started Steps

### Step 1: Install the Extension
```
1. Open Firefox
2. Go to: about:debugging#/runtime/this-firefox
3. Click: Load Temporary Add-on
4. Select: manifest-firefox.json
```

### Step 2: Test the Extension
```
1. Look for Parkour icon in toolbar
2. Click the icon
3. Game should open in new tab
4. Verify no console errors (F12)
```

### Step 3: Play the Game
```
1. Game page loads
2. Click "Done" on guide (if shown)
3. Play the game!
4. Use fullscreen or web full buttons as needed
```

## 🌐 Browser Compatibility

- ✅ Firefox 55+ (recommended: Firefox 90+)
- ✅ Chrome 88+ (with polyfill)
- ✅ Edge 88+ (with polyfill)
- ✅ Opera 74+ (with polyfill)

## 🔐 Security & Privacy

- ✅ No data collection
- ✅ No external tracking
- ✅ Works offline
- ✅ All game data stored locally
- ✅ No permissions beyond what's needed

## 📞 Support

### Common Questions

**Q: Will my game progress be saved?**
A: Yes, game progress is saved in browser storage.

**Q: Does it work offline?**
A: Yes, the game works completely offline.

**Q: Can I use this on Chrome?**
A: Yes! Use the original `manifest.json` and `game.html` for Chrome.

**Q: How do I uninstall?**
A: In about:debugging, click "Remove" next to the extension.

**Q: Can I submit this to Firefox Add-ons?**
A: Yes! See FIREFOX_INSTALLATION_GUIDE.md → Method 2 for details.

### Getting Help

1. Check the troubleshooting section above
2. Review [FIREFOX_INSTALLATION_GUIDE.md](./FIREFOX_INSTALLATION_GUIDE.md)
3. Check browser console (F12) for error messages
4. Review [FIREFOX_TESTING_GUIDE.md](./FIREFOX_TESTING_GUIDE.md)

## 🚀 Next Steps

1. **Install** the extension using the Quick Test method above
2. **Test** all features using the testing checklist
3. **Play** the game and enjoy!
4. **Submit** to Firefox Add-ons (optional) for permanent distribution

## 📝 Version Information

- **Extension Version**: 1.0.5
- **Firefox Compatibility**: 55+
- **Manifest Version**: 2 (Firefox)
- **Conversion Date**: January 2026
- **Status**: ✅ Ready for Use

## 🎉 You're All Set!

Everything is ready to go. Follow the installation steps above and start playing!

### Quick Checklist
- [ ] Firefox installed
- [ ] Extension installed (about:debugging)
- [ ] Extension icon visible in toolbar
- [ ] Game opens when clicking icon
- [ ] No console errors
- [ ] Game is playable

Once all items are checked, you're ready to enjoy Parkour on Firefox! 🎮

---

## 📖 Full Documentation Index

| Document | Purpose |
|----------|---------|
| [FIREFOX_INSTALLATION_GUIDE.md](./FIREFOX_INSTALLATION_GUIDE.md) | How to install the extension |
| [FIREFOX_TESTING_GUIDE.md](./FIREFOX_TESTING_GUIDE.md) | How to test all features |
| [FIREFOX_CONVERSION_GUIDE.md](./FIREFOX_CONVERSION_GUIDE.md) | Technical conversion details |
| [FIREFOX_CONVERSION_SUMMARY.md](./FIREFOX_CONVERSION_SUMMARY.md) | Project summary |
| [README_FIREFOX.md](./README_FIREFOX.md) | This file |

---

**Happy Gaming! 🎮**

For detailed information, refer to the comprehensive guides included in this package.
