import clsx from "clsx";

export function PricePin({
  emoji,
  price,
  selected,
  className,
}: {
  emoji: string;
  price: string;
  selected?: boolean;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "flex h-[30px] items-center gap-1.5 whitespace-nowrap rounded-[15px] pl-[3px] pr-2.5 shadow-[0_4px_12px_rgba(0,0,0,0.12)]",
        selected ? "scale-110 bg-green text-white" : "bg-white text-ink",
        className,
      )}
    >
      <span
        aria-hidden
        className={clsx(
          "block size-6 shrink-0 overflow-visible rounded-full text-center text-[14px] leading-6",
          selected ? "bg-white/25" : "bg-[#F3F4F6]",
        )}
      >
        {emoji}
      </span>
      <span className="text-[14px] font-extrabold leading-none">{price}</span>
    </div>
  );
}
