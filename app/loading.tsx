"use client";

import { Spinner } from "@heroui/react";

export default function Loader() {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
      <Spinner color="primary" size="lg" variant="gradient" />
    </div>
  );
}
