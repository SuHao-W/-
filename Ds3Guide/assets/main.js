
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
  var currentUrl = window.location.href;
  var currentPath = window.location.pathname;

  document.querySelectorAll('.nav-links a').forEach(function(link) {
    var href = link.getAttribute('href');
    if (!href) return;

    // 获取链接的绝对路径
    var linkUrl = new URL(href, window.location.origin + currentPath).pathname;
    var currentUrlPath = currentPath;

    // 简化匹配：如果当前路径包含链接的关键部分
    var isActive = false;

    // 首页特殊处理
    if (href === 'index.html' || href === './index.html') {
      if (currentUrlPath.endsWith('/index.html') || currentUrlPath.endsWith('/')) {
        isActive = true;
      }
    }
    // FAQ特殊处理
    else if (href.indexOf('faq.html') !== -1) {
      if (currentUrlPath.indexOf('faq.html') !== -1) {
        isActive = true;
      }
    }
    // 子目录匹配
    else if (href.indexOf('characters/') !== -1 && currentUrlPath.indexOf('characters') !== -1) {
      isActive = true;
    }
    else if (href.indexOf('bosses/') !== -1 && currentUrlPath.indexOf('bosses') !== -1) {
      isActive = true;
    }
    else if (href.indexOf('builds/') !== -1 && currentUrlPath.indexOf('builds') !== -1) {
      isActive = true;
    }
    else if (href.indexOf('tips/') !== -1 && currentUrlPath.indexOf('tips') !== -1) {
      isActive = true;
    }
    else if (href.indexOf('map/') !== -1 && currentUrlPath.indexOf('map') !== -1) {
      isActive = true;
    }

    if (isActive) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
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
