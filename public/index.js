function putCookie(form) {
  if (!form.apiKey.value && !form.databaseId.value) {
    alert("Please provide both the API Key and Database ID to continue.");
  } else {
    document.cookie = "apiKey=" + form.apiKey.value;
    document.cookie = "databaseId=" + form.databaseId.value;
    location.reload()
  }
  return false
}
htmx.onLoad(function (content) {
  var getCookies = function () {
    var pairs = document.cookie.split(";");
    var cookies = {};
    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i].split("=");
      cookies[(pair[0] + "").trim()] = unescape(pair.slice(1).join("="));
    }
    return cookies;
  };
  if (!getCookies()["apiKey"] || !getCookies()["databaseId"]) {
    window.dialog.showModal();
  }
});
