import clsx from "clsx";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={clsx("text-[24px] font-extrabold leading-none tracking-tight", className)}>
      Under<span className="text-green">10</span>
    </span>
  );
}
