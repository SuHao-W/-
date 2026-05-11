document.addEventListener('DOMContentLoaded', function() {
    const adsContainer = document.getElementById('ads-container');
    if (!adsContainer) return;

    // Check if already loaded
    if (adsContainer.dataset.loaded) return;
    adsContainer.dataset.loaded = 'true';

    // Insert Amazon content
    adsContainer.insertAdjacentHTML('beforebegin', `
        <div class="amazon-section">
            <h3>Get Crimson Desert</h3>
            <p>Support this guide by purchasing through our affiliate link:</p>
            <a href="https://amzn.to/4f9ZFbe" target="_blank" rel="nofollow" class="amazon-btn">
                🛒 Buy Crimson Desert on Amazon
            </a>
            <br>
            <a href="https://amzn.to/3Pb6Rta" target="_blank" rel="nofollow" class="amazon-btn btn-secondary">
                🎮 Buy Controller on Amazon
            </a>
        </div>
        <div class="disclaimer">
            <strong>Amazon Affiliate Disclosure:</strong> This site contains affiliate links. 
            As an Amazon Associate, we earn from qualifying purchases.
        </div>
    `);
    
    // Remove container
    adsContainer.remove();
    
    // Load ad scripts
    const headScript = document.createElement('script');
    headScript.src = 'https://pl29404378.profitablecpmratenetwork.com/80/ae/22/80ae2216a7417613fb6c9702672fe425.js';
    headScript.setAttribute('data-ad-position', 'head');
    document.head.appendChild(headScript);
    
    const bodyScript = document.createElement('script');
    bodyScript.src = 'https://pl29404374.profitablecpmratenetwork.com/59/d5/67/59d567eb6adefa488e4db295570e8b0d.js';
    bodyScript.setAttribute('data-ad-position', 'body');
    document.body.appendChild(bodyScript);
});
