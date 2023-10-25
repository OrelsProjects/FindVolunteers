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
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse | void> {
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
      );
      const snapshot = await getDocs(q);
      const volunteers = snapshot.docs.map((doc) => doc.data());
      return NextResponse.json(volunteers, { status: 200 });
    } else {
      // Single volunteer request
      const volunteer = await getDoc(doc(volunteersCol, id));
      const volunteerData = volunteer.data();
      return NextResponse.json(volunteerData, { status: 200 });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: "Request failed" }, { status: 500 });
  }
}

export async function POST(req: NextRequest): Promise<NextResponse | void> {
  try {
    const volunteer = await req.json();
    volunteer.createdAt = new Date();
    const volunteerRef = await addDoc(volunteersCol, volunteer);

    return NextResponse.json({ id: volunteerRef.id }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: "Request failed" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest): Promise<NextResponse | void> {
  try {
    const volunteer = await req.json();
    volunteer.lastUpdatedAt = new Date();
    const volunteerRef = doc(volunteersCol, volunteer.id);

    updateDoc(volunteerRef, volunteer);

    return NextResponse.json({}, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: "Request failed" }, { status: 500 });
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
