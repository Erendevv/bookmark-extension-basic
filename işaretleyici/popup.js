// Sık kullanılanları almak ve listelemek için gereken işlevler burada tanımlanabilir

// Sık kullanılanları getiren ve listeleme işlemini gerçekleştiren işlev
// Sık kullanılanları getiren ve listeleme işlemini gerçekleştiren işlev
function getBookmarks() {
  chrome.storage.local.get(["bookmarks"], function(result) {
    var bookmarks = result.bookmarks || [];
    var bookmarkList = document.getElementById("bookmarkList");
    bookmarkList.innerHTML = ""; // Mevcut listeyi temizle

    bookmarks.forEach(function(bookmark) {
      var listItem = document.createElement("li");
      
      var link = document.createElement("a");
      link.href = bookmark.url;
      link.target = "_blank";
      link.textContent = bookmark.title;
      
      var removeButton = document.createElement("button");
      removeButton.className = "removeButton";
      removeButton.textContent = "X";
      removeButton.dataset.url = bookmark.url; // URL'yi veri özelliği olarak tut

      listItem.appendChild(link);
      listItem.appendChild(removeButton);
      bookmarkList.appendChild(listItem);
    });

    // Çarpı düğmelerine tıklama olayını dinleyen işlevi tekrar bağla
    attachRemoveButtonListeners();
  });
}
  // Mesajları dinleyen arka plan betiği
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === "removeBookmark") {
      var url = request.url;
      removeBookmark(url);
    }
  });
    function removeBookmark(url) {
    chrome.storage.local.get(["bookmarks"], function(result) {
      var bookmarks = result.bookmarks || [];
      var updatedBookmarks = bookmarks.filter(function(bookmark) {
        return bookmark.url !== url;
      });
  
      chrome.storage.local.set({ bookmarks: updatedBookmarks }, function() {
        console.log("Sık kullanılan silindi: " + url);
        getBookmarks(); // Sık kullanılanları güncelle
      });
    });
  }
// Çarpı düğmelerine tıklama olayını dinleyen işlevi bağlayan işlev
function attachRemoveButtonListeners() {
  var removeButtons = document.getElementsByClassName("removeButton");
  for (var i = 0; i < removeButtons.length; i++) {
    removeButtons[i].addEventListener("click", function(event) {
      var url = event.target.dataset.url;
      chrome.runtime.sendMessage({ type: "removeBookmark", url: url });
    });
  }
}


  function clearBookmarks() {
    chrome.storage.local.set({ bookmarks: [] }, function() {
      console.log("Tüm sık kullanılanlar silindi");
      getBookmarks(); // Sık kullanılanları güncelle
    });
  }

  // Sık kullanılanları listelemek için sayfa yüklendiğinde çalışacak işlev
  document.addEventListener("DOMContentLoaded", function() {
    getBookmarks();
  });
  