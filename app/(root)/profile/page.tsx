import BodyWrapper from "@/app/components/body-Wrapper";
import ProfileSidebar from "./profile-sidebar";
import ProfileTabs from "@/app/components/profile-tabs";
import { Session } from "@/hooks/session";
import Wrapper from "@/app/components/wrapper";
import { Suspense } from "react";
import Loader from "@/app/loading";

export default async function Profile() {
  const session = await Session();
  const { role, user_id } = session || {};

  if (!session || !user_id) {
    return <Loader />;
  }

  return (
    <section>
      <Wrapper className="flex  gap-7  max-w-[110rem]">
        <div className="w-1/5 border-r-1 border-default-200 hidden lg:block">
          <Suspense fallback={<Loader />}>
            <ProfileSidebar userId={user_id} />
          </Suspense>
        </div>
        {role === "host" ? (
          <main className="flex-1 space-y-10">
            <Suspense
              fallback={
                <div className="h-64 flex items-center justify-center">
                  <Loader />
                </div>
              }
            >
              <ProfileTabs
                tabA="Venues"
                tabB="Reviews"
                headerType="hosted_by"
                content={<div>Your venues content goes here</div>}
                isEmpty={true}
              />
            </Suspense>

            <Suspense
              fallback={
                <div className="h-64 flex items-center justify-center">
                  <Loader />
                </div>
              }
            >
              <ProfileTabs
                tabA="Events"
                tabB="Bookings"
                headerType="user_events"
                content={<div>Your events content goes here</div>}
                isEmpty={true}
              />
            </Suspense>

            <Suspense
              fallback={
                <div className="h-64 flex items-center justify-center">
                  <Loader />
                </div>
              }
            >
              <ProfileTabs
                tabA="Venues"
                tabB="Analytics"
                headerType="user_venues"
                content={<div>Your venues analytics goes here</div>}
                isEmpty={true}
              />
            </Suspense>
          </main>
        ) : (
          <main className="flex-1 space-y-10">
            <Suspense
              fallback={
                <div className="h-64 flex items-center justify-center">
                  <Loader />
                </div>
              }
            >
              <ProfileTabs
                tabA="Bookings"
                tabB="Reviews"
                headerType="user_events"
                content={<div>Your bookings content goes here</div>}
                isEmpty={true}
              />
            </Suspense>
          </main>
        )}
      </Wrapper>
    </section>
  );
}
