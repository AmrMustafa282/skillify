export async function authenticateGoogle(token: string) {
 const res = await fetch(`${process.env.BACKEND_URL}/api/auth/google`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ token }),
 });

 if (!res.ok) {
  throw new Error("Google authentication failed");
 }

 return res.json();
}
