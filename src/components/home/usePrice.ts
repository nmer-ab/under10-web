import { useLocale } from "next-intl";
import { formatNumber, formatPrice } from "@/lib/format";

export function useNumber() {
  const locale = useLocale();
  return (value: number, options?: Intl.NumberFormatOptions) => formatNumber(locale, value, options);
}

export function usePrice() {
  const locale = useLocale();
  return (value: number, options?: { cents?: boolean }) => formatPrice(locale, value, options);
}
