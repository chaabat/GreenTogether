import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

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

  updateUser(userData: any): Observable<any> {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const index = users.findIndex((u: any) => u.id === userData.id);

    if (index !== -1) {
      users[index] = { ...users[index], ...userData };
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem(this.USER_KEY, JSON.stringify(users[index]));
      return of(users[index]);
    }

    return throwError(() => new Error('User not found'));
  }
}
