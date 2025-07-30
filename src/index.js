/**
 * Reads CSS custom properties from the computed styles and exports them as JS objects
 */

// Get computed styles from document root
export function getCSSProperty(name) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}

// Export function to get chart colors for current theme (reads active theme variables)
export function getCSSHTChartColors(type = "full") {
  const colors = {};

  if (type === "simple") {
    colors.blue = getCSSProperty("--ht-chart-simple-blue");
    colors.red = getCSSProperty("--ht-chart-simple-red");
    colors.grey = getCSSProperty("--ht-chart-simple-grey");
  } else {
    colors.orange1 = getCSSProperty("--ht-chart-orange-1");
    colors.blue1 = getCSSProperty("--ht-chart-blue-1");
    colors.green1 = getCSSProperty("--ht-chart-green-1");
    colors.yellow1 = getCSSProperty("--ht-chart-yellow-1");
    colors.blue2 = getCSSProperty("--ht-chart-blue-2");
    colors.orange2 = getCSSProperty("--ht-chart-orange-2");
    colors.purple1 = getCSSProperty("--ht-chart-purple-1");
    colors.contrast = getCSSProperty("--ht-chart-contrast");
  }

  return colors;
}

// Export function to get surface and text colors for current theme
export function getCSSHTThemeColors() {
  const theme = {};

  // Surface colors
  theme.surface1 = getCSSProperty("--ht-surface-1");
  theme.surface2 = getCSSProperty("--ht-surface-2");
  theme.surface3 = getCSSProperty("--ht-surface-3");
  theme.surface4 = getCSSProperty("--ht-surface-4");

  // Text colors
  theme.textColor1 = getCSSProperty("--ht-text-color-1");
  theme.textColor2 = getCSSProperty("--ht-text-color-2");

  return theme;
}

// Export all HT custom properties as a single object
export function getCSSHTAllCustomProperties() {
  const allProps = {};
  const allStyles = getComputedStyle(document.documentElement);
  const cssProps = Array.from(allStyles).filter((prop) =>
    prop.startsWith("--ht-")
  );

  cssProps.forEach((propName) => {
    const cleanName = propName.replace("--", "");
    allProps[cleanName] = getCSSProperty(propName);
  });

  return allProps;
}
