import { ApiResponse, Volunteer } from "@/lib/types";
import { volunteersCol } from "@/utils/firestore";
import {
  doc,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  FirestoreDataConverter,
  getDoc,
} from "firebase/firestore";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

const converterVolunteer: FirestoreDataConverter<Volunteer | null> = {
  toFirestore: (volunteer: Volunteer) => Volunteer.toFirestore(volunteer),
  fromFirestore: (snap: DocumentSnapshot<DocumentData>): Volunteer | null =>
    Volunteer.fromFirestore(snap) || null,
};

export async function GET(
  req: NextRequest
): Promise<NextResponse<ApiResponse<string | null>>> {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const id = req.nextUrl.searchParams.get("id") || "";

    const volunteerDoc: DocumentReference<Volunteer | null> = doc(
      volunteersCol,
      id
    ).withConverter(converterVolunteer);

    const volunteer: DocumentSnapshot<Volunteer | null> = await getDoc(
      volunteerDoc
    );
    const volunteerData: Volunteer | null = volunteer.data() ?? null;
    return NextResponse.json(
      { result: volunteerData?.linkedinUrl },
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Request failed" }, { status: 500 });
  }
}
