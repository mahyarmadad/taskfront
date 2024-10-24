export interface TASK {
  id: string;
  title: string;
  description: string;
  done: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface TASKLIST {
  list: TASK[];
}
