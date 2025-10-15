export default function DescriptionSection({
  description,
}: {
  description: string;
}) {
  if (!description) return null;

  return (
    <section className="px-2 py-2">
      <div
        className="text-gray-700 flex flex-col gap-y-1 max-w-2xl "
        id="description"
      >
        <h3 className="h3">About this Venue</h3>
        <p className="w-full text-sm text-slate-700 py-2 text-justify">
          {description}
        </p>
      </div>
    </section>
  );
}
