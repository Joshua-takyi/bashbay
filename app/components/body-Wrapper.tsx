export default function BodyWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`max-w-[70rem] mx-auto w-full ${className} p-2`}>
      {children}
    </div>
  );
}
