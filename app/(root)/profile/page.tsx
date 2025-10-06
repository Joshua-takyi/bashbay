import BodyWrapper from "@/app/components/body-Wrapper";
import ProfileSidebar from "./profile-sidebar";

export default function Profile() {
  return (
    <section>
      <BodyWrapper className="flex  gap-2">
        <div className="w-2/7">
          <ProfileSidebar />
        </div>
        <main className="flex-1">
          <h1 className="small">Profile Main Content</h1>
        </main>
      </BodyWrapper>
    </section>
  );
}
