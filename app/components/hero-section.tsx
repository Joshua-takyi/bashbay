"use client";

import BodyWrapper from "./body-Wrapper";
import InputDropDown from "./input-dropdown";

export default function HeroSection() {
  return (
    <section className="relative justify-center text-center text-white bg-[url('/images/heroImage.jpg')] bg-cover bg-center">
      <div className="absolute bg-black/40 top-0 left-0 w-full h-full overflow-hidden" />
      <BodyWrapper className="h-[35dvh] flex flex-col justify-center p-3 *:lg:p-3 relative z-10">
        <div className="flex flex-col gap-y-5">
          <h1 className="h1 font-bold">The Marketplace for Venues & Events</h1>
          <p className="small lato-font">
            List your space, host your event, or find your next experience—all
            in one place.
          </p>
        </div>
        <div>
          <InputDropDown />
        </div>
      </BodyWrapper>
    </section>
  );
}
