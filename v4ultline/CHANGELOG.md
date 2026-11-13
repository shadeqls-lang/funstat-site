# Vaultline changelog

Every update to `v4ultline/` is logged here, newest first.
Live: http://funstat.xyz/v4ultline/

---

## 2026-11-13 · Liquid PIPELINE, glowing share grid, smoothness, spacing

### PIPELINE fill (stronger)
- Each letter of PIPELINE now fills one after another with liquid light. The surface is a rolling wave that moves sideways while a letter fills.
- A filled letter flashes, pops slightly larger, keeps a soft glow and its outline brightens.
- Once the whole word is full, a wave of light runs across the letters on a loop.
- The fill is eased toward the scroll position, so it glides instead of jumping on fast scrolls. The step scale under it uses the same easing.

### Share grid (hero)
- A glowing band sits on the grid lines right at the edge of your 10%. It is bright during the scan and breathes afterwards.
- After the first scan, a pulse of light runs through the grid from the back of the car into your 10% every ~4.6 s.
- The **Your share** chip lights up while the scan runs and every time a pulse reaches your 10%. It brightens, lifts and glows. The "Your 10%" key under the car lights up with it.
- Pipeline step 2: the share bar fills from 0 to 10% with a glow, a light runs across the grid part of the bar, and the 10% number counts up when the step opens.

### Smooth everywhere
- Cross-fade when moving between pages (home, explore, profile, roadmap, marketplace) in browsers that support it.
- Smooth wheel scrolling (Lenis) and gliding anchor links now also on profile, roadmap and marketplace (new shared file `soft.js`).
- Fade-up reveals added to the new blocks (tiles, roadmap window, page head, bay card) and to the profile and marketplace sections.
- Roadmap window bars fill up one after another when the block scrolls into view.
- Softer, longer easing on the step crossfade, buttons, hotspots and tooltips.

### Spacing
- One vertical rhythm for all sections: section padding `clamp(84px, 9vw, 128px)` (76px on phones), the same gap under every section head, and the same gap under title + button rows.
- Explore: tighter page head → first section, and the Spin sits right under the Vault picker.
- Profile and marketplace sections use the same rhythm.
- "Everything else" and "The roadmap" heads now break the same way (title, then the grey line under it).

### Bug fixes
- Project card on explore: "Your share 10% · $..." was cut off. The dollar amount now sits on its own line.

---

## 2026-11-13 · Two pages, roadmap window, button layout, cleanup (boss edits 6–8)

### New page: explore.html (How it works)
- Everything below the vault moved to **explore.html**: Six steps, Three Vaults, Pick a Vault (the Spin), Rarities, Your project, Thirteen cars, FAQ.
- New page head "How it all works." with jump links to every section.
- The main page now runs: hero → Pipeline → Where your car lives → Everything else → Roadmap → pre-footer → footer.
- On the main page, a new **"Everything else. On one page."** block has six tiles that open the matching section on explore.html, plus an **"Open how it works"** button styled like Join Spin.
- Every link to a section on the other page now goes there automatically (`explore.html#spin`, `index.html#showroom`), including links on profile, roadmap and marketplace.
- The 3D car is not downloaded on explore.html.
- Note: `explore.html` is a copy of `index.html`. The page picks its sections by its file name. **Edit index.html, then copy it to explore.html.**

### Profile
- "My projects" (side drawer) in the header is replaced by a **Profile** button that opens profile.html.

### Roadmap window (main page)
- New block "The roadmap. What ships next." It shows 5 phases on a timeline (Live, Share Market, 3D Showroom, Race Manager, Upgrade Spin) with target dates and progress bars.
- A **"Read the roadmap in detail"** button opens roadmap.html.

### Button layout across the site
- Header: in-page links on the left, compact; navigation buttons on the right. On the main page that is How it works, Profile and Join Spin. On explore.html it is Home, Profile and Join Spin.
- Hero: "See the pipeline ↓" (in-page) is compact and sits on the left. "How it works →" and "Join Spin" (other page) sit on the right.
- Pipeline step 4 and the section heads: navigation buttons are aligned right.

### Symmetry and polish
- Section heads are centered across the site (Six steps, Vaults, Spin, Rarities, Project, Cars, "Where your car lives", "The short version").
- Blocks that pair a title with a button keep the title on the left and the button on the right on desktop. On mobile they are centered with a full-width button.
- Mobile tiles show in a 2×3 grid instead of six stacked cards.
- The roadmap window scrolls sideways on tablet and phone, with the line running through the dots.

### Bug fixes
- Header overflowed the screen on phones (page scrolled sideways): fixed.
- Bay card covered the vault photo on phones: it now sits under the photo.
- On explore.html the logo goes to the main page.
- The "Simulated activity" ticker is hidden (filler, scrolled like a marquee).

### Palette (no yellow, no green)
- Legendary gold and its foils are now pearl/ice (#DCE4F4, #EEF2FB). Uncommon green is now glacier blue (#8FB2D2). The warm glows on the Spin bay are recoloured to match.
- The hero chip had a greenish background: it now uses the palette.
- Market up/down (gain/loss) colours are unchanged.

---

## 2026-11-13 · Pipeline and the vault bay (boss edits 4–5)

### Showroom → PIPELINE
- The Porsche step block is now a **PIPELINE**: a huge outlined word behind the car that fills with light as you scroll, with a bright leading edge.
- New progress scale at the bottom: 25% Spin · 50% Share · 75% Colour vote · 100% Next move. It fills continuously with scroll.
- Each step now has a **description on top** and an **example at the bottom**. Only the active step is shown, with a crossfade between steps.
  - **Step 01, The Spin picks the car.** A mini Spin reel runs through the vault's cars and lands on the Porsche 911 Carrera 4S. At the same time the 3D car does a full turn.
  - **Step 02, Your share is real metal.** Example: $9,000 into a $90,000 pool = 10%. The bar shows the real 10% next to the gridded 90%.
  - **Step 03, Owners vote on the colour.** The live wrap vote is unchanged.
  - **Step 04, Then on what it does next.** Text kept as before. Added a Yield / Hold / Recycle example and the Join Spin / See the project buttons.
- Mobile: the word sits above the car, the car moved down a little, and step labels are shortened.

### Where your car lives (redone)
- New lead: nobody takes the car home; it sits in its own bay, insured, logged and untouched.
- "A car's life in the vault" timeline: Day 0 inspection, Day 0 insurance, check-up every 30 days, leaves only on a vote.
- Hotspots on the vault image: Bay B-14, Lift level, Check-up station, Ramp. They show on hover or tap.
- **Bay B-14 card** with the project's car, status, insured value, odometer, last check-up and an "Open the bay log" link.

---

## 2026-11-12 · First screen and guide cards (boss edits 1–3)

### First screen
- Headline smaller and moved up (one line on desktop); lede and buttons compacted so the car is fully visible on load.
- The car spins straight away, about 2.5× faster than before.
- **10% split.** A scan frame sweeps the car and turns 90% of it into a grid in the palette colour #99B3C6. Your 10% stays real metal. Added a legend under the car. The grid fades out as you scroll to the showroom.
- Share chip now reads "Your share · 10% · $9,000 of real metal".

### Hint under the car
- Larger, brighter text and icon (icon unchanged).

### Three cards
- New heading "The short version. Three things to know."
- Bigger, taller rectangular cards numbered 01–03.
- Each card expands on hover with a detailed explanation; on touch screens the details are always open.
- Cards are opaque, so the 3D car passes behind them while scrolling.
