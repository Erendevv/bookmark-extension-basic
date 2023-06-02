// Web sayfalarının içeriğiyle ilgili işlevler burada tanımlanabilir

// Sık kullanılanları işaretlemek için kullanılacak işlev
function bookmarkPage() {
    chrome.runtime.sendMessage({ action: "bookmark" });
  }
  
  // Sayfa üzerinde sağ tıklandığında açılan bağlantı menüsü işlevi
  document.addEventListener("contextmenu", function(event) {
    var link = event.target.closest("a");
    if (link) {
      chrome.contextMenus.create({
        title: "Bu sayfayı işaretle",
        contexts: ["link"],
        onclick: bookmarkPage
      });
    }
  });
// Çarpı düğmesine tıklama olayını dinleyen işlev
document.addEventListener("click", function(event) {
  if (event.target.classList.contains("removeButton")) {
    var url = event.target.dataset.url;
    chrome.runtime.sendMessage({ type: "removeBookmark", url: url });
  }
});
