
// Load ads and affiliate content from ads.html
// The correct path is set via data-ads-path on the ads-container element
(function() {
  var container = document.getElementById('ads-container');
  if (!container) return;

  var adsPath = container.getAttribute('data-ads-path');
  if (!adsPath) {
    console.error('ads-container missing data-ads-path attribute');
    return;
  }

  fetch(adsPath)
    .then(function(r) { return r.text(); })
    .then(function(html) {
      var parser = new DOMParser();
      var doc = parser.parseFromString(html, 'text/html');

      // Move head-positioned scripts to document.head
      var headScripts = doc.querySelectorAll('script[data-ad-position="head"]');
      headScripts.forEach(function(script) {
        var newScript = document.createElement('script');
        newScript.src = script.src;
        newScript.async = true;
        document.head.appendChild(newScript);
      });

      // Insert body content into container
      var bodyContent = html.replace(/<script[^>]*data-ad-position="head"[^>]*><\/script>/g, '');
      container.innerHTML = bodyContent;

      // Execute body-positioned scripts
      var bodyScripts = container.querySelectorAll('script[data-ad-position="body"]');
      bodyScripts.forEach(function(oldScript) {
        var newScript = document.createElement('script');
        newScript.src = oldScript.src;
        newScript.async = true;
        document.body.appendChild(newScript);
        oldScript.remove();
      });
    })
    .catch(function(e) {
      console.log('Ads load failed:', e);
    });
})();
