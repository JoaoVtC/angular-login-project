import { AuthService } from '../service/auth-state.service';
import { AuthResponse } from '../model/auth.response';
import { firstValueFrom } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    localStorage.clear();
    service = new AuthService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save and retrieve AuthResponse', async () => {
    const response: AuthResponse = { user: { id: 1, email: 'test@test.com', name: 'Test', createdAt: new Date() }, token: 'abc123' };
    service.saveAuthResponse(response);
    expect(service.getToken()).toBe('abc123');
    const user = await firstValueFrom(service.getCurrentUser());
    expect(user?.email).toBe('test@test.com');
  });

  it('should logout and clear state', async () => {
    const response: AuthResponse = { user: { id: 1, email: 'test@test.com', name: 'Test', createdAt: new Date() }, token: 'abc123' };
    service.saveAuthResponse(response);
    service.logout();
    expect(service.getToken()).toBeNull();
    const user = await firstValueFrom(service.getCurrentUser());
    expect(user).toBeNull();
  });
});