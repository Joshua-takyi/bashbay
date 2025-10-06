import { div } from "framer-motion/client";
import BodyWrapper from "./body-Wrapper";

export default function SignInMessage() {
  return (
    <section>
      <BodyWrapper>
        <h2 className="h2">Welcome Back!</h2>
        <p className="text-color max-w-md">
          To access your account and explore our features, please sign in with
          your credentials.
        </p>
      </BodyWrapper>
    </section>
  );
}
