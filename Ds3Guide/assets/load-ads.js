
// Load ads and affiliate content from ads.html
// Modifying ads.html updates ALL pages automatically
(function() {
  var container = document.getElementById('ads-container');
  if (!container) return;

  // Determine correct path based on current page depth
  var path = window.location.pathname;
  var parts = path.split('/').filter(function(p) { return p.length > 0; });
  var depth = 0;
  for (var i = 0; i < parts.length; i++) {
    if (parts[i].indexOf('.html') === -1) depth++;
  }
  var prefix = '';
  for (var i = 0; i < depth; i++) prefix += '../';

  fetch(prefix + 'ads.html')
    .then(function(r) { return r.text(); })
    .then(function(html) {
      // Parse the fetched HTML
      var parser = new DOMParser();
      var doc = parser.parseFromString(html, 'text/html');

      // 1. Move head-positioned scripts to document.head
      var headScripts = doc.querySelectorAll('script[data-ad-position="head"]');
      headScripts.forEach(function(script) {
        var newScript = document.createElement('script');
        newScript.src = script.src;
        newScript.async = true;
        document.head.appendChild(newScript);
      });

      // 2. Insert body content (amazon + disclaimer) into container
      var bodyContent = html.replace(/<script[^>]*data-ad-position="head"[^>]*><\/script>/g, '');
      container.innerHTML = bodyContent;

      // 3. Execute body-positioned scripts
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
