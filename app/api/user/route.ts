import { projectOwnersCol, usersCol, volunteersCol } from "@/utils/firestore";
import {
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse | void> {
  try {
    // get the email and find volunteer + project owner with this email
    const email = req.nextUrl.searchParams.get("email") || "";
    console.log("email", email);
    // Create queries for both collections
    const volunteersQuery = query(volunteersCol, where("email", "==", email));
    const projectOwnersQuery = query(
      projectOwnersCol,
      where("email", "==", email)
    );

    // Fetch data concurrently from both collections
    const [volunteersSnapshot, projectOwnersSnapshot] = await Promise.all([
      getDocs(volunteersQuery),
      getDocs(projectOwnersQuery),
    ]);

    // Extract data from snapshots
    const volunteersData = volunteersSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    const projectOwnersData = projectOwnersSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    // Combine data from both collections and return the response
    const responseData = {
      volunteer: volunteersData[0],
      projectOwner: projectOwnersData[0],
    };

    return NextResponse.json(responseData, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: "Request failed" }, { status: 500 });
  }
}

export async function POST(req: NextRequest): Promise<NextResponse | void> {
  try {
    const user = await req.json();
    const userRef = await addDoc(usersCol, user);

    return NextResponse.json({ id: userRef.id }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: "Request failed" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest): Promise<NextResponse | void> {
  try {
    const user = await req.json();
    const userRef = doc(usersCol, user.id);

    updateDoc(userRef, user.toDocument());

    return NextResponse.json({ id: userRef.id }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: "Request failed" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest): Promise<NextResponse | void> {
  try {
    const id = req.nextUrl.searchParams.get("id") || "";

    await deleteDoc(doc(usersCol, id));

    return NextResponse.json({ id }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: "Request failed" }, { status: 500 });
  }
}
