import {
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { volunteersCol } from "@/utils/firestore";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { Volunteer } from "@/lib/types";
import { decodeRequestBody } from "@/utils/api";

export async function GET(req: NextApiRequest): Promise<NextResponse | void> {
  try {
    const id = req.query.id as string;
    const volunteer = await getDoc(doc(volunteersCol, id));

    return NextResponse.json(volunteer, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: "Request failed" }, { status: 500 });
  }
}

export async function POST(req: NextApiRequest): Promise<NextResponse | void> {
  try {
    const volunteer = await decodeRequestBody<Volunteer>(req);

    const volunteerRef = await addDoc(
      volunteersCol,
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
      volunteersCol,
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

    deleteDoc(doc(volunteersCol, volunteer.id));

    return NextResponse.json({}, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: "Request failed" }, { status: 500 });
  }
}