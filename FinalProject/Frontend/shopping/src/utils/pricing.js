/**
 * Returns the final price after applying a membership discount percentage.
 * @param {number} basePrice - The original product price
 * @param {number} discountPercent - The membership discount (0-100)
 * @returns {number} Discounted price, rounded to 2 decimal places
 */
export function getMemberPrice(basePrice, discountPercent = 0) {
  return +(basePrice * (1 - discountPercent / 100)).toFixed(2);
}
