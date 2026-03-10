import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { AuthResponse } from '../model/auth.response';
import { User } from '../../features/user/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly userSubject = new BehaviorSubject<AuthResponse | null>(null);

  constructor() {
    const userJson = localStorage.getItem('auth_response');
    if (userJson) {
    const user = JSON.parse(userJson);
    this.userSubject.next(user);
  }
  }

  getCurrentUser(): Observable<User | null> {
    return this.userSubject.pipe(map(auth => auth ? auth.user : null));
  }
  
  isAuthenticated(): Observable<boolean> {
    return this.userSubject.pipe(map(user => !!user && !!user.token));
  }

  saveAuthResponse(response: AuthResponse): void {
    // Salvar usuário no localStorage e atualizar o subject
    localStorage.setItem("auth_response", JSON.stringify(response));
    this.userSubject.next(response);
  }

  logout(): void {
    // Remover token e usuário do localStorage e atualizar o subject
    localStorage.removeItem("token");
    localStorage.removeItem("auth_response");
    this.userSubject.next(null);
  }

  getToken(): string | null{
    return this.userSubject.value?.token ?? null;
  }
}