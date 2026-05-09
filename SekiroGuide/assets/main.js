
document.addEventListener('DOMContentLoaded', function() {
  // Back to top
  const backToTop = document.createElement('div');
  backToTop.className = 'back-to-top';
  backToTop.innerHTML = '↑';
  backToTop.title = 'Back to top';
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  document.body.appendChild(backToTop);

  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  });

  // Collapsible
  document.querySelectorAll('.collapsible').forEach(c => {
    const header = c.querySelector('.collapsible-header');
    if (header) {
      header.addEventListener('click', () => c.classList.toggle('open'));
    }
  });

  // Active nav
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const currentFolder = window.location.pathname.split('/').slice(-2)[0];
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href) {
      const folder = href.split('/').slice(-2)[0];
      const page = href.split('/').pop();
      if (currentPage === page || currentFolder === folder) {
        link.classList.add('active');
      }
    }
  });

  // Search filter
  document.querySelectorAll('.search-box').forEach(box => {
    const target = box.dataset.target;
    if (!target) return;
    box.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase();
      document.querySelectorAll(target).forEach(item => {
        item.classList.toggle('hidden', !item.textContent.toLowerCase().includes(q));
      });
    });
  });

  // Filter buttons
  document.querySelectorAll('.filter-bar').forEach(bar => {
    const target = bar.dataset.target;
    const items = target ? document.querySelectorAll(target) : [];
    bar.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        bar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        items.forEach(item => {
          item.classList.toggle('hidden', filter !== 'all' && item.dataset.category !== filter);
        });
      });
    });
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      e.preventDefault();
      const t = document.querySelector(this.getAttribute('href'));
      if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
});
