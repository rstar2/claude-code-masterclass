import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export type FinalStatus = null | "success" | "failure";

export type Heist = {
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
};

export type CreateHeistInput = Omit<Heist, "id">;

export type UpdateHeistInput = Omit<
  CreateHeistInput,
  "createdBy" | "createdBy" | "createdByCodename"
>;

export const heistConverter = {
  toFirestore: (data: Heist): DocumentData => data,

  fromFirestore: (snapshot: QueryDocumentSnapshot): Heist => {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      ...data,
      createdAt: data.createdAt?.toDate(),
      deadline: data.deadline?.toDate(),
    } as Heist;
  },
};
