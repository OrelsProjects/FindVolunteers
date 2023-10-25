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
): Promise<
  NextResponse<ApiResponse<Volunteer | Volunteers | null | undefined>>
> {
  try {
    const id = req.nextUrl.searchParams.get("id") || "";
    // Many volunteers request
    if (!id) {
      const pageStr = req.nextUrl.searchParams.get("page");
      const limitStr = req.nextUrl.searchParams.get("limit");
      // Validate the query params
      if (pageStr === null && limitStr === null) {
        throw new Error("Invalid query");
      }

      const pageNum: number = pageStr !== null ? Number(pageStr) : 1;
      const limitNum: number = limitStr !== null ? Number(limitStr) : 10;

      if (isNaN(pageNum) || isNaN(limitNum)) {
        throw new Error("Invalid query parameters");
      }

      const q = query(
        volunteersCol,
        orderBy("createdAt", "desc"),
        limit(limitNum)
      ).withConverter(converterVolunteer);
      const snapshot = await getDocs(q);

      const volunteers = snapshot.docs.map((doc) => doc.data()) ?? [];

      return NextResponse.json({ items: volunteers }, { status: 200 });
    } else {
      // Single volunteer request
      const volunteerDoc: DocumentReference<Volunteer | null> = doc(
        volunteersCol,
        id
      ).withConverter(converterVolunteer);

      const volunteer: DocumentSnapshot<Volunteer | null> = await getDoc(
        volunteerDoc
      );
      const volunteerData: Volunteer | null = volunteer.data() ?? null;
      return NextResponse.json({ items: volunteerData }, { status: 200 });
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Request failed" }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest
): Promise<NextResponse<ApiResponse<string | null>> | void> {
  try {
    const volunteer: Volunteer = await req.json();
    const volunteerJson = JSON.parse(JSON.stringify(volunteer));
    volunteerJson.createdAt = new Date();
    volunteerJson.lastUpdatedAt = new Date();

    const volunteerRef = await addDoc(volunteersCol, volunteerJson);

    return NextResponse.json({ items: volunteerRef.id }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Request failed" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest
): Promise<NextResponse<ApiResponse<string | null>> | void> {
  try {
    const volunteer: Volunteer = await req.json();

    const volunteerRef = doc(volunteersCol, volunteer.id).withConverter({
      toFirestore: (volunteer: Volunteer) => Volunteer.toFirestore(volunteer), // Add the `toFirestore()` converter
      fromFirestore: (snap: DocumentSnapshot<DocumentData>) =>
        Volunteer.fromFirestore(snap), // Add the `fromFirestore()` converter
    });
    const volunteerJson = JSON.parse(JSON.stringify(volunteer));
    volunteerJson.lastUpdatedAt = new Date();

    await updateDoc(volunteerRef, volunteerJson);

    return NextResponse.json({ items: volunteer.id }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Request failed" }, { status: 500 });
  }
}
export async function DELETE(
  req: NextRequest
): Promise<NextResponse<ApiResponse<string | null>> | void> {
  try {
    const volunteer: Volunteer = await req.json();

    const volunteerRef = doc(volunteersCol, volunteer.id).withConverter({
      toFirestore: (volunteer: Volunteer) => Volunteer.toFirestore(volunteer),
      fromFirestore: (snap: DocumentSnapshot<DocumentData>) =>
        Volunteer.fromFirestore(snap),
    });

    await deleteDoc(volunteerRef);

    return NextResponse.json({ items: volunteer.id }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Request failed" }, { status: 500 });
  }
}
