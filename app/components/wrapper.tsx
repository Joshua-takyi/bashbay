export default function Wrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main className="">
      <div className={`${className} w-full mx-auto px-2 `}>{children}</div>
    </main>
  );
}
