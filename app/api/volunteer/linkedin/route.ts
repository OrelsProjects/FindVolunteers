import { ApiResponse, Volunteer, Volunteers } from "@/lib/types";
import { volunteersCol } from "@/utils/firestore";
import {
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  orderBy,
  query,
  updateDoc,
  limit,
  getDocs,
  DocumentData,
  DocumentSnapshot,
  FirestoreDataConverter,
  DocumentReference,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

const converterVolunteer: FirestoreDataConverter<Volunteer | null> = {
  toFirestore: (volunteer: Volunteer) => Volunteer.toFirestore(volunteer),
  fromFirestore: (snap: DocumentSnapshot<DocumentData>): Volunteer | null =>
    Volunteer.fromFirestore(snap) || null,
};

export async function GET(
  req: NextRequest
): Promise<NextResponse<ApiResponse<string | null>>> {
  try {
    const id = req.nextUrl.searchParams.get("id") || "";
    // Many volunteers request

    // Single volunteer request
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
