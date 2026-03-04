import {
  DocumentData,
  FieldValue,
  QueryDocumentSnapshot,
} from "firebase/firestore";

export type FinalStatus = null | "success" | "failure";

export interface Heist {
  id: string;
  createdAt: Date;
  title: string;
  description: string;
  createdBy: string; // uid
  createdByCodename: string;
  assignedTo: string; // uid
  assignedToCodename: string;
  deadline: Date;
  finalStatus: FinalStatus;
}

export interface CreateHeistInput {
  createdAt: FieldValue;
  title: string;
  description: string;
  createdBy: string;
  createdByCodename: string;
  assignedTo: string;
  assignedToCodename: string;
  deadline: Date;
  finalStatus: FinalStatus;
}

export interface UpdateHeistInput {
  title?: string;
  description?: string;
  assignedTo?: string;
  assignedToCodename?: string;
  deadline?: Date;
  finalStatus?: FinalStatus;
}

export const heistConverter = {
  toFirestore: (data: Partial<Heist>): DocumentData => data,

  fromFirestore: (snapshot: QueryDocumentSnapshot): Heist =>
    ({
      id: snapshot.id,
      ...snapshot.data(),
      createdAt: snapshot.data().createdAt?.toDate(),
      deadline: snapshot.data().deadline?.toDate(),
    }) as Heist,
};
