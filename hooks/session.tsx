import { cookies } from "next/headers";
type SessionResponse = {
  auth_role?: string;
  email?: string;
  is_admin?: boolean;
  role?: string;
  avatar_url?: string;
  created_at?: string;
  status?: string;
  user_id?: string;
  username?: string;
};
const apiurl =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_PROD_URL
    : process.env.NEXT_PUBLIC_DEV_URL || "http://localhost:8080/api/v1";

export async function Session(): Promise<SessionResponse | null> {
  if (!apiurl) {
    console.error("API URL is not defined");
    return null;
  }

  const cookieStore = await cookies();

  // Get individual cookies instead of toString() which might not work reliably in production
  const authToken = cookieStore.get("access_token")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value;

  // If no auth token, user is not logged in
  if (!authToken) {
    return null;
  }

  // Build cookie string manually for more reliable cross-environment behavior
  const cookieString = [
    authToken ? `access_token=${authToken}` : null,
    refreshToken ? `refresh_token=${refreshToken}` : null,
  ]
    .filter(Boolean)
    .join("; ");

  try {
    const response = await fetch(`${apiurl}/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Always include cookies if we have them
        ...(cookieString ? { Cookie: cookieString } : {}),
      },
      cache: "no-store",
      credentials: "include",
    });

    if (!response.ok) {
      // Don't log errors for 401 (unauthorized) as this is expected for non-logged-in users
      if (response.status !== 401) {
        console.error(`Session check failed with status: ${response.status}`);
      }
      return null;
    }

    const data = (await response.json()) as SessionResponse;
    return {
      user_id: data.user_id,
      email: data.email,
      role: data.role,
      username: data.username,
      is_admin: data.is_admin,
      auth_role: data.auth_role,
      status: data.status,
    };
  } catch (error) {
    console.error("Error fetching user session:", error);
    return null;
  }
}
