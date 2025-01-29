// app/api/login/route.js
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Secret key for JWT signing
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Mock users array (replace with real DB in production)
let users = [
 {
  id: "1",
  name: "Test User",
  email: "amr@me.com",
  password: "123123",
  profilePicture: null,
 },
]; // Sample user for testing

export async function POST(req: Request) {
 const { email, password } = await req.json();

 // Simple validation
 if (!email || !password) {
  return NextResponse.json(
   { error: "Email and password are required" },
   { status: 400 }
  );
 }

 // Find the user and check password
 const user = users.find((user) => user.email === email);

 if (!user || user.password !== password) {
  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
 }

 // Generate JWT token with user data
 const token = jwt.sign(
  { userId: user.id, name: user.name, email: user.email },
  JWT_SECRET,
  { expiresIn: "1h" }
 );

 // Send back the response with the token and user data
 return NextResponse.json(
  { message: "Login successful", token, user },
  { status: 200 }
 );
}
