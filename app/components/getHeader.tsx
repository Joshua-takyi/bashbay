export default function GetHeader({
  title,
  venue_type,
}: {
  title: string;
  venue_type: string[];
}) {
  return (
    <section className="p-2 flex flex-col gap-y-2" id="overview">
      <div className="flex items-center gap-x-5">
        {venue_type.map((i) => (
          <span key={i} className="text-slate-400 small">
            {i}-
          </span>
        ))}
      </div>
      <h2 className="text-xl text-center sm:text-left font-medium ">{title}</h2>
    </section>
  );
}
