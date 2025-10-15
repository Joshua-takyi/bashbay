import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  console.log("🔵 Middleware running for:", req.nextUrl.pathname);

  let response = NextResponse.next({
    request: {
      headers: req.headers,
    },
  });

  console.log("🔵 Getting token from cookies...");
  console.log(
    "🔵 All cookies:",
    req.cookies.getAll().map((c) => c.name)
  );

  // Get the access token directly from your backend's cookies
  const accessToken = req.cookies.get("access_token")?.value;

  if (!accessToken) {
    console.log("🔴 No access token found in cookies");
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  console.log("� Access token found");

  try {
    const apiUrl =
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_PROD_URL
        : process.env.NEXT_PUBLIC_DEV_URL || "http://localhost:8080/api/v1";

    console.log("Fetching profile from:", `${apiUrl}/profile`);

    const profileResponse = await fetch(`${apiUrl}/profile`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Cookie: `access_token=${accessToken}`,
      },
    });

    console.log("Profile response status:", profileResponse.status);

    if (!profileResponse.ok) {
      console.log("Profile fetch failed");
      const errorText = await profileResponse.text();
      console.log("Error response:", errorText);
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }

    const profileData = await profileResponse.json();
    console.log("Profile data:", JSON.stringify(profileData, null, 2));

    const userRole = profileData.role;
    console.log("User role:", userRole, "Type:", typeof userRole);

    if (userRole !== "host" && userRole !== "admin") {
      console.log("User role not authorized:", userRole);
      return NextResponse.redirect(new URL("/", req.url));
    }

    console.log("User authorized, proceeding");
    return response;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
