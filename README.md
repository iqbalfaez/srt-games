# MOH Kitchen Inspector: Food Sanitation Mission (KSSM SRT Form 5)

An interactive educational web simulation game aligned with **KSSM Home Science (Sains Rumah Tangga / SRT) Form 5 — Chapter 2: Sanitation in Food Preparation and Storage**.

## Syllabus Mapping (Chapter 2)

| Level | Game Module | KSSM Subtopic | Learning Focus |
| :--- | :--- | :--- | :--- |
| **Level 1** | Morning Shift Staff Checkpoint (*Papers, Please* style) | **2.2** Food Handling | Food handler attire, hairnets, closed shoes, no jewelry, waterproof wound protection, SLPM & Typhoid vaccination (Regulations 30–33, Food Hygiene Regulations 2009) |
| **Level 2** | Commercial Kitchen Visual Audit (8 Interactive Pins) | **2.1 & 2.2** Kitchen Hygiene Practices | Grease trap maintenance, dedicated handwash basin, cross-contamination, color-coded cutting boards, exhaust hood cleaning, two-spoon tasting, air-dried elevated racks & foot-pedal bins |
| **Level 3** | Cold-Chain & Storage Audit | **2.3** Food Storage | Chiller (`0°C–4°C`), Freezer (`≤ -18°C`), Dry Store (`10°C–21°C`), Temperature Danger Zone (`5°C–60°C`), chiller shelf hierarchy, 15 cm floor clearance & **FIFO** stock rotation |

## Key Features

- **Decoupled Academic Grade & Arcade Score:** Official Grades (**Grade A ≥ 85%**, **Grade B 60–84%**, **Grade C < 60%**) are based strictly on accuracy, while arcade points reward streaks and remaining time without penalizing students who read textbook feedback carefully.
- **Learning-Friendly Timer:** The 120s countdown auto-pauses while reading explanations, answering hotspot quizzes, or consulting the **MOH Sanitation Handbook**. Also includes a **Practice Mode (Untimed)**.
- **Dynamic Audit Dates:** Typhoid vaccination and FIFO product expiry dates are generated relative to the current date so scenarios never go stale.
- **Audit Report & Printable Certificate (A4 Landscape):** Includes Subtopic 2.1/2.2/2.3 mastery bars, a Revision Checklist of mistakes, and a print-ready **Junior Kitchen Inspector Certificate**.
- **Zero-Dependency Web Audio:** Synthesized stamp, chime, alert, and victory fanfare sound effects with a global mute toggle.

## Local Development

```bash
npm install
npm run dev
```

### Typecheck, Unit Tests & Production Build

```bash
npm run typecheck
npm test
npm run build
```

## GitHub Pages Deployment

Automated CI/CD is configured in `.github/workflows/deploy.yml`. Enable **Settings → Pages → Source: GitHub Actions** and every push to `main` builds, tests, and deploys automatically.
