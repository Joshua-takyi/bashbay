import VenueCategories from "../components/explore-categories";
import HeroSection from "../components/hero-section";
import { ListVenues } from "../components/list-venues";
import SignInMessage from "../components/signin-message";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      {/* <SignInMessage /> */}
      <VenueCategories />
      {/* <ListVenues /> */}
    </>
  );
}
