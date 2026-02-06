# Credicheck
---

````markdown
# CrediCheck 🔍

**Quickly judge if an internship is safe, risky, or needs caution.**  
Powered by simple credibility checks so students don’t fall for fake listings.

---

## Demo

**Live Demo:** [Add your Vercel URL here]  

Screenshot / GIF placeholder:

![CrediCheck Demo](screenshot.png)

---

## Features

- **Check Internship Credibility:** Enter company name, internship link, and optional notes.  
- **Credibility Score:** 0–100, with label ✅ Safe / ⚠️ Caution / ❌ Risky.  
- **Red Flags Detection:** Detects payment requests, WhatsApp-only contacts, suspicious authority claims, and too-good-to-be-true promises.  
- **Trusted Platform Recognition:** Recognizes LinkedIn, Internshala, Glassdoor, and other verified portals.  
- **Minimalist, Modern UI:** Gradient background, card layout, fade-in results, color-coded icons.  

---

## Installation

```bash
# Clone the repository
git clone https://github.com/your-username/internship-credibility-mvp.git

# Go into the project folder
cd internship-credibility-mvp

# Install dependencies
npm install

# Run locally
npm run dev
````

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

---

## Usage

1. Enter the **Company Name**.
2. Enter the **Internship Link**.
3. Optionally, add **Description / Notes**.
4. Click **Check Score**.
5. View the **Score, Label, and Reasons** instantly.

---

## Project Structure

```
internship-credibility-mvp/
├─ app/
│  └─ page.js          # Main frontend page
├─ data/
│  ├─ calculateScore.js # Core scoring logic
│  └─ scoringRules.js   # Trusted platforms & red flags
├─ public/             # Images or screenshots
├─ package.json
├─ .gitignore
├─ LICENSE
└─ README.md
```

---

## Tech Stack

* **Frontend & Backend:** Next.js (App Router)
* **Hosting:** Vercel
* **Language:** JavaScript (ES6)
* **Database:** None (rules & scoring are static for MVP)

---

## License

This project is licensed under the **MIT License**.

---

## Future Enhancements

* Deep scam detection using NLP / AI
* Real-time domain and website verification
* Cross-check internship on LinkedIn / government registries
* User feedback and reporting system
* Progressive web app support

```

---

💡 **Tips for next steps:**

1. Add a screenshot of the app in `public/screenshot.png` and replace the placeholder.  
2. Fill in your **live Vercel URL** in the Demo section.  
3. Push this README along with your `.gitignore` and `LICENSE` to GitHub.  


