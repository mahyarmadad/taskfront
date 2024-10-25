export interface TASK {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface TASKLIST {
  list: TASK[];
}
