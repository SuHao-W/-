
document.addEventListener('DOMContentLoaded', function() {
  // ===== BACK TO TOP BUTTON =====
  const backToTop = document.createElement('div');
  backToTop.className = 'back-to-top';
  backToTop.innerHTML = '↑';
  backToTop.title = 'Back to top';
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  document.body.appendChild(backToTop);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  // ===== COLLAPSIBLE SECTIONS =====
  document.querySelectorAll('.collapsible').forEach(collapsible => {
    const header = collapsible.querySelector('.collapsible-header');
    if (header) {
      header.addEventListener('click', () => {
        collapsible.classList.toggle('open');
      });
    }
  });

  // ===== ACTIVE NAV LINK =====
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const currentFolder = window.location.pathname.split('/').slice(-2)[0];

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.remove('active');
    const linkPath = link.getAttribute('href');
    if (linkPath) {
      const linkFolder = linkPath.split('/').slice(-2)[0];
      const linkPage = linkPath.split('/').pop();

      if (currentPage === linkPage || currentFolder === linkFolder) {
        link.classList.add('active');
      }
    }
  });

  // ===== SEARCH FILTER =====
  const searchBoxes = document.querySelectorAll('.search-box');
  searchBoxes.forEach(box => {
    const targetSelector = box.dataset.target;
    if (!targetSelector) return;

    box.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      document.querySelectorAll(targetSelector).forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(query)) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // ===== FILTER BUTTONS =====
  document.querySelectorAll('.filter-bar').forEach(bar => {
    const targetSelector = bar.dataset.target;
    const items = targetSelector ? document.querySelectorAll(targetSelector) : [];

    bar.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        // Toggle active state
        bar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Filter items
        items.forEach(item => {
          if (filter === 'all' || item.dataset.category === filter) {
            item.classList.remove('hidden');
          } else {
            item.classList.add('hidden');
          }
        });
      });
    });
  });

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
