String.prototype.isEnglish = function () {
    for (let i = 0; i < this.length; i++) {
        if (this.charCodeAt(i) > 255) {
            return false;
        }
    }
    return true;
}

document.addEventListener("DOMContentLoaded", async function () {
    const dictionaryFrame = document.getElementById("dictionaryFrame");
    const indicator = document.getElementById("indicator");
    indicator.textContent = "加载中...";

    // get selected text
    // from https://stackoverflow.com/a/68543098
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    let result;
    try {
        [{ result }] = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: () => getSelection().toString(),
        });
    } catch (e) {
        return;
    }
    result = result.trim();

    let url = "http://www.zdic.net/hans/" + result;
    if (result.isEnglish()) {
        url = "https://cn.bing.com/dict/search?q=" + result;
    }
    if (result.length === 0) {
        url = "http://www.zdic.net/";
    }

    setTimeout(function () {
        dictionaryFrame.src = url;
        dictionaryFrame.addEventListener("load", function () {
            indicator.textContent = "";
        });
    }, 10);
});
