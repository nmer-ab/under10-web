// Always group digits so French shows "1 248" (CLDR's default "auto" grouping varies by locale).
export function numberFormat(locale: string, options?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat(locale, { useGrouping: "always", ...options });
}

export function formatNumber(locale: string, value: number, options?: Intl.NumberFormatOptions) {
  return numberFormat(locale, options).format(value);
}

export function formatPrice(
  locale: string,
  value: number,
  { cents = !Number.isInteger(value) } = {},
) {
  return formatNumber(locale, value, {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: cents ? 2 : 0,
  });
}
