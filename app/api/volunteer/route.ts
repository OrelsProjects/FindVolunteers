import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "@/firebase";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { VOLUNTEER_COLLECTION, Volunteer } from "@/lib/types";
import { decodeRequestBody } from "@/utils/api";

export async function GET(req: NextApiRequest): Promise<NextResponse | void> {
  try {
    const id = req.query.id as string;
    const col = collection(db, VOLUNTEER_COLLECTION);
    const volunteer = await getDoc(doc(col, id));

    return NextResponse.json(volunteer, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: "Request failed" }, { status: 500 });
  }
}

export async function POST(req: NextApiRequest): Promise<NextResponse | void> {
  try {
    const volunteer = await decodeRequestBody<Volunteer>(req);

    const volunteerRef = await addDoc(
      collection(db, VOLUNTEER_COLLECTION),
      volunteer
    );

    return NextResponse.json({ id: volunteerRef.id }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: "Request failed" }, { status: 500 });
  }
}

export async function PUT(req: NextApiRequest): Promise<NextResponse | void> {
  try {
    const volunteer = await decodeRequestBody<Volunteer>(req);

    const volunteerRef = doc(
      collection(db, VOLUNTEER_COLLECTION),
      volunteer.id
    );

    updateDoc(volunteerRef, volunteer.toDocument());

    return NextResponse.json({ id: volunteerRef.id }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: "Request failed" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextApiRequest
): Promise<NextResponse | void> {
  try {
    const volunteer = await decodeRequestBody<Volunteer>(req);

    deleteDoc(doc(collection(db, VOLUNTEER_COLLECTION), volunteer.id));

    return NextResponse.json({}, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: "Request failed" }, { status: 500 });
  }
}
