export interface User {
  _id: string;
  name: string;
  password: string;
  profileImage: string;
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  assignee: User;
  assigned: User[];
  dueTo: {
    date: Date;
  };
  [key: string]: any; // Add an index signature to allow string indexing
}

export interface TaskList {
  _id: string;
  name: string;
  Tasks: Task[];
  customer: User;
  [key: string]: any; // Index signature
}
