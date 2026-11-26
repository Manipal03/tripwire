function scoreRules(candidates) {
  return { score: 0, hits: [] };
}

globalThis.scoreRules = scoreRules;

if (typeof module !== "undefined" && module.exports) {
  module.exports = { scoreRules };
}
