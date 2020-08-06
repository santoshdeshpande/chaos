export interface Note {
  id: number;
  note: string;
  tags: string[];
}

export interface Notes {
  [key: string]: Note;
}
