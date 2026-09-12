export enum AuthProviderType {
  Email = 'email',
  Google = 'google',
  Apple = 'apple',
}

export interface AuthProvider {
  provider: AuthProviderType;
  providerId?: string;
  linkedAt: Date;
}
