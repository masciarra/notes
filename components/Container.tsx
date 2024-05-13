import clsx from "clsx";

export default function Container({
  children,
  className,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={clsx("bg-white rounded-xl", className)}>{children}</div>
  );
}
