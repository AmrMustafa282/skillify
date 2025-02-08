
export interface User {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
}

export interface UserStoreState {
  user: User | null;
  expiresAt: number | null;
  setUser: (user: User | null) => void;
  setExpiration: (expiresAt: number | null) => void;
  clearUser: () => void;
}



export enum Role {
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_RECRUITER = 'ROLE_RECRUITER',
  ROLE_CANDIDATE = 'ROLE_CANDIDATE',
}
