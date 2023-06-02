// Arka planda çalışacak işlevler burada tanımlanabilir

// Eklenti düğmesine tıklandığında popup penceresini açan işlev
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.browserAction.setPopup({ popup: "popup.html" });
  });
  
  // Sık kullanılanları saklamak için yerel depolama kullanımı
  function saveBookmark(url, title) {
    chrome.storage.local.get(["bookmarks"], function(result) {
      var bookmarks = result.bookmarks || [];
      var bookmark = { url: url, title: title };
      bookmarks.push(bookmark);
      chrome.storage.local.set({ bookmarks: bookmarks }, function() {
        console.log("Bookmark saved:", bookmark);
      });
    });
  }





  // Şu anki sayfayı işaretlemek için kullanılacak işlev
  function bookmarkCurrentPage() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      var currentTab = tabs[0];
      var url = currentTab.url;
      var title = currentTab.title;
      saveBookmark(url, title);
    });
  }
  
  // Tarayıcı olaylarını dinleyen ve işleyen işlevler
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "bookmark") {
      bookmarkCurrentPage();
    }
  });
  
  // Eklenti düğmesine sağ tıklandığında açılan bağlantı menüsü işlevi
  chrome.contextMenus.create({
    id:"myContextMenu",
    title: "Bu sayfayı ekle",
    contexts: ["browser_action"],
  });


  chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === "myContextMenu") {
    bookmarkCurrentPage();
  }
});