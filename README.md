
readme_content = """# Sekiro: Shadows Die Twice — Complete Guide

A comprehensive, open-source guide website for **Sekiro: Shadows Die Twice**. Built with pure HTML/CSS/JS — no frameworks, no backend required.

🔗 **Live Site**: [https://gamepanduan.dpdns.org/EldenRing/](https://gamepanduan.dpdns.org/EldenRing/)

---

## 📖 What's Inside

This guide covers everything a shinobi needs to survive Ashina:

| Section | Content |
|---------|---------|
| **Characters & Skills** | Skill trees, priority abilities, Ninjutsu techniques, Prayer Bead upgrades |
| **Boss Strategies** | Phase-by-phase breakdowns for every major boss — Gyoubu, Lady Butterfly, Genichiro, Guardian Ape, Isshin Sword Saint, and more |
| **Builds & Prosthetics** | Prosthetic tool loadouts, upgrade paths, skill builds, combat art recommendations |
| **Tips & Techniques** | Deflection timing, Perilous Attack counters, stealth mechanics, Dragonrot management |
| **World Map & Progression** | Region-by-region walkthrough, collectible locations (Prayer Beads, Gourd Seeds, Lapis Lazuli) |
| **FAQ** | Searchable answers to common questions — endings, mechanics, difficulty, farming |

---

## 🗂️ Project Structure

```
sekiro-guide/
├── index.html              # Homepage + quick navigation
├── faq.html                # Searchable FAQ with collapsible sections
├── characters/
│   └── index.html          # Skills, stats, and progression
├── bosses/
│   ├── index.html          # Boss overview & checklist
│   ├── isshin.html         # Isshin, the Sword Saint (4-phase guide)
│   └── guardian-ape.html   # Guardian Ape (beast + headless phases)
├── builds/
│   └── index.html          # Prosthetic builds & upgrade priority
├── tips/
│   └── index.html          # Combat tips, mini-boss guide, farming spots
├── map/
│   └── index.html          # Region progression & collectible locations
└── assets/
    ├── style.css           # Dark theme with crimson accents
    └── main.js             # Collapsible sections, search filter, back-to-top
```

---

## 🚀 How to Use

### Option 1: Open Locally
1. Download or clone this repository
2. Open `index.html` in any modern browser
3. No server or build step required

### Option 2: Deploy to GitHub Pages
1. Fork or upload this repo to GitHub
2. Go to **Settings → Pages**
3. Select **Deploy from a branch** → `main` → `/(root)`
4. Your site will be live at `https://gamepanduan.dpdns.org/SekiroGuide/`

---

## 🎮 About the Game

**Sekiro: Shadows Die Twice** is an action-adventure game developed by FromSoftware and published by Activision. It features posture-based combat, stealth mechanics, and a steep but rewarding difficulty curve.

- **Developer**: FromSoftware
- **Publisher**: Activision
- **Platforms**: PS4, Xbox One, PC
- **Genre**: Action / Stealth

---

## 🛒 Affiliate Links

This guide contains affiliate links. As an Amazon Associate, we earn from qualifying purchases at no extra cost to you.

- [Buy Sekiro: Shadows Die Twice (PS5) on Amazon](https://amzn.to/4wj3AIL)
- [Buy Controller on Amazon](https://amzn.to/4u0dlKt)

---

## ⚠️ Disclaimer

This is an **unofficial fan-made guide**. We are not affiliated with FromSoftware, Activision, or any related entities. All game content, characters, and trademarks belong to their respective owners.

---

## 📄 License

This project is open source. Feel free to fork, modify, and deploy your own version.

---

*Happy hunting, shinobi. Hesitation is defeat.*
"""

with open("/mnt/agents/output/sekiro-guide/README.md", "w", encoding="utf-8") as f:
    f.write(readme_content)

