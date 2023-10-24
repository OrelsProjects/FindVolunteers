import { usersCol } from "@/utils/firestore";
import { addDoc, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse | void> {
  try {
    const id = req.nextUrl.searchParams.get('id') || '';
    const user = await getDoc(doc(usersCol, id));

    return NextResponse.json(user, { status: 200 });
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

export async function DELETE(
  req: NextRequest
): Promise<NextResponse | void> {
  try {
    const id = req.nextUrl.searchParams.get('id') || '';

    await deleteDoc(doc(usersCol, id));

    return NextResponse.json({ id }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: "Request failed" }, { status: 500 });
  }
}