import { DocumentData } from "@firebase/firestore-types";
export const VOLUNTEER_COLLECTION = "volunteers";

export class Volunteer {
  id?: string;
  name: string;
  role: string;
  experience: number;

  constructor(name: string, role: string, experience: number, id?: string) {
    this.id = id;
    this.name = name;
    this.role = role;
    this.experience = experience;
  }

  toDocument(): DocumentData {
    return {
      name: this.name,
      role: this.role,
      experience: this.experience,
    };
  }
}
