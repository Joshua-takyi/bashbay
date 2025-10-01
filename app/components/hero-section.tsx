import InputDropDown from "./input-dropdown";
import Wrapper from "./wrapper";

export default function HeroSection() {
  return (
    <section>
      <Wrapper className="h-[50dvh] flex flex-col justify-center p-3 *:lg:p-3">
        <div className="flex flex-col gap-y-5">
          <h1 className="h1 ">The Marketplace for Venues & Events</h1>
          <p className="small">
            List your space, host your event, or find your next experience—all
            in one place.
          </p>
        </div>
        <div>
          <InputDropDown />
        </div>
      </Wrapper>
    </section>
  );
}
