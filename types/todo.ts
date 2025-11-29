export interface Todo {
  id: string;
  title: string;
  content: string;
  published?: boolean,
  public: boolean,
  authorId: number;
  createdDt?: Date;
  updatedDt?: Date;
  User: {
    username: string
  }
}
