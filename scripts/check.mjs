import { readFile } from "node:fs/promises";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
const css = await readFile(new URL("../styles.css", import.meta.url), "utf8");

const requiredContent = [
  "<html lang=\"en\">",
  "name=\"viewport\"",
  "<main",
  "<h1",
  "Steven Dang",
  "Software Engineer",
  "data-placeholder=\"bio\"",
  "src=\"assets/steven-dang-picture.jpg\"",
  "alt=\"Steven Dang overlooking a mountain landscape\"",
  "steven.phihung.dang@gmail.com",
  "https://www.linkedin.com/in/stevenpdang",
  "https://github.com/stevenpdang",
  "rel=\"stylesheet\"",
];

const missingContent = requiredContent.filter((item) => !html.includes(item));

if (missingContent.length > 0) {
  throw new Error(`Missing required page content: ${missingContent.join(", ")}`);
}

if (!html.includes("class=\"site-panel\"") || !css.includes("width: 66.667vw")) {
  throw new Error("The centered website must use the approved two-thirds viewport layout.");
}

if (
  !css.includes("--paper: #f7f9f8")
  || !css.includes("--surround: #e8f1f6")
  || !css.includes("--accent: #5fa9dd")
) {
  throw new Error("The site must use the approved low-glare palette.");
}

if (
  !css.includes("@media (min-width: 48rem)")
  || !css.includes("gap: clamp(2rem, 6.25vw, 6rem)")
) {
  throw new Error("The portrait must sit beside the name at standard screen widths.");
}

if (
  !css.includes("border-radius: 50%")
  || !css.includes("calc(var(--name-size) * 1.5)")
) {
  throw new Error("The portrait must be circular and proportional to the name.");
}

const prohibitedContent = [
  ["remote assets", /(?:src|<link[^>]+href)="https?:\/\//],
  ["client-side scripts", /<script(?:\s|>)/],
];

for (const [label, pattern] of prohibitedContent) {
  if (pattern.test(html)) {
    throw new Error(`Found prohibited ${label}.`);
  }
}

console.log("Site smoke check passed.");
