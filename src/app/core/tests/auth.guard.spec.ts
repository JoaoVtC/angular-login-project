import { AuthGuard } from '../guard/auth.guard';
import { AuthService } from '../service/auth-state.service';
import { Router } from '@angular/router';
import { of, firstValueFrom } from 'rxjs';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    authService = {
      isAuthenticated: () => of(true)
    } as any;
    router = {
      navigate: vi.fn()
    } as any;
    guard = new AuthGuard(authService, router);
  });

  it('should allow access when authenticated', async () => {
    const result = await firstValueFrom(guard.canActivate());
    expect(result).toBe(true);
  });

  it('should block access and redirect when not authenticated', async () => {
    authService.isAuthenticated = () => of(false);
    guard = new AuthGuard(authService, router);
    const result = await firstValueFrom(guard.canActivate());
    expect(result).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});