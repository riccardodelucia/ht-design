/**
 * Reads CSS custom properties from the computed styles and exports them as JS objects
 */

// Get computed styles from document root
function getCSSVariable(name) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}

// Export function to get specific variable
export function getHTVariable(name) {
  return getCSSVariable(`--${name}`);
}

// Export function to get chart colors for current theme (reads active theme variables)
export function getHTChartColors(type = "full") {
  const colors = {};

  if (type === "simple") {
    colors.blue = getHTVariable("ht-chart-simple-blue");
    colors.red = getHTVariable("ht-chart-simple-red");
    colors.grey = getHTVariable("ht-chart-simple-grey");
  } else {
    colors.orange1 = getHTVariable("ht-chart-orange-1");
    colors.blue1 = getHTVariable("ht-chart-blue-1");
    colors.green1 = getHTVariable("ht-chart-green-1");
    colors.yellow1 = getHTVariable("ht-chart-yellow-1");
    colors.blue2 = getHTVariable("ht-chart-blue-2");
    colors.orange2 = getHTVariable("ht-chart-orange-2");
    colors.purple1 = getHTVariable("ht-chart-purple-1");
    colors.contrast = getHTVariable("ht-chart-contrast");
  }

  return colors;
}

// Export function to get surface and text colors for current theme
export function getHTThemeColors() {
  const theme = {};

  // Surface colors
  theme.surface1 = getHTVariable("ht-surface-1");
  theme.surface2 = getHTVariable("ht-surface-2");
  theme.surface3 = getHTVariable("ht-surface-3");
  theme.surface4 = getHTVariable("ht-surface-4");

  // Text colors
  theme.textColor1 = getHTVariable("ht-text-color-1");
  theme.textColor2 = getHTVariable("ht-text-color-2");

  return theme;
}

// Export all HT variables as a single object
export function getAllHTVariables() {
  const allVars = {};
  const allStyles = getComputedStyle(document.documentElement);
  const cssVars = Array.from(allStyles).filter((prop) =>
    prop.startsWith("--ht-")
  );

  cssVars.forEach((varName) => {
    const cleanName = varName.replace("--", "");
    allVars[cleanName] = getHTVariable(cleanName);
    ß;
  });

  return allVars;
}
