export interface Note {
  id: number;
  note: string;
  tags: string[];
  userId: string;
}

export interface Notes {
  [key: string]: Note;
}
