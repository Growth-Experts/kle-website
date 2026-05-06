const pptxgen = require("pptxgenjs");

const pptx = new pptxgen();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "Kothari Leadership";
pptx.company = "Kothari Leadership";
pptx.subject = "Who We Are";
pptx.title = "KLE - Who We Are";
pptx.lang = "en-US";

const colors = {
  // KLE Brand Guide 2026 palette
  red: "B2292D", // Kothari Red
  grape: "1D1B23", // Kothari Grape
  black: "222222", // Neutral black
  white: "FFFFFF",
  bg: "B2292D",
  bgLight: "FFFFFF",
  textDark: "1D1B23",
  textMid: "4A4556",
  primary: "B2292D",
  accent: "FFFFFF",
  success: "FFFFFF",
};

const fonts = {
  // Brand guide: primary Barlow, secondary Tuesday Night
  heading: "Barlow",
  body: "Barlow",
  accent: "Tuesday Night",
};

function addFooter(slide) {
  slide.addText("Kothari Leadership", {
    x: 0.5,
    y: 6.95,
    w: 3.0,
    h: 0.2,
    fontFace: fonts.body,
    fontSize: 10,
    color: colors.white,
  });
}

// Slide 1: Title
{
  const s = pptx.addSlide();
  s.background = { color: colors.bg };
  s.addText("Who We Are", {
    x: 0.6,
    y: 1.35,
    w: 7.0,
    h: 0.9,
    fontFace: fonts.heading,
    bold: true,
    fontSize: 56,
    color: colors.white,
  });
  s.addText("Kothari Leadership", {
    x: 0.62,
    y: 2.35,
    w: 7.0,
    h: 0.5,
    fontFace: fonts.heading,
    fontSize: 30,
    color: "E6DDE0",
  });
  s.addShape(pptx.ShapeType.line, {
    x: 0.62,
    y: 3.05,
    w: 3.2,
    h: 0,
    line: { color: colors.red, pt: 3 },
  });
  s.addText("Executive coaching + practical execution support for growth-minded leaders.", {
    x: 0.62,
    y: 3.35,
    w: 10.8,
    h: 0.8,
    fontFace: fonts.body,
    fontSize: 19,
    color: "D6CDD0",
  });
}

// Slide 2: Core positioning
{
  const s = pptx.addSlide();
  s.background = { color: colors.bgLight };
  s.addText("Built for leaders carrying too much, too often.", {
    x: 0.6,
    y: 0.6,
    w: 11.8,
    h: 0.9,
    fontFace: fonts.heading,
    bold: true,
    fontSize: 40,
    color: colors.textDark,
  });
  s.addText(
    "Most teams already know what they should do. The breakdown happens in how priorities are communicated, decisions are made, and accountability is held under pressure.",
    {
      x: 0.6,
      y: 1.7,
      w: 11.3,
      h: 1.4,
      fontFace: fonts.body,
      fontSize: 20,
      color: colors.textMid,
    }
  );
  s.addShape(pptx.ShapeType.roundRect, {
    x: 0.6,
    y: 3.5,
    w: 11.1,
    h: 2.2,
    radius: 0.08,
    fill: { color: "FFFFFF" },
    line: { color: colors.red, pt: 1 },
  });
  s.addText("We close the gap between strategic intent and consistent execution.", {
    x: 1.0,
    y: 4.15,
    w: 10.3,
    h: 0.8,
    fontFace: fonts.heading,
    bold: true,
    fontSize: 31,
    color: colors.red,
    align: "center",
  });
  addFooter(s);
}

// Slide 3: Who we help
{
  const s = pptx.addSlide();
  s.background = { color: "FFFFFF" };
  s.addText("Who We Help", {
    x: 0.6,
    y: 0.55,
    w: 5.0,
    h: 0.6,
    fontFace: fonts.heading,
    bold: true,
    fontSize: 36,
    color: colors.textDark,
  });
  const segments = [
    "Founders and CEOs scaling teams",
    "Leadership teams facing misalignment",
    "Companies navigating transition or accelerated growth",
    "Organisations needing coaching, fractional leadership, or facilitation support",
  ];
  segments.forEach((t, i) => {
    const y = 1.45 + i * 1.25;
    s.addShape(pptx.ShapeType.roundRect, {
      x: 0.85,
      y,
      w: 10.8,
      h: 0.9,
      radius: 0.06,
      fill: { color: i % 2 === 0 ? colors.white : "F7F7F7" },
      line: { color: colors.red, pt: 1 },
    });
    s.addText(t, {
      x: 1.2,
      y: y + 0.24,
      w: 10.2,
      h: 0.5,
      fontFace: fonts.body,
      fontSize: 21,
      color: colors.textDark,
    });
  });
  addFooter(s);
}

// Slide 4: Amit
{
  const s = pptx.addSlide();
  s.background = { color: colors.bg };
  s.addText("Meet Amit Kothari", {
    x: 0.7,
    y: 0.65,
    w: 6.0,
    h: 0.6,
    fontFace: fonts.heading,
    bold: true,
    fontSize: 38,
    color: colors.white,
  });
  s.addText("Hailed by clients as the \"CEO Whisperer(TM)\", Amit leads strategic direction at Kothari Leadership Enterprises.", {
    x: 0.72,
    y: 1.45,
    w: 7.3,
    h: 0.95,
    fontFace: fonts.body,
    bold: true,
    fontSize: 17,
    color: colors.white,
  });
  s.addText(
    "Former COO/CFO with 15+ years of executive experience.\nDirected 50+ strategic transformations across growth companies.\nFrom nimble start-ups to $2B+ enterprises, he helps leaders convert potential into measurable, sustainable growth.",
    {
      x: 0.72,
      y: 2.38,
      w: 7.3,
      h: 1.9,
      fontFace: fonts.body,
      fontSize: 15,
      color: colors.white,
      breakLine: true,
    }
  );
  s.addText(
    "EQ + Execution(TM): strategic depth + actionable leadership to align teams, unlock growth, and build enduring success.",
    {
      x: 0.72,
      y: 4.35,
      w: 7.3,
      h: 0.85,
      fontFace: fonts.body,
      fontSize: 14,
      italic: true,
      color: colors.white,
    }
  );
  s.addShape(pptx.ShapeType.roundRect, {
    x: 8.35,
    y: 1.25,
    w: 3.1,
    h: 3.9,
      radius: 0.08,
      fill: { color: "2B1F24" },
      line: { color: colors.red, pt: 1.5 },
  });
  s.addText("CEO\nWhisperer(TM)", {
    x: 8.35,
    y: 2.05,
    w: 3.1,
    h: 1.2,
    align: "center",
    valign: "mid",
    fontFace: fonts.heading,
    fontSize: 24,
    bold: true,
    color: colors.white,
  });
  addFooter(s);
}

// Slide 5: How we work
{
  const s = pptx.addSlide();
  s.background = { color: colors.bgLight };
  s.addText("How We Work: EQ + Execution", {
    x: 0.6,
    y: 0.55,
    w: 11.2,
    h: 0.7,
    fontFace: fonts.heading,
    bold: true,
    fontSize: 36,
    color: colors.textDark,
  });
  const cards = [
    ["Clarity", "Identify the leadership and operating constraints behind stalled execution."],
    ["Alignment", "Align people, roles, priorities, and communication."],
    ["Mastery", "Build leadership habits that scale beyond one person."],
    ["Agility", "Install operating rhythms that sustain execution under pressure."],
  ];
  cards.forEach((c, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.8 + col * 5.65;
    const y = 1.55 + row * 2.45;
    s.addShape(pptx.ShapeType.roundRect, {
      x,
      y,
      w: 5.2,
      h: 2.1,
      radius: 0.08,
      fill: { color: "FFFFFF" },
      line: { color: colors.red, pt: 1 },
    });
    s.addText(c[0], {
      x: x + 0.3,
      y: y + 0.25,
      w: 4.6,
      h: 0.4,
      fontFace: fonts.heading,
      bold: true,
      fontSize: 24,
      color: colors.red,
    });
    s.addText(c[1], {
      x: x + 0.3,
      y: y + 0.8,
      w: 4.6,
      h: 1.0,
      fontFace: fonts.body,
      fontSize: 16,
      color: colors.textMid,
    });
  });
  addFooter(s);
}

// Slide 6: Differentiators
{
  const s = pptx.addSlide();
  s.background = { color: "FFFFFF" };
  s.addText("What Makes KLE Different", {
    x: 0.6,
    y: 0.55,
    w: 11.4,
    h: 0.7,
    fontFace: fonts.heading,
    bold: true,
    fontSize: 36,
    color: colors.textDark,
  });
  const points = [
    ["Candour", "We surface the issue beneath the symptom."],
    ["Leadership depth", "We build behaviour change at executive level."],
    ["Execution support", "We help teams apply change in real operating conditions."],
    ["Business focus", "We connect leadership work to measurable outcomes."],
  ];
  points.forEach((p, i) => {
    const y = 1.55 + i * 1.2;
    s.addShape(pptx.ShapeType.ellipse, {
      x: 0.8,
      y: y + 0.24,
      w: 0.2,
      h: 0.2,
      fill: { color: colors.primary },
      line: { color: colors.red, pt: 0 },
    });
    s.addText(`${p[0]}: ${p[1]}`, {
      x: 1.15,
      y,
      w: 10.6,
      h: 0.7,
      fontFace: fonts.body,
      fontSize: 22,
      color: colors.textDark,
      breakLine: false,
    });
  });
  addFooter(s);
}

// Slide 7: Proof
{
  const s = pptx.addSlide();
  s.background = { color: colors.bg };
  s.addText("Proof That Builds Trust", {
    x: 0.65,
    y: 0.55,
    w: 11.0,
    h: 0.7,
    fontFace: fonts.heading,
    bold: true,
    fontSize: 36,
    color: colors.white,
  });
  const stats = [
    ["125+", "CEOs coached since 2008"],
    ["15+", "companies exited or sold"],
    ["15%-30%", "annual enterprise value increase (client-reported range)"],
    ["100%", "promotion rate among directly coached leaders (client-reported)"],
  ];
  stats.forEach((st, i) => {
    const x = 0.7 + (i % 2) * 5.6;
    const y = 1.45 + Math.floor(i / 2) * 2.05;
    s.addShape(pptx.ShapeType.roundRect, {
      x,
      y,
      w: 5.2,
      h: 1.7,
      radius: 0.08,
      fill: { color: "7D1D24" },
      line: { color: "E0B6B8", pt: 1 },
    });
    s.addText(st[0], {
      x: x + 0.28,
      y: y + 0.18,
      w: 4.9,
      h: 0.6,
      fontFace: fonts.heading,
      bold: true,
      fontSize: 34,
      color: colors.white,
    });
    s.addText(st[1], {
      x: x + 0.28,
      y: y + 0.88,
      w: 4.8,
      h: 0.6,
      fontFace: fonts.body,
      fontSize: 14,
      color: colors.white,
    });
  });
  s.addText('"They are one of the rare ones that actually get stuff done." - Patrick Butler, CEO', {
    x: 0.75,
    y: 5.75,
    w: 11.0,
    h: 0.5,
    fontFace: fonts.body,
    italic: true,
    fontSize: 16,
    color: colors.white,
    align: "center",
  });
}

// Slide 8: Engagement pathways
{
  const s = pptx.addSlide();
  s.background = { color: "FFFFFF" };
  s.addText("How We Engage", {
    x: 0.6,
    y: 0.55,
    w: 10.0,
    h: 0.7,
    fontFace: fonts.heading,
    bold: true,
    fontSize: 36,
    color: colors.textDark,
  });
  const paths = [
    ["Executive + Leadership Team Coaching", "Behaviour, alignment, and decision-quality upgrades at leadership level."],
    ["Fractional C-Suite Support", "Practical finance, sales, marketing, or people leadership capacity."],
    ["Strategy Facilitation + Offsites", "Focused alignment, planning, and execution commitments."],
  ];
  paths.forEach((p, i) => {
    const y = 1.55 + i * 1.7;
    s.addShape(pptx.ShapeType.roundRect, {
      x: 0.75,
      y,
      w: 11.0,
      h: 1.35,
      radius: 0.08,
      fill: { color: i % 2 === 0 ? colors.white : "F7F7F7" },
      line: { color: colors.red, pt: 1 },
    });
    s.addText(p[0], {
      x: 1.05,
      y: y + 0.2,
      w: 10.4,
      h: 0.42,
      fontFace: fonts.heading,
      fontSize: 22,
      bold: true,
      color: colors.red,
    });
    s.addText(p[1], {
      x: 1.05,
      y: y + 0.7,
      w: 10.4,
      h: 0.45,
      fontFace: fonts.body,
      fontSize: 15,
      color: colors.textMid,
    });
  });
  addFooter(s);
}

// Slide 9: Why now
{
  const s = pptx.addSlide();
  s.background = { color: colors.bgLight };
  s.addText("Why Leaders Act Now", {
    x: 0.6,
    y: 0.55,
    w: 10.8,
    h: 0.7,
    fontFace: fonts.heading,
    bold: true,
    fontSize: 36,
    color: colors.textDark,
  });
  s.addText("The question is not whether leadership support has a cost.", {
    x: 0.8,
    y: 1.55,
    w: 10.8,
    h: 0.6,
    fontFace: fonts.body,
    fontSize: 25,
    color: colors.textDark,
  });
  s.addText("The question is what misalignment is already costing the business.", {
    x: 0.8,
    y: 2.1,
    w: 10.8,
    h: 0.6,
    fontFace: fonts.body,
    bold: true,
    fontSize: 25,
    color: colors.primary,
  });
  const costs = [
    "Delayed strategic execution",
    "Recurring decision rework",
    "Avoidable leadership bottlenecks",
    "Lost team momentum",
  ];
  costs.forEach((c, i) => {
    const y = 3.0 + i * 0.7;
    s.addShape(pptx.ShapeType.ellipse, {
      x: 0.9,
      y: y + 0.18,
      w: 0.16,
      h: 0.16,
      fill: { color: colors.success },
      line: { color: colors.success, pt: 0 },
    });
    s.addText(c, {
      x: 1.2,
      y,
      w: 9.8,
      h: 0.5,
      fontFace: fonts.body,
      fontSize: 20,
      color: colors.textDark,
    });
  });
  addFooter(s);
}

// Slide 10: CTA
{
  const s = pptx.addSlide();
  s.background = { color: colors.bg };
  s.addText("If growth is exposing leadership gaps, now is the time to fix them.", {
    x: 0.9,
    y: 1.5,
    w: 10.2,
    h: 1.0,
    fontFace: fonts.heading,
    bold: true,
    fontSize: 42,
    color: colors.white,
    align: "center",
  });
  s.addText("Book a leadership strategy call to identify your bottleneck, align the team, and define the highest-leverage next move.", {
    x: 1.4,
    y: 3.0,
    w: 9.3,
    h: 0.9,
    fontFace: fonts.body,
    fontSize: 20,
    color: colors.white,
    align: "center",
  });
  s.addShape(pptx.ShapeType.roundRect, {
    x: 4.1,
    y: 4.35,
    w: 4.0,
    h: 0.8,
    radius: 0.1,
    fill: { color: colors.red },
    line: { color: colors.red, pt: 0 },
  });
  s.addText("Book a Leadership Strategy Call", {
    x: 4.1,
    y: 4.56,
    w: 4.0,
    h: 0.35,
    fontFace: fonts.body,
    bold: true,
    fontSize: 15,
    color: colors.white,
    align: "center",
  });
}

pptx.writeFile({ fileName: "artifacts/KLE-Who-We-Are-Deck.pptx" });
