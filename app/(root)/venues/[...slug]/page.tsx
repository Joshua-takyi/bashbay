"use client";

import BodyWrapper from "@/app/components/body-Wrapper";
import { useParams } from "next/navigation";

export default function VenuesPage() {
  const params = useParams();
  return (
    <main>
      <BodyWrapper>
        <h1 className="small">Venues Page - {params.slug}</h1>
      </BodyWrapper>
    </main>
  );
}
