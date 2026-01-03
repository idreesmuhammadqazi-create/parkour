// chrome.sidePanel.setPanelBehavior({
//     openPanelOnActionClick: true
// }).catch((error) => console.error(error));

browser.browserAction.onClicked.addListener((tab) => {
    browser.tabs.create({
        url: 'game.html'
    });
});

browser.runtime.setUninstallURL(`${info.domain}/uninstall?i=${browser.runtime.id}&n=${browser.i18n.getMessage('extensionGameTitle')}&s=${info.symbolStr}&c=${info.category}`);

browser.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
        browser.tabs.create({
            url: `${info.domain}/install?i=${browser.runtime.id}&n=${browser.i18n.getMessage('extensionGameTitle')}&s=${info.symbolStr}&c=${info.category}`
        });

        browser.tabs.create({
            url: 'game.html'
        });
    }
});

