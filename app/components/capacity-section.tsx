export default function CapacitySection({
  capacity,
  standing_capacity,
  seating_capacity,
}: {
  capacity: number;
  standing_capacity?: number;
  seating_capacity?: number;
}) {
  return (
    <section className="px-2 py-2 mt-5 ">
      <div>
        <h2 className="md:text-2xl text-xl font-semibold mb-4">Capacity</h2>
      </div>
      {/* <div className="flex gap-6 py-2 items-center">
        <div className="w-3/8 flex ">
          <p className="small font-medium">Capacity</p>
        </div>
        <div className="w-5/8">
          <p className="small leading-relaxed font-medium">{capacity}</p>
        </div>
      </div> */}
      <div className="flex gap-6 py-2 items-center">
        <div className="w-3/8 flex ">
          <p className="small font-medium">Standing Capacity</p>
        </div>
        <div className="w-5/8">
          <p className="small leading-relaxed ">{standing_capacity} people</p>
        </div>
      </div>
      <div className="flex gap-6 py-2 items-center">
        <div className="w-3/8 flex ">
          <p className="small font-medium">Seating Capacity</p>
        </div>
        <div className="w-5/8">
          <p className="small leading-relaxed ">{seating_capacity} people</p>
        </div>
      </div>
    </section>
  );
}
