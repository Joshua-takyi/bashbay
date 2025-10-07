import BodyWrapper from "@/app/components/body-Wrapper";
import ProfileSidebar from "./profile-sidebar";
import ProfileTabs from "@/app/components/profile-tabs";
import { Session } from "@/hooks/session";

export default async function Profile() {
  const session = await Session();
  const { role } = session || {};
  return (
    <section>
      <BodyWrapper className="flex  gap-7">
        <div className="w-2/7 border-r-1 border-default-200 pr-5 hidden lg:block">
          <ProfileSidebar />
        </div>
        {role === "host" ? (
          <main className="flex-1 space-y-10">
            <ProfileTabs
              tabA="Venues"
              tabB="Reviews"
              headerType="hosted_by"
              content={<div>Your venues content goes here</div>}
              isEmpty={true}
            />

            <ProfileTabs
              tabA="Events"
              tabB="Bookings"
              headerType="user_events"
              content={<div>Your events content goes here</div>}
              isEmpty={true}
            />

            <ProfileTabs
              tabA="Venues"
              tabB="Analytics"
              headerType="user_venues"
              content={<div>Your venues analytics goes here</div>}
              isEmpty={true}
            />
          </main>
        ) : (
          <main className="flex-1 space-y-10">
            <ProfileTabs
              tabA="Bookings"
              tabB="Reviews"
              headerType="user_events"
              content={<div>Your bookings content goes here</div>}
              isEmpty={true}
            />
          </main>
        )}
      </BodyWrapper>
    </section>
  );
}
