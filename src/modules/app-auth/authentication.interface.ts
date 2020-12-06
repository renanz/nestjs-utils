export interface AuthUser {
  clientId: string;
  email: string;
  userId: string;
  roles?: { id: number; name: string }[];
}
