import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly USER_KEY = 'user';

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.USER_KEY);
  }

  login(user: any): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  logout(): void {
    localStorage.removeItem(this.USER_KEY);
  }

  getCurrentUser(): any {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }
}
