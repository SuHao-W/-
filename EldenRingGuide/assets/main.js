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


  // ===== COPY REDDIT-READY ANSWERS =====
  document.querySelectorAll('.reddit-reply').forEach((box, index) => {
    const quote = box.querySelector('blockquote');
    if (!quote || box.querySelector('.copy-answer-btn')) return;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'copy-answer-btn';
    button.textContent = 'Copy short answer';
    button.addEventListener('click', async () => {
      const text = quote.textContent.trim();
      try {
        await navigator.clipboard.writeText(text);
        button.textContent = 'Copied';
        button.classList.add('copied');
        setTimeout(() => {
          button.textContent = 'Copy short answer';
          button.classList.remove('copied');
        }, 1800);
      } catch (err) {
        button.textContent = 'Select and copy manually';
      }
    });
    box.appendChild(button);
  });

  // ===== RECENT GUIDE CONTINUE PANEL =====
  const recentGuidesKey = 'er-guide-recent-guides';
  const getGuidePath = () => {
    const parts = window.location.pathname.split('/').filter(Boolean);
    const guideIndex = parts.findIndex(part => part === 'EldenRingGuide');
    if (guideIndex >= 0) return parts.slice(guideIndex + 1).join('/') || 'index.html';
    return parts.slice(-2).join('/') || 'index.html';
  };

  const readRecentGuides = () => {
    try {
      const parsed = JSON.parse(localStorage.getItem(recentGuidesKey) || '[]');
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      return [];
    }
  };

  const writeRecentGuides = guides => {
    localStorage.setItem(recentGuidesKey, JSON.stringify(guides.slice(0, 5)));
  };

  const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[char]));

  const isHomePage = () => {
    const path = getGuidePath();
    return path === 'index.html' || path === '';
  };

  const currentGuidePath = getGuidePath();
  if (!isHomePage() && !currentGuidePath.endsWith('faq.html')) {
    const heading = document.querySelector('h1');
    const title = heading ? heading.textContent.trim() : document.title.replace(/\s*\|.*$/, '').trim();
    const current = {
      path: currentGuidePath,
      title,
      updatedAt: Date.now()
    };
    const recent = readRecentGuides().filter(item => item.path !== current.path);
    writeRecentGuides([current, ...recent]);
  }

  const continuePanel = document.querySelector('[data-continue-panel]');
  const continueCard = document.querySelector('[data-continue-card]');
  if (continuePanel && continueCard) {
    const recent = readRecentGuides();
    if (recent.length) {
      const latest = recent[0];
      const recentLinks = recent.slice(1, 5).map(item => (
        `<a href="${escapeHtml(item.path)}">${escapeHtml(item.title)}</a>`
      )).join('');

      continueCard.innerHTML = `
        <h3>${escapeHtml(latest.title)}</h3>
        <p>Pick up the guide you were using last time, then copy your checklist progress if you want to ask for help or share your route.</p>
        <div class="continue-actions">
          <a class="continue-link" href="${escapeHtml(latest.path)}">Continue guide</a>
          <a class="continue-link" href="tips/new-player-progression-hub.html">Open progression hub</a>
        </div>
        ${recentLinks ? `<div class="recent-guide-list">${recentLinks}</div>` : ''}
      `;
      continuePanel.hidden = false;
    }
  }

  // ===== GUIDE CHECKLIST =====
  document.querySelectorAll('[data-checklist-id]').forEach(list => {
    const listId = list.dataset.checklistId;
    const storageKey = `er-guide-checklist:${listId}`;
    const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
    const items = Array.from(list.querySelectorAll('input[type="checkbox"][data-check-id]'));

    const progressBox = document.createElement('div');
    progressBox.className = 'reddit-reply';
    progressBox.dataset.checklistProgress = listId;

    const progressTitle = document.createElement('h3');
    progressTitle.textContent = 'Your checklist progress';

    const progressText = document.createElement('blockquote');

    const copyButton = document.createElement('button');
    copyButton.type = 'button';
    copyButton.className = 'copy-answer-btn';
    copyButton.textContent = 'Copy checklist progress';

    const buildChecklistSummary = () => {
      const checkedItems = items.filter(input => input.checked);
      const nextItems = items.filter(input => !input.checked);
      const checkedLabels = checkedItems.map(input => {
        const label = input.closest('.check-item');
        const strong = label ? label.querySelector('strong') : null;
        return strong ? strong.textContent.replace(/\.$/, '') : input.dataset.checkId;
      });
      const nextLabels = nextItems.slice(0, 2).map(input => {
        const label = input.closest('.check-item');
        const strong = label ? label.querySelector('strong') : null;
        return strong ? strong.textContent.replace(/\.$/, '') : input.dataset.checkId;
      });

      const done = checkedItems.length;
      const total = items.length;
      const completed = checkedLabels.length ? checkedLabels.join(', ') : 'nothing yet';
      const next = nextLabels.length ? nextLabels.join(', ') : 'review the next guide or retest the area';
      return `I completed ${done}/${total} steps: ${completed}. My next step is: ${next}.`;
    };

    const updateProgress = () => {
      progressText.textContent = buildChecklistSummary();
    };

    items.forEach(input => {
      input.checked = Boolean(saved[input.dataset.checkId]);
      input.addEventListener('change', () => {
        saved[input.dataset.checkId] = input.checked;
        localStorage.setItem(storageKey, JSON.stringify(saved));
        updateProgress();
      });
    });

    copyButton.addEventListener('click', async () => {
      const text = buildChecklistSummary();
      try {
        await navigator.clipboard.writeText(text);
        copyButton.textContent = 'Copied';
        copyButton.classList.add('copied');
        setTimeout(() => {
          copyButton.textContent = 'Copy checklist progress';
          copyButton.classList.remove('copied');
        }, 1800);
      } catch (err) {
        copyButton.textContent = 'Select and copy manually';
      }
    });

    progressBox.appendChild(progressTitle);
    progressBox.appendChild(progressText);
    progressBox.appendChild(copyButton);
    list.insertAdjacentElement('afterend', progressBox);
    updateProgress();
  });

  // ===== AFTER RENNALA PROGRESSION HELPER =====
  const progressionForm = document.querySelector('[data-progression-helper]');
  if (progressionForm) {
    const result = progressionForm.querySelector('[data-helper-result]');
    const fields = progressionForm.querySelectorAll('input, select');

    const updateProgressionAdvice = () => {
      const level = Number(progressionForm.querySelector('[name="level"]').value || 0);
      const vigor = Number(progressionForm.querySelector('[name="vigor"]').value || 0);
      const weapon = progressionForm.querySelector('[name="weapon"]').value;
      const comfort = progressionForm.querySelector('[name="comfort"]').value;

      const issues = [];
      if (level > 0 && level < 40) issues.push('your level is still on the fragile side');
      if (vigor > 0 && vigor < 30) issues.push('your Vigor is below the comfort target');
      if (weapon === 'low') issues.push('your weapon upgrade looks behind');
      if (comfort === 'struggling') issues.push('regular enemies are still punishing you too hard');

      let title = 'You can keep progressing carefully.';
      let advice = 'Clean up any nearby Liurnia content you skipped, keep upgrading your main weapon, and test the next region without forcing it.';

      if (issues.length >= 2) {
        title = 'Do a Liurnia cleanup loop before pushing forward.';
        advice = 'Focus on mines, flask upgrades, Vigor, and one main weapon. After that, Altus or Caelid will feel much less punishing.';
      } else if (level >= 50 && vigor >= 30 && weapon !== 'low' && comfort !== 'struggling') {
        title = 'You are ready to sample the next major areas.';
        advice = 'Try Altus Plateau first for a natural progression path, or explore Caelid carefully for strong rewards if your build feels stable.';
      } else if (weapon === 'low') {
        title = 'Upgrade your weapon before farming levels.';
        advice = 'A better weapon upgrade usually improves fights faster than adding a few scattered stat points.';
      } else if (vigor > 0 && vigor < 30) {
        title = 'Raise Vigor for comfort.';
        advice = 'You can win with low Vigor, but 30+ makes learning new regions and bosses much less frustrating.';
      }

      result.innerHTML = `<strong>${title}</strong><p>${advice}</p>${issues.length ? `<p class="mini-note">Why: ${issues.join(', ')}.</p>` : ''}`;
    };

    fields.forEach(field => field.addEventListener('input', updateProgressionAdvice));
    fields.forEach(field => field.addEventListener('change', updateProgressionAdvice));
    updateProgressionAdvice();
  }

  // ===== BOSS READINESS HELPER =====
  const readinessForm = document.querySelector('[data-boss-readiness-helper]');
  if (readinessForm) {
    const result = readinessForm.querySelector('[data-helper-result]');
    const fields = readinessForm.querySelectorAll('input, select');

    const updateReadinessAdvice = () => {
      const boss = readinessForm.querySelector('[name="boss"]').value.trim() || 'this boss';
      const level = Number(readinessForm.querySelector('[name="level"]').value || 0);
      const vigor = Number(readinessForm.querySelector('[name="vigor"]').value || 0);
      const weapon = readinessForm.querySelector('[name="weapon"]').value;
      const deathReason = readinessForm.querySelector('[name="deathReason"]').value;

      const issues = [];
      if (level > 0 && level < 20) issues.push('your level is still very early');
      if (vigor > 0 && vigor < 20) issues.push('your Vigor leaves little room for mistakes');
      if (weapon === 'low') issues.push('your weapon upgrade may be behind');

      let title = `Keep practicing ${boss}.`;
      let advice = 'Your setup sounds usable. Focus on one move that keeps killing you, use shorter punish windows, and stop attacking when stamina is low.';

      if (deathReason === 'oneshot' || vigor < 20) {
        title = `Improve survivability before forcing ${boss}.`;
        advice = 'Raise Vigor, improve flasks if possible, and consider a short exploration loop. More HP gives you more chances to learn the fight.';
      } else if (deathReason === 'damage' || weapon === 'low') {
        title = `Upgrade your main weapon before farming levels.`;
        advice = 'Find Smithing Stones and invest in one weapon you actually use. Early boss damage problems often come from weapon level, not character level.';
      } else if (deathReason === 'rolling') {
        title = `Practice timing instead of over-preparing.`;
        advice = 'The build is not the main issue if missed dodges are killing you. Watch the release of the attack, delay your roll, and take only one punish.';
      } else if (deathReason === 'greed') {
        title = `Use shorter punish windows against ${boss}.`;
        advice = 'Try one light hit, one jump attack, or one weapon skill after clear recovery, then reset. Greedy follow-ups often cause more deaths than low stats.';
      } else if (deathReason === 'close' && issues.length <= 1) {
        title = `You are ready. Keep attempts focused.`;
        advice = 'If you are reaching the final third, do not rebuild everything. Take a break, practice the late-phase move, and aim to arrive there with more flasks.';
      }

      result.innerHTML = `<strong>${title}</strong><p>${advice}</p>${issues.length ? `<p class="mini-note">Watch points: ${issues.join(', ')}.</p>` : ''}`;
    };

    fields.forEach(field => field.addEventListener('input', updateReadinessAdvice));
    fields.forEach(field => field.addEventListener('change', updateReadinessAdvice));
    updateReadinessAdvice();
  }

  // ===== TOO WEAK / UNDERLEVELED HELPER =====
  const tooWeakForm = document.querySelector('[data-too-weak-helper]');
  if (tooWeakForm) {
    const result = tooWeakForm.querySelector('[data-helper-result]');
    const fields = tooWeakForm.querySelectorAll('input, select');

    const updateTooWeakAdvice = () => {
      const level = Number(tooWeakForm.querySelector('[name="level"]').value || 0);
      const vigor = Number(tooWeakForm.querySelector('[name="vigor"]').value || 0);
      const weapon = tooWeakForm.querySelector('[name="weapon"]').value;
      const problem = tooWeakForm.querySelector('[name="problem"]').value;

      const watch = [];
      if (level > 0 && level < 25) watch.push('you are still very early');
      if (vigor > 0 && vigor < 20) watch.push('your Vigor gives little room for mistakes');
      if (weapon === 'low') watch.push('your weapon upgrade may be behind');

      let title = 'Clear easier side areas, then retry.';
      let advice = 'Your next step is to stop forcing the hard route, clear easier caves or catacombs, improve flasks, and come back after your setup feels more stable.';
      let share = 'My next step is to clear easier side areas, improve my setup, then retry instead of farming blindly.';

      if (problem === 'low-damage' || weapon === 'low') {
        title = 'Upgrade your main weapon first.';
        advice = 'Early damage problems are often weapon-upgrade problems. Pick one weapon you actually use and look for Smithing Stones before farming levels.';
        share = 'My damage is probably low because my weapon upgrade is behind. My next step is to upgrade one main weapon, then retry.';
      } else if (problem === 'dying-fast' || vigor < 20) {
        title = 'Add Vigor and improve healing.';
        advice = 'If mistakes delete you instantly, more HP and better flasks will help more than chasing damage stats right now.';
        share = 'I am dying too fast. My next step is to add Vigor, improve flasks, and come back with more room to learn.';
      } else if (problem === 'lost') {
        title = 'Follow a side-area cleanup loop.';
        advice = 'Mark the hard route, then clear nearby caves, catacombs, churches, and easier field bosses. Return after upgrades and flask improvements.';
        share = 'I feel lost. My next step is to clear side caves, catacombs, and flask upgrades before pushing the main path.';
      } else if (problem === 'boss-wall' && watch.length <= 1) {
        title = 'You may be ready to practice the boss.';
        advice = 'If your damage and survivability are okay, focus on learning recovery windows instead of rebuilding everything.';
        share = 'My setup may be good enough. My next step is to practice safer punish windows instead of farming blindly.';
      } else if (problem === 'no-flasks') {
        title = 'Improve flasks before more attempts.';
        advice = 'Look for churches, Golden Seeds, and side areas. Better healing gives you more attempts to learn each route or boss.';
        share = 'I keep running out of healing. My next step is to improve flasks and clear easier side content first.';
      }

      result.innerHTML = `<strong>${title}</strong><p>${advice}</p><p class="mini-note"><strong>Copy-friendly summary:</strong> ${share}</p>${watch.length ? `<p class="mini-note">Watch points: ${watch.join(', ')}.</p>` : ''}`;
    };

    fields.forEach(field => field.addEventListener('input', updateTooWeakAdvice));
    fields.forEach(field => field.addEventListener('change', updateTooWeakAdvice));
    updateTooWeakAdvice();
  }

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
