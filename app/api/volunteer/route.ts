import { Volunteer } from "@/lib/types";
import { volunteersCol } from "@/utils/firestore";
import { addDoc, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse | void> {
  try {
    const id = req.nextUrl.searchParams.get("id") || "";
    const volunteer = await getDoc(doc(volunteersCol, id));

    return NextResponse.json(volunteer, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: "Request failed" }, { status: 500 });
  }
}

export async function POST(req: NextRequest): Promise<NextResponse | void> {
  try {
    const volunteer = await req.json();
    const volunteerRef = await addDoc(volunteersCol, volunteer);

    return NextResponse.json({ id: volunteerRef.id }, { status: 200 });
  } catch (e) {
    console.log('error in add volunteer');
    console.log(e);
    return NextResponse.json({ error: "Request failed" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest): Promise<NextResponse | void> {
  try {
    const volunteer = await req.json();
    const volunteerRef = doc(volunteersCol, volunteer.id);

    updateDoc(volunteerRef, volunteer);

    return NextResponse.json({ id: volunteerRef.id }, { status: 200 });
  } catch (e) {
    console.log('error in update volunteer');
    console.log(e);
    return NextResponse.json({ error: JSON.stringify(e) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest): Promise<NextResponse | void> {
  try {
    const volunteer = await req.json();

    deleteDoc(doc(volunteersCol, volunteer.id));

    return NextResponse.json({}, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: "Request failed" }, { status: 500 });
  }
}
