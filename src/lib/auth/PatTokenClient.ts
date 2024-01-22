import { AuthHeaderProvider } from './AuthHeaderProvider';
export class PatTokenClient implements AuthHeaderProvider {
  constructor(private readonly patToken: string) {}

  public async getAuthHeader(): Promise<string> {
    return `bearer ${this.patToken}`;
  }
}
