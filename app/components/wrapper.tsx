export default function Wrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main className="">
      <div
        className={`${className} max-w-[112rem] w-full mx-auto px-4 sm:px-6`}
      >
        {children}
      </div>
    </main>
  );
}
