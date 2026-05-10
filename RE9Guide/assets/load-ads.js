document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('ads-container');
  if (!container) return;
  
  const adsPath = container.getAttribute('data-ads-path');
  if (!adsPath) return;

  fetch(adsPath)
    .then(response => response.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      const headScripts = doc.querySelectorAll('script[data-ad-position="head"]');
      headScripts.forEach(script => {
        const newScript = document.createElement('script');
        newScript.src = script.src;
        document.head.appendChild(newScript);
      });
      
      const bodyContent = doc.body.innerHTML;
      container.innerHTML = bodyContent;
    })
    .catch(error => {
      console.error('Failed to load ads:', error);
    });
});