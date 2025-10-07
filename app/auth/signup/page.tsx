import ClientSessionGuard from "@/app/components/clientSessionGuard";
import SignUpForm from "@/app/components/signup-form";
import { Session } from "@/hooks/session";
import { redirect } from "next/navigation";

export default async function SignUpPage() {
  const data = await Session();
  if (data) {
    redirect("/");
  }
  return (
    <ClientSessionGuard>
      <SignUpForm />
    </ClientSessionGuard>
  );
}
