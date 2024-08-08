export interface User {
  teacher_profile_id: number;
  student_profile_id: number;
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
