import { cp, mkdir, rm } from "node:fs/promises";

const projectRoot = new URL("../", import.meta.url);
const outputDirectory = new URL("../dist/", import.meta.url);
const sourceFiles = ["index.html", "styles.css", "assets"];

await import("./check.mjs");
await rm(outputDirectory, { force: true, recursive: true });
await mkdir(outputDirectory, { recursive: true });

for (const file of sourceFiles) {
  await cp(
    new URL(file, projectRoot),
    new URL(file, outputDirectory),
    { recursive: true },
  );
}

console.log("Static site built in dist/.");
