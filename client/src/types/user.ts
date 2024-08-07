export interface User {
  id: number;
  name: string;
  email: string;
  profile_id: number;
}

export interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}
