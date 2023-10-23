import { DocumentData } from "@firebase/firestore-types";

export const VOLUNTEER_COLLECTION = "volunteers";
export const USER_COLLECTION = "users";

export class Volunteer {
  id?: string;
  role: string;
  experience: number;
  userId: string;
  isEnabled?: boolean;

  constructor(role: string, experience: number, userId: string, id?: string, isEnabled?: boolean) {
    this.id = id;
    this.role = role;
    this.experience = experience;
    this.userId = userId;
    this.isEnabled = isEnabled;
  }

  toDocument(): DocumentData {
    return {
      role: this.role,
      experience: this.experience,
      userId: this.userId,
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
