import { DocumentData } from "@firebase/firestore-types";
import { DocumentSnapshot } from "firebase/firestore";

export const VOLUNTEER_COLLECTION = "volunteers";
export const USER_COLLECTION = "users";

export type Volunteers = Volunteer[];

export enum TableTypes {
  VOLUNTEERS = "VOLUNTEERS",
  // add more types here
}

export interface ApiResponse<T> {
  items?: T | T[] | null;
  error?: string;
}

export abstract class UseTableDataItem<T> {
  id?: string;
  name: string;

  constructor(name: string, id?: string) {
    this.id = id;
    this.name = name;
  }

  abstract toObject(): T;
}

export class Volunteer extends UseTableDataItem<Volunteer> {
  name: string;
  role: string;
  experienceYears: number;
  userId?: string;
  isEnabled?: boolean;

  constructor(
    name: string,
    role: string,
    experienceYears: number,
    userId?: string,
    id?: string,
    isEnabled?: boolean
  ) {
    super(name, id);
    this.name = name;
    this.role = role;
    this.experienceYears = experienceYears;
    this.userId = userId;
    this.isEnabled = isEnabled;
  }

  toObject(): Volunteer {
    console.log("To objecting", this);
    return new Volunteer(
      this.name,
      this.role,
      this.experienceYears,
      this.userId,
      this.id,
      this.isEnabled
    );
  }

  toDocument(): DocumentData {
    return {
      name: this.name,
      role: this.role,
      experienceYears: this.experienceYears,
      isEnabled: this.isEnabled,
      userId: this.userId,
    };
  }

  static fromFirestore(doc: DocumentSnapshot): Volunteer | null {
    const data = doc.data();

    if (!data) {
      return null;
    }

    return new Volunteer(
      data.name,
      data.role,
      data.experienceYears,
      data.userId,
      doc.id, // Assuming the document ID is the same as the 'id' property
      data.isEnabled
    );
  }

  // Static method to convert Volunteer instance to Firestore document data
  static toFirestore(volunteer: Volunteer): DocumentData {
    return {
      name: volunteer.name,
      role: volunteer.role,
      experienceYears: volunteer.experienceYears,
      userId: volunteer.userId,
      isEnabled: volunteer.isEnabled,
    };
  }
}

export class User {
  id?: string;
  name: string;
  email: string;
  linkedinUrl?: string;

  constructor(name: string, email: string, id?: string, linkedinUrl?: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.linkedinUrl = linkedinUrl;
  }

  toDocument(): DocumentData {
    return {
      name: this.name,
      email: this.email,
      linkedinUrl: this.linkedinUrl,
    };
  }
}
