# KLE Technical SEO + IA Pairing Checklist

This checklist aligns technical implementation with the renewed sitemap and content strategy.

## 1) `robots.txt` Implementation

### Required
- Add root file: `/robots.txt`.
- Include:
  - `User-agent: *`
  - `Disallow:` (blank allow-all unless specific blocks are needed)
  - `Sitemap: https://www.kotharileadership.com/sitemap.xml`

### Validation
- Confirm `https://www.kotharileadership.com/robots.txt` returns status 200.
- Confirm robots does not block `/services/`, `/results/`, `/case-studies/`, `/locations/`.

## 2) `sitemap.xml` Implementation

### Required
- Publish `/sitemap.xml` with canonical URLs only.
- Include all indexable pages in the MVP sitemap:
  - home, contact, approach, eq-execution, 9lens, alignment-test
  - services hub + child service pages
  - results, testimonials, case studies index + live case pages
  - team, founder page
  - OC/LA/Newport Beach location pages

### Validation
- Confirm `https://www.kotharileadership.com/sitemap.xml` returns 200 and valid XML.
- Submit sitemap in Google Search Console and Bing Webmaster Tools.

## 3) Navigation URL Parity (IA -> Crawlability)

### Required
- Every top-nav and footer-nav destination must point to a real crawlable URL.
- Avoid nav links that only jump to homepage sections where SEO page is intended.
- Ensure service and location links resolve directly to dedicated URLs.

### Validation
- Crawl nav links and confirm no 404/redirect chains.
- Keep key commercial pages within 1-2 clicks from home.

## 4) Duplicate Block Cleanup

### Problem To Prevent
- Repeating large content blocks across homepage and child pages causes content dilution.

### Required
- Remove duplicate "services" and repeated proof sections.
- Keep each page focused on one core intent.
- Reuse snippets sparingly; expand with unique context per page.

### Validation
- Manual page review for repeated sections.
- Ensure each URL has a distinct H1 + opening paragraph + primary CTA context.

## 5) Canonical Rules

### Required
- Self-referencing canonical on every indexable page.
- One canonical version for:
  - protocol (`https`)
  - hostname (`www` or non-`www`, choose one)
  - trailing slash pattern (consistent)
- Canonical all duplicate/near-duplicate variants to the preferred URL.

### Validation
- Crawl all key URLs and confirm canonical points to self or intended preferred page.
- Verify no key pages canonicalise to homepage by mistake.

## 6) Indexation Hygiene

### Required
- Ensure key commercial pages are indexable:
  - no unintended `noindex`
  - no blocked robots directives
  - valid canonicals
- Use internal links from home/services/results to all money pages.

### Validation
- GSC URL Inspection for:
  - `/services/executive-coaching`
  - `/services/fractional-c-suite`
  - `/services/fractional-cfo`
  - `/locations/orange-county-executive-coaching`
  - `/results`

## 7) On-Page Technical Standards

### Required
- One H1 per page.
- Unique title + meta description per page.
- Descriptive, clean URL slugs.
- Optimised images with alt text and compressed format.

### Validation
- Run crawler export and check duplicates/missing tags.

## 8) Schema Validation Workflow

### Required
- Implement appropriate schema (Organisation, LocalBusiness where appropriate, Service, FAQ where used, Article for case studies).
- Validate using rendered tools, not static fetch output only.

### Validation
- Use Google Rich Results Test for representative pages:
  - home
  - one service page
  - one case study
  - one location page

## 9) Launch QA Sequence

1. Validate robots and sitemap.
2. Validate nav links + status codes.
3. Validate canonicals and indexability.
4. Validate metadata uniqueness.
5. Validate schema rendering.
6. Submit sitemap and request indexing for priority pages.

## 10) Priority Order For Implementation

1. Robots + sitemap live.
2. Nav URL parity and 404 cleanup.
3. Canonicals and duplicate cleanup.
4. Metadata and heading uniqueness.
5. Schema validation and GSC submissions.

