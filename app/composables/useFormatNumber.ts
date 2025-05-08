/**
 * Composable for formatting numbers with suffixes (k, M, B, etc.)
 * Example: 1000 -> 1k, 1500 -> 1.5k, 1000000 -> 1M
 */
export function useFormatNumber() {
  /**
   * Format a number with a suffix (k, M, B, etc.)
   * @param value - The number to format
   * @param decimals - The number of decimal places to show (default: 1)
   * @returns Formatted string with appropriate suffix
   */
  const format = (value: number, decimals: number = 1): string => {
    if (!value) return "0";

    if (value < 1000) {
      return value.toString();
    }

    const suffixes = ["", "k", "M", "B", "T"];
    const suffixIndex = Math.floor(Math.log10(value) / 3);

    // Ensure we don't exceed available suffixes
    const safeIndex = Math.min(suffixIndex, suffixes.length - 1);

    // Calculate the scaled value (e.g., 1500 / 1000 = 1.5 for "k")
    const scaledValue = value / Math.pow(1000, safeIndex);

    // Format with the specified number of decimals, but remove trailing zeros
    const formatted = scaledValue.toFixed(decimals).replace(/\.0+$|(\.\d*[1-9])0+$/, "$1");

    return `${formatted}${suffixes[safeIndex]}`;
  };

  return {
    format,
  };
}
