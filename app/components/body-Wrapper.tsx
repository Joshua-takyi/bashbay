export default function BodyWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`max-w-[80rem] mx-auto ${className} p-2`}>{children}</div>
  );
}
