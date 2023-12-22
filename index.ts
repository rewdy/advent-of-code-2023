import pkg from "./package.json";

console.log("Hello via Bun!");

console.log("Try running one of these commands:", Object.keys(pkg.scripts));
