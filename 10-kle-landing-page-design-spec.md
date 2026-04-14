# KLE Landing Page Design Spec (Single-Page Campaign Layout)

Built from:
- `06-homepage-copy.md`
- `07-about-page-copy.md`
- `08-results-page-copy.md`
- `09-contact-page-copy.md`
- `KLE Brand Guide 2026`

## 1) Objective

Design one high-converting landing page that:
- speaks to leadership pain from line 1
- establishes trust fast
- demonstrates results
- drives one action: book a free 30-minute consultation

Secondary action: take the 9Lens alignment test.

---

## 2) Brand System (from KLE Brand Guide)

### Core palette
- Kothari Red: `#b2292d`
- Kothari Grape: `#1d1b23`
- Kothari Champagne: `#e9db9c`
- White: `#ffffff`
- Black: `#222222`

### Secondary accents
- Emerald: `#12d983`
- Orange: `#eb8328`
- Sky: `#0982c8`
- Purple: `#693aa6`
- Royal: `#2f3061`

### Typography
- Primary: `Barlow` (H1 extra bold, H2 bold, H3 semibold, body light/regular)
- Secondary display accent: `Tuesday Night` (use sparingly for signature flourishes only)

---

## 3) Visual Direction

- Premium, high-contrast, editorial layout.
- Pain-point-first messaging with clear scan paths.
- Confident and understated, not loud.
- Use subtle contour/topographic line pattern in low-opacity background blocks.
- Keep section spacing generous (`80-120px`) to reduce cognitive load.

---

## 4) Page Structure (recommended order)

1. Sticky nav + CTA
2. Hero (pain-point first)
3. Trust strip (stats + logos)
4. Pain diagnosis section
5. Solution section (what KLE changes)
6. Service pathways (3 cards)
7. Results section (quotes + KPI tiles)
8. About/founder credibility strip
9. FAQ / objection handling
10. Contact conversion block
11. Footer

---

## 5) Section Design + Content Guidance

## Hero
- Background: Grape (`#1d1b23`) with soft contour pattern.
- Eyebrow text in Champagne (`#e9db9c`): "Executive Coaching + Fractional C-Suite Support"
- H1 in white:
  - "Your team is busy. Execution is still breaking down."
- Subhead in off-white (90% opacity).
- Primary CTA: red button (`#b2292d`) with white text.
- Secondary CTA: text button in Champagne.

Layout:
- Left: copy stack
- Right: contextual leadership image (not generic handshake)

## Trust strip
- White background.
- 3 KPI cards with subtle border and light shadow:
  - 125+ CEOs coached
  - 15+ exits/sales
  - 15%-30% enterprise value increase
- Optional logo row beneath cards in grayscale.

## Pain diagnosis
- Light Champagne background.
- Section title:
  - "Is this what growth looks like right now?"
- 4-point pain list with red icon bullets.
- Inline CTA after pain block: "Book a Consultation"

## Solution
- White background.
- Left column: "We do not just advise. We help you change how the team operates."
- Right column: 4 benefit cards (Alignment, Decision Speed, Ownership, Strategic Leadership)
- Use Emerald accent for positive outcome markers.

## Service pathways
- Grape background.
- 3 service cards in white with coloured top bars:
  - Coaching (Red)
  - Fractional (Royal)
  - Facilitation (Sky)
- Each card includes one-line pain fit + CTA.

## Results block
- White background.
- Two-column layout:
  - Left: testimonial carousel/stack
  - Right: outcome metrics and case-study mini cards
- Pull quotes from existing drafts.

## About / founder credibility
- Split block with founder image + concise story.
- Header:
  - "Leadership that executes under pressure."
- Include one differentiator list: candour, leadership depth, execution support, business focus.

## FAQ
- Accordion component on white/very light grey.
- Include 4-6 practical pre-sales questions.

## Contact conversion block
- Dark gradient panel (Grape -> Royal).
- Left: "Ready to get clear on the bottleneck?"
- Right: compact form (5 fields max) + phone + address.
- Primary CTA repeated.

---

## 6) UI Tokens (implementation-ready)

```css
:root {
  --kle-red: #b2292d;
  --kle-grape: #1d1b23;
  --kle-champagne: #e9db9c;
  --kle-white: #ffffff;
  --kle-black: #222222;
  --kle-emerald: #12d983;
  --kle-orange: #eb8328;
  --kle-sky: #0982c8;
  --kle-purple: #693aa6;
  --kle-royal: #2f3061;
}
```

---

## 7) CTA Rules

- Primary CTA label everywhere: `Book Your Free 30-Minute Consultation`
- Secondary CTA label: `Take the 9Lens Alignment Test`
- Show primary CTA:
  - hero
  - after pain section
  - after results section
  - final contact block

---

## 8) Mobile Behaviour

- Collapse hero to single column with CTA stack.
- Make primary CTA full-width (min 48px height).
- Keep pain bullets and service cards vertically stacked.
- Sticky bottom CTA bar on mobile:
  - "Book Free 30-Min Consultation"

---

## 9) Asset Direction

- Imagery: real leadership moments, boardroom facilitation, coaching interactions.
- Avoid: handshake stock photos, abstract random gradients without context.
- Pattern usage: subtle contour line overlays at 5-8% opacity only.

---

## 10) Launch Checklist

- Finalise copy in each section from drafts.
- Add real client logos and approved testimonials.
- Embed booking calendar in contact block.
- Validate contrast and mobile layout.
- Compress hero image under 200KB.

