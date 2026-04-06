/**
 * Tests for index.html – Avertio™ Human-AI Integration System landing page.
 * Uses Jest with jsdom to parse and assert the HTML document structure,
 * content, SEO metadata, accessibility attributes, and CSS classes.
 */

const fs = require("fs");
const path = require("path");

// Load the HTML file once; each test gets a fresh parse via document.write.
const html = fs.readFileSync(
  path.resolve(__dirname, "../index.html"),
  "utf-8"
);

beforeEach(() => {
  document.open();
  document.write(html);
  document.close();
});

// ---------------------------------------------------------------------------
// Document head & metadata
// ---------------------------------------------------------------------------
describe("Document head and metadata", () => {
  test("html element has lang='en'", () => {
    expect(document.documentElement.lang).toBe("en");
  });

  test("page title is correct", () => {
    expect(document.title).toBe("Avertio™ | Human-AI Integration System");
  });

  test("charset meta tag is UTF-8", () => {
    const charset = document.querySelector("meta[charset]");
    expect(charset).not.toBeNull();
    expect(charset.getAttribute("charset").toUpperCase()).toBe("UTF-8");
  });

  test("viewport meta tag is present", () => {
    const viewport = document.querySelector('meta[name="viewport"]');
    expect(viewport).not.toBeNull();
    expect(viewport.getAttribute("content")).toContain("width=device-width");
  });

  test("meta description is present and non-empty", () => {
    const desc = document.querySelector('meta[name="description"]');
    expect(desc).not.toBeNull();
    expect(desc.getAttribute("content").trim().length).toBeGreaterThan(0);
  });

  test("meta description mentions key product terms", () => {
    const desc = document.querySelector('meta[name="description"]');
    const content = desc.getAttribute("content");
    expect(content).toMatch(/AI/);
    expect(content).toMatch(/10/);
  });
});

// ---------------------------------------------------------------------------
// Open Graph (OG) meta tags
// ---------------------------------------------------------------------------
describe("Open Graph meta tags", () => {
  test("og:title is present and correct", () => {
    const ogTitle = document.querySelector('meta[property="og:title"]');
    expect(ogTitle).not.toBeNull();
    expect(ogTitle.getAttribute("content")).toBe(
      "Avertio™ | Human-AI Integration System"
    );
  });

  test("og:description is present and non-empty", () => {
    const ogDesc = document.querySelector('meta[property="og:description"]');
    expect(ogDesc).not.toBeNull();
    expect(ogDesc.getAttribute("content").trim().length).toBeGreaterThan(0);
  });

  test("og:type is 'website'", () => {
    const ogType = document.querySelector('meta[property="og:type"]');
    expect(ogType).not.toBeNull();
    expect(ogType.getAttribute("content")).toBe("website");
  });
});

// ---------------------------------------------------------------------------
// Twitter Card meta tags
// ---------------------------------------------------------------------------
describe("Twitter Card meta tags", () => {
  test("twitter:card is present", () => {
    const twitterCard = document.querySelector('meta[name="twitter:card"]');
    expect(twitterCard).not.toBeNull();
    expect(twitterCard.getAttribute("content")).toBeTruthy();
  });

  test("twitter:title matches page title", () => {
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    expect(twitterTitle).not.toBeNull();
    expect(twitterTitle.getAttribute("content")).toBe(
      "Avertio™ | Human-AI Integration System"
    );
  });

  test("twitter:description is present and non-empty", () => {
    const twitterDesc = document.querySelector(
      'meta[name="twitter:description"]'
    );
    expect(twitterDesc).not.toBeNull();
    expect(twitterDesc.getAttribute("content").trim().length).toBeGreaterThan(
      0
    );
  });
});

// ---------------------------------------------------------------------------
// Semantic HTML5 structure
// ---------------------------------------------------------------------------
describe("Semantic HTML5 structure", () => {
  test("page has a <header> element", () => {
    expect(document.querySelector("header")).not.toBeNull();
  });

  test("page has a <main> element", () => {
    expect(document.querySelector("main")).not.toBeNull();
  });

  test("page has a <footer> element", () => {
    expect(document.querySelector("footer")).not.toBeNull();
  });

  test("<header>, <main>, and <footer> are direct children of <body>", () => {
    const body = document.body;
    const directChildren = Array.from(body.children).map((el) =>
      el.tagName.toLowerCase()
    );
    expect(directChildren).toContain("header");
    expect(directChildren).toContain("main");
    expect(directChildren).toContain("footer");
  });
});

// ---------------------------------------------------------------------------
// Header section
// ---------------------------------------------------------------------------
describe("Header section", () => {
  test("h1 contains brand name 'Avertio™'", () => {
    const h1 = document.querySelector("header h1");
    expect(h1).not.toBeNull();
    expect(h1.textContent).toContain("Avertio™");
  });

  test("header h2 contains 'Human-AI Integration System'", () => {
    const h2 = document.querySelector("header h2");
    expect(h2).not.toBeNull();
    expect(h2.textContent).toContain("Human-AI Integration System");
  });

  test("header introductory paragraph is present", () => {
    const p = document.querySelector("header p");
    expect(p).not.toBeNull();
    expect(p.textContent.trim().length).toBeGreaterThan(0);
  });

  test("'Start the System' CTA button links to #steps", () => {
    const link = Array.from(document.querySelectorAll("header a")).find((a) =>
      a.textContent.includes("Start the System")
    );
    expect(link).not.toBeNull();
    expect(link.getAttribute("href")).toBe("#steps");
  });

  test("'Start the System' CTA has btn-primary class", () => {
    const link = Array.from(document.querySelectorAll("header a")).find((a) =>
      a.textContent.includes("Start the System")
    );
    expect(link.classList.contains("btn-primary")).toBe(true);
  });

  test("'Book Strategy Call' button is present in header", () => {
    const link = Array.from(document.querySelectorAll("header a")).find((a) =>
      a.textContent.includes("Book Strategy Call")
    );
    expect(link).not.toBeNull();
  });

  test("'Book Strategy Call' button has btn-gold class", () => {
    const link = Array.from(document.querySelectorAll("header a")).find((a) =>
      a.textContent.includes("Book Strategy Call")
    );
    expect(link.classList.contains("btn-gold")).toBe(true);
  });

  test("'Book Strategy Call' button has an aria-label for accessibility", () => {
    const link = Array.from(document.querySelectorAll("header a")).find((a) =>
      a.textContent.includes("Book Strategy Call")
    );
    expect(link.getAttribute("aria-label")).toBeTruthy();
  });
});

// ---------------------------------------------------------------------------
// 10-Step System section
// ---------------------------------------------------------------------------
describe("10-Step System section", () => {
  test("steps section exists with id='steps'", () => {
    expect(document.getElementById("steps")).not.toBeNull();
  });

  test("steps section has heading 'The 10-Step System'", () => {
    const stepsSection = document.getElementById("steps");
    const h2 = stepsSection.querySelector("h2");
    expect(h2).not.toBeNull();
    expect(h2.textContent).toBe("The 10-Step System");
  });

  test("exactly 10 step cards are present", () => {
    const steps = document.querySelectorAll("#steps .card.step");
    expect(steps).toHaveLength(10);
  });

  test("all 10 step cards contain their step number", () => {
    const steps = document.querySelectorAll("#steps .card.step");
    steps.forEach((step, index) => {
      expect(step.textContent).toContain(`Step ${index + 1}:`);
    });
  });

  test("Step 1 is 'Define Your AI Identity'", () => {
    const steps = document.querySelectorAll("#steps .card.step");
    expect(steps[0].textContent).toContain("Define Your AI Identity");
  });

  test("Step 2 is 'Choose Your Business Model'", () => {
    const steps = document.querySelectorAll("#steps .card.step");
    expect(steps[1].textContent).toContain("Choose Your Business Model");
  });

  test("Step 3 is 'Select Your Niche'", () => {
    const steps = document.querySelectorAll("#steps .card.step");
    expect(steps[2].textContent).toContain("Select Your Niche");
  });

  test("Step 4 is 'Create Your Offer'", () => {
    const steps = document.querySelectorAll("#steps .card.step");
    expect(steps[3].textContent).toContain("Create Your Offer");
  });

  test("Step 5 is 'Build Client Attraction'", () => {
    const steps = document.querySelectorAll("#steps .card.step");
    expect(steps[4].textContent).toContain("Build Client Attraction");
  });

  test("Step 6 is 'Messaging & Sales'", () => {
    const steps = document.querySelectorAll("#steps .card.step");
    expect(steps[5].textContent).toContain("Messaging & Sales");
  });

  test("Step 7 is 'AI Stack Setup'", () => {
    const steps = document.querySelectorAll("#steps .card.step");
    expect(steps[6].textContent).toContain("AI Stack Setup");
  });

  test("Step 8 is 'First AI Solution'", () => {
    const steps = document.querySelectorAll("#steps .card.step");
    expect(steps[7].textContent).toContain("First AI Solution");
  });

  test("Step 9 is 'Systemize Delivery'", () => {
    const steps = document.querySelectorAll("#steps .card.step");
    expect(steps[8].textContent).toContain("Systemize Delivery");
  });

  test("Step 10 is 'Scale to Authority'", () => {
    const steps = document.querySelectorAll("#steps .card.step");
    expect(steps[9].textContent).toContain("Scale to Authority");
  });

  test("each step card label uses <strong> for bold number", () => {
    const steps = document.querySelectorAll("#steps .card.step");
    steps.forEach((step) => {
      expect(step.querySelector("strong")).not.toBeNull();
    });
  });
});

// ---------------------------------------------------------------------------
// Monetize Immediately section
// ---------------------------------------------------------------------------
describe("Monetize Immediately section", () => {
  test("'Monetize Immediately' heading is present", () => {
    const headings = Array.from(document.querySelectorAll("main h2"));
    const found = headings.some((h) =>
      h.textContent.includes("Monetize Immediately")
    );
    expect(found).toBe(true);
  });

  test("exactly 3 pricing cards are shown", () => {
    const headings = Array.from(document.querySelectorAll("main h2"));
    const monetizeSection = headings
      .find((h) => h.textContent.includes("Monetize Immediately"))
      ?.closest(".container");
    expect(monetizeSection).not.toBeNull();
    const cards = monetizeSection.querySelectorAll(".card");
    expect(cards).toHaveLength(3);
  });

  test("AI Strategy Session pricing card is present", () => {
    const cards = Array.from(document.querySelectorAll("main .card"));
    const found = cards.some((c) =>
      c.textContent.includes("AI Strategy Session")
    );
    expect(found).toBe(true);
  });

  test("AI Implementation pricing card is present", () => {
    const cards = Array.from(document.querySelectorAll("main .card"));
    const found = cards.some((c) =>
      c.textContent.includes("AI Implementation")
    );
    expect(found).toBe(true);
  });

  test("AI Workforce Training pricing card is present", () => {
    const cards = Array.from(document.querySelectorAll("main .card"));
    const found = cards.some((c) =>
      c.textContent.includes("AI Workforce Training")
    );
    expect(found).toBe(true);
  });

  test("AI Strategy Session shows a price range", () => {
    const cards = Array.from(document.querySelectorAll("main .card"));
    const card = cards.find((c) =>
      c.textContent.includes("AI Strategy Session")
    );
    expect(card.textContent).toMatch(/\$\d+/);
  });

  test("AI Implementation shows a price range", () => {
    const cards = Array.from(document.querySelectorAll("main .card"));
    const card = cards.find((c) =>
      c.textContent.includes("AI Implementation")
    );
    expect(card.textContent).toMatch(/\$\d+/);
  });

  test("AI Workforce Training shows a price indicator", () => {
    const cards = Array.from(document.querySelectorAll("main .card"));
    const card = cards.find((c) =>
      c.textContent.includes("AI Workforce Training")
    );
    expect(card.textContent).toMatch(/\$\d+/);
  });
});

// ---------------------------------------------------------------------------
// Closing call-to-action section
// ---------------------------------------------------------------------------
describe("Closing CTA section", () => {
  test("closing CTA heading is present", () => {
    const headings = Array.from(document.querySelectorAll("main h2"));
    const found = headings.some((h) =>
      h.textContent.includes("You don't need more information")
    );
    expect(found).toBe(true);
  });

  test("'Start Now' button links to #steps", () => {
    const links = Array.from(document.querySelectorAll("main a"));
    const startNow = links.find((a) => a.textContent.trim() === "Start Now");
    expect(startNow).not.toBeNull();
    expect(startNow.getAttribute("href")).toBe("#steps");
  });

  test("'Start Now' button has btn-primary class", () => {
    const links = Array.from(document.querySelectorAll("main a"));
    const startNow = links.find((a) => a.textContent.trim() === "Start Now");
    expect(startNow.classList.contains("btn-primary")).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Footer section
// ---------------------------------------------------------------------------
describe("Footer section", () => {
  test("footer has class 'footer'", () => {
    const footer = document.querySelector("footer");
    expect(footer.classList.contains("footer")).toBe(true);
  });

  test("footer contains company name 'Praos Group International'", () => {
    const footer = document.querySelector("footer");
    expect(footer.textContent).toContain("Praos Group International");
  });

  test("footer contains brand name 'Avertio™'", () => {
    const footer = document.querySelector("footer");
    expect(footer.textContent).toContain("Avertio™");
  });
});

// ---------------------------------------------------------------------------
// CSS class presence on key elements
// ---------------------------------------------------------------------------
describe("CSS classes on key elements", () => {
  test("all container divs have class 'container'", () => {
    const containers = document.querySelectorAll(".container");
    expect(containers.length).toBeGreaterThan(0);
  });

  test("all step elements have both 'card' and 'step' classes", () => {
    const steps = document.querySelectorAll(".card.step");
    expect(steps.length).toBe(10);
  });

  test("both btn-primary links have the 'btn' base class", () => {
    const btnPrimary = document.querySelectorAll(".btn-primary");
    btnPrimary.forEach((el) => {
      expect(el.classList.contains("btn")).toBe(true);
    });
  });

  test("btn-gold link has the 'btn' base class", () => {
    const btnGold = document.querySelectorAll(".btn-gold");
    btnGold.forEach((el) => {
      expect(el.classList.contains("btn")).toBe(true);
    });
  });
});

// ---------------------------------------------------------------------------
// Accessibility checks
// ---------------------------------------------------------------------------
describe("Accessibility", () => {
  test("all anchor tags have non-empty href attributes", () => {
    const anchors = document.querySelectorAll("a");
    anchors.forEach((a) => {
      const href = a.getAttribute("href");
      expect(href).not.toBeNull();
      expect(href.trim()).not.toBe("");
    });
  });

  test("interactive anchor elements have visible text or aria-label", () => {
    const anchors = document.querySelectorAll("a");
    anchors.forEach((a) => {
      const hasText = a.textContent.trim().length > 0;
      const hasAriaLabel =
        a.getAttribute("aria-label") &&
        a.getAttribute("aria-label").trim().length > 0;
      expect(hasText || hasAriaLabel).toBe(true);
    });
  });

  test("page contains exactly one <h1> element", () => {
    const h1s = document.querySelectorAll("h1");
    expect(h1s).toHaveLength(1);
  });

  test("headings follow a logical hierarchy (h1 before h2)", () => {
    const headings = Array.from(document.querySelectorAll("h1, h2"));
    expect(headings[0].tagName).toBe("H1");
  });
});

// ---------------------------------------------------------------------------
// Content integrity
// ---------------------------------------------------------------------------
describe("Content integrity", () => {
  test("'This is not another AI course' section heading is present", () => {
    const headings = Array.from(document.querySelectorAll("main h2"));
    const found = headings.some((h) =>
      h.textContent.includes("This is not another AI course")
    );
    expect(found).toBe(true);
  });

  test("transformation system description paragraph is present", () => {
    const paragraphs = Array.from(document.querySelectorAll("main p"));
    const found = paragraphs.some((p) =>
      p.textContent.includes("transformation system")
    );
    expect(found).toBe(true);
  });

  test("total number of .card elements in main is 13 (10 steps + 3 pricing)", () => {
    const STEP_CARD_COUNT = 10;
    const PRICING_CARD_COUNT = 3;
    const EXPECTED_CARD_COUNT = STEP_CARD_COUNT + PRICING_CARD_COUNT;
    const cards = document.querySelectorAll("main .card");
    expect(cards).toHaveLength(EXPECTED_CARD_COUNT);
  });

  test("page does not have any broken internal anchor links (missing target id)", () => {
    const internalLinks = Array.from(document.querySelectorAll("a[href^='#']"))
      .map((a) => a.getAttribute("href"))
      .filter((href) => href !== "#");

    internalLinks.forEach((href) => {
      const id = href.slice(1);
      expect(document.getElementById(id)).not.toBeNull();
    });
  });
});
