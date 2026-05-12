async function loadAds() {
  const adsContainers = document.querySelectorAll('[data-ads-path]');

  for (const container of adsContainers) {
    const adsPath = container.getAttribute('data-ads-path');

    try {
      const response = await fetch(adsPath);
      if (!response.ok) continue;

      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      const headScripts = doc.querySelectorAll('script[data-ad-position="head"]');
      headScripts.forEach(script => {
        const newScript = document.createElement('script');
        newScript.setAttribute('data-ad-position', 'head');
        newScript.src = script.getAttribute('src');
        document.head.appendChild(newScript);
      });

      const bodyContent = doc.querySelector('.amazon-section, .disclaimer, .accelerator-section');
      if (bodyContent) {
        container.innerHTML = bodyContent.outerHTML;
      }

      const bodyScripts = doc.querySelectorAll('script[data-ad-position="body"]');
      bodyScripts.forEach(script => {
        const newScript = document.createElement('script');
        newScript.setAttribute('data-ad-position', 'body');
        newScript.src = script.getAttribute('src');
        document.body.appendChild(newScript);
      });

    } catch (error) {
      console.log('Failed to load ads:', error);
    }
  }
}

document.addEventListener('DOMContentLoaded', loadAds);