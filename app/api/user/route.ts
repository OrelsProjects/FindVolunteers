import { doc, addDoc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";
import { usersCol } from "@/utils/firestore";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { User } from "@/lib/types";
import { decodeRequestBody } from "@/utils/api";

export async function GET(req: NextApiRequest): Promise<NextResponse | void> {
  try {
    const id = req.query.id as string;
    const user = await getDoc(doc(usersCol, id));

    return NextResponse.json(user, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: "Request failed" }, { status: 500 });
  }
}

export async function POST(req: NextApiRequest): Promise<NextResponse | void> {
  try {
    const user = await decodeRequestBody<User>(req);

    const userRef = await addDoc(usersCol, user);

    return NextResponse.json({ id: userRef.id }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: "Request failed" }, { status: 500 });
  }
}

export async function PUT(req: NextApiRequest): Promise<NextResponse | void> {
  try {
    const user = await decodeRequestBody<User>(req);

    const userRef = doc(usersCol, user.id);

    updateDoc(userRef, user.toDocument());

    return NextResponse.json({ id: userRef.id }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: "Request failed" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextApiRequest
): Promise<NextResponse | void> {
  try {
    const id = req.query.id as string;

    await deleteDoc(doc(usersCol, id));

    return NextResponse.json({ id }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: "Request failed" }, { status: 500 });
  }
}