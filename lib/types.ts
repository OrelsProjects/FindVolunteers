import { DocumentData } from "@firebase/firestore-types";
import { DocumentSnapshot } from "firebase/firestore";

export const VOLUNTEER_COLLECTION = "volunteers";
export const PROJECT_OWNERS_COLLECTION = "projectOwners";
export const USER_COLLECTION = "users";

export type Volunteers = Volunteer[];

export enum TableTypes {
  VOLUNTEERS = "VOLUNTEERS",
  // add more types here
}

export interface ApiResponse<T> {
  result?: T | T[] | null;
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
  linkedinUrl?: string;

  constructor(
    name: string,
    role: string,
    experienceYears: number,
    userId?: string,
    id?: string,
    isEnabled?: boolean,
    linkedinUrl?: string
  ) {
    super(name, id);
    this.name = name;
    this.role = role;
    this.experienceYears = experienceYears;
    this.userId = userId;
    this.isEnabled = isEnabled;
    this.linkedinUrl = linkedinUrl;
  }

  toObject(): Volunteer {
    console.log("To objecting", this);
    return new Volunteer(
      this.name,
      this.role,
      this.experienceYears,
      this.userId,
      this.id,
      this.isEnabled,
      this.linkedinUrl
    );
  }

  toDocument(): DocumentData {
    return {
      name: this.name,
      role: this.role,
      experienceYears: this.experienceYears,
      isEnabled: this.isEnabled,
      userId: this.userId,
      linkedinUrl: this.linkedinUrl,
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
      data.isEnabled,
      data.linkedinUrl
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
      linkedinUrl: volunteer.linkedinUrl,
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
