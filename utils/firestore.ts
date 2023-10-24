import { collection } from "firebase/firestore";
import { db } from "@/firebase";

import { VOLUNTEER_COLLECTION, USER_COLLECTION } from "@/lib/types";

export const volunteersCol = collection(db, VOLUNTEER_COLLECTION);
export const usersCol = collection(db, USER_COLLECTION);
