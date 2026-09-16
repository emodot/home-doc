export const formatNaira = (kobo) => `₦${((kobo || 0) / 100).toLocaleString("en-NG")}`;
