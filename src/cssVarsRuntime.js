/**
 * Reads CSS custom properties from the computed styles and exports them as JS objects
 */

// Get computed styles from document root
function getCSSVariable(name) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}

// Extract all HT Design variables
function extractHTVariables() {
  const chartPaletteLight = {};
  const chartPaletteDark = {};
  const chartSimplePaletteLight = {};
  const chartSimplePaletteDark = {};
  const themeLight = {};
  const themeDark = {};
  const typography = {};

  // Get all CSS variables from the document
  const allStyles = getComputedStyle(document.documentElement);

  // Convert CSSStyleDeclaration to array of property names
  const cssVars = Array.from(allStyles).filter((prop) =>
    prop.startsWith("--ht-")
  );

  cssVars.forEach((varName) => {
    const value = getCSSVariable(varName);
    const cleanName = varName.replace("--", "");

    // Chart palettes
    if (
      varName.includes("ht-chart-") &&
      !varName.includes("simple") &&
      varName.endsWith("-light")
    ) {
      const key = cleanName.replace("ht-chart-", "").replace("-light", "");
      chartPaletteLight[key] = value;
    }
    if (
      varName.includes("ht-chart-") &&
      !varName.includes("simple") &&
      varName.endsWith("-dark")
    ) {
      const key = cleanName.replace("ht-chart-", "").replace("-dark", "");
      chartPaletteDark[key] = value;
    }

    // Simple chart palettes
    if (varName.includes("ht-chart-simple-") && varName.endsWith("-light")) {
      const key = cleanName
        .replace("ht-chart-simple-", "")
        .replace("-light", "");
      chartSimplePaletteLight[key] = value;
    }
    if (varName.includes("ht-chart-simple-") && varName.endsWith("-dark")) {
      const key = cleanName
        .replace("ht-chart-simple-", "")
        .replace("-dark", "");
      chartSimplePaletteDark[key] = value;
    }

    // Typography variables
    if (varName.includes("ht-font-") || varName.includes("ht-line-height-")) {
      typography[cleanName] = value;
    }

    // Theme variables
    if (varName.endsWith("-light")) {
      themeLight[cleanName] = value;
    }
    if (varName.endsWith("-dark")) {
      themeDark[cleanName] = value;
    }
  });

  return {
    chartPaletteLight,
    chartPaletteDark,
    chartSimplePaletteLight,
    chartSimplePaletteDark,
    themeLight,
    themeDark,
    typography,
  };
}

// Export function to get current theme variables
export function getHTThemeVariables() {
  return extractHTVariables();
}

// Export function to get specific variable
export function getHTVariable(name) {
  return getCSSVariable(`--${name}`);
}

// Export function to get chart colors for current theme
export function getHTChartColors(type = "full") {
  const vars = extractHTVariables();

  // Detect current theme (you might need to adjust this logic)
  const isDark =
    document.documentElement.classList.contains("ht-darkmode") ||
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (type === "simple") {
    return isDark ? vars.chartSimplePaletteDark : vars.chartSimplePaletteLight;
  }
  return isDark ? vars.chartPaletteDark : vars.chartPaletteLight;
}

// Export all variables as a single object
export function getAllHTVariables() {
  const allVars = {};
  const allStyles = getComputedStyle(document.documentElement);
  const cssVars = Array.from(allStyles).filter((prop) =>
    prop.startsWith("--ht-")
  );

  cssVars.forEach((varName) => {
    const cleanName = varName.replace("--", "");
    allVars[cleanName] = getCSSVariable(varName);
  });

  return allVars;
}
