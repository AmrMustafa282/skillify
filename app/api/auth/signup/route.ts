// app/api/signup/route.js
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { User } from "@/types";

// Secret key for JWT signing
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Mock users array (replace with real DB in production)
let users: User[] = [];

export async function POST(req: Request) {
 const { name, email, password, profilePicture } = await req.json();

 // Simple validation
 if (!name || !email || !password) {
  return NextResponse.json(
   { error: "Name, email, and password are required" },
   { status: 400 }
  );
 }

 // Check if the user already exists
 const existingUser = users.find((user) => user.email === email);
 if (existingUser) {
  return NextResponse.json({ error: "User already exists" }, { status: 400 });
 }

 // Create a new user object
 const newUser = {
  id: Date.now().toString(),
  name,
  email,
  profilePicture: profilePicture || null, // Optional profile picture
 };

 // Store the user
 users.push(newUser);

 // Generate JWT token with user data
 const token = jwt.sign(
  { userId: newUser.id, name: newUser.name, email: newUser.email },
  JWT_SECRET,
  { expiresIn: "1h" }
 );

 // Send back the response with the token and user data
 return NextResponse.json(
  { message: "User created", token, user: newUser },
  { status: 201 }
 );
}
