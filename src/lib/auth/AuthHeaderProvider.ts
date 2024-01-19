export interface AuthHeaderProvider<T> {
  getToken(): Promise<T>;
}
