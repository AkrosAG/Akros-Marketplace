#!/usr/bin/env node
const { readFile } = require("fs").promises;
const concat = require("concat");
(async function build() {
  try {
    const assetManifestPath = "./build/asset-manifest.json";
    const { entrypoints } = JSON.parse(
      await readFile(assetManifestPath, "utf8")
    );
    const filePaths = entrypoints
      .filter((path) => /\.js$/.test(path))
      .map((path) => `./build/${path}`);
    const outFile = "../../src/assets/scripts/webcomponents/react-brownbag-webcomponent.js";
    await concat(filePaths, outFile);
    console.log(
      `Concatenated the following files into ${outFile}\n\n${filePaths.join("\n")}`
    );
  } catch (error) {
    console.error(error);
  }
})();
