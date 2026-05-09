
document.addEventListener('DOMContentLoaded', function() {
  // ===== COLLAPSIBLE SECTIONS =====
  document.querySelectorAll('.collapsible').forEach(function(c) {
    var h = c.querySelector('.collapsible-header');
    if (h) {
      h.addEventListener('click', function() {
        c.classList.toggle('open');
      });
    }
  });

  // ===== NAVIGATION HIGHLIGHT =====
  var currentPath = window.location.pathname;
  var currentFile = currentPath.split('/').pop() || 'index.html';
  var currentFolder = currentPath.split('/').slice(-2)[0];

  document.querySelectorAll('.nav-links a').forEach(function(link) {
    link.classList.remove('active');
    var href = link.getAttribute('href');
    if (href) {
      var linkFolder = href.split('/').slice(-2)[0];
      var linkFile = href.split('/').pop();
      // Match by folder first, then by file
      if (currentFolder === linkFolder || currentFile === linkFile) {
        link.classList.add('active');
      }
    }
  });

  // ===== FAQ SEARCH FILTER =====
  var searchBoxes = document.querySelectorAll('.search-box');
  searchBoxes.forEach(function(box) {
    var targetSelector = box.dataset.target;
    if (!targetSelector) return;

    box.addEventListener('input', function(e) {
      var query = e.target.value.toLowerCase().trim();
      var items = document.querySelectorAll(targetSelector);
      items.forEach(function(item) {
        var text = item.textContent.toLowerCase();
        if (query === '' || text.indexOf(query) !== -1) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
});
