/**
 * Utility to format real estate prices in Indian numbering format
 * e.g., ₹15,000/mo, ₹45 Lakh, ₹1.5 Cr
 */
export function formatPrice(price: number | string | undefined | null, selection?: string): string {
    if (price === undefined || price === null) return "₹ --";
    const num = typeof price === "string" ? parseFloat(price) : price;
    if (isNaN(num)) return "₹ --";

    const isRent = selection?.toLowerCase() === "rent";
    const suffix = isRent ? "/mo" : "";

    if (num >= 10000000) {
        const cr = (num / 10000000).toFixed(2).replace(/\.00$/, "").replace(/(\.[1-9])0$/, "$1");
        return `₹${cr} Cr${suffix}`;
    }
    if (num >= 100000) {
        const lakh = (num / 100000).toFixed(2).replace(/\.00$/, "").replace(/(\.[1-9])0$/, "$1");
        return `₹${lakh} Lakh${suffix}`;
    }

    return `₹${new Intl.NumberFormat("en-IN").format(num)}${suffix}`;
}
