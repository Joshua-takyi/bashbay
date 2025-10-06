import BodyWrapper from "@/app/components/body-Wrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "events - Bashbay",
  description: "Discover and book the best events and venues near you.",
};
export default function EventsPage() {
  return (
    <main>
      <BodyWrapper>
        <h1 className="small">Events Page</h1>
      </BodyWrapper>
    </main>
  );
}
