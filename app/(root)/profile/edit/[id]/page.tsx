import BodyWrapper from "@/app/components/body-Wrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Profile - Bashbay",
  description: "Edit your profile information on Bashbay.",
};
export default function EditProfilePage() {
  return (
    <main>
      <BodyWrapper>
        <h1 className="small">Edit Profile Page</h1>
      </BodyWrapper>
    </main>
  );
}
