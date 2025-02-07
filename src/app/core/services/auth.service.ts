import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  address: {
    street: string;
    district: string;
    city: string;
  };
  phone: string;
  birthDate: string;
  profilePicture?: string;
  role: 'user' | 'collector';
  points: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly USERS_KEY = 'users';
  private readonly CURRENT_USER_KEY = 'currentUser';

  constructor(private router: Router) {
    this.initializeCollectors();
  }

  private initializeCollectors() {
    let users = this.getUsers();
    if (users.length === 0) {
      // Add default collector
      users = [
        {
          id: '1',
          email: 'collector1@recycleapp.com',
          password: 'collector123',
          firstName: 'John',
          lastName: 'Collector',
          address: {
            street: '123 Main St',
            district: 'Central',
            city: 'Casablanca',
          },
          phone: '0612345678',
          birthDate: '1990-01-01',
          role: 'collector',
          points: 0,
        },
      ];
      this.saveUsers(users);
    }
  }

  private getUsers(): any[] {
    const usersStr = localStorage.getItem(this.USERS_KEY);
    return usersStr ? JSON.parse(usersStr) : [];
  }

  private saveUsers(users: any[]): void {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  login(credentials: { email: string; password: string }): Observable<User> {
    // Get users from localStorage
    const users = this.getUsers();

    // Find user with matching email and password
    const user = users.find(
      (u) =>
        u.email === credentials.email && u.password === credentials.password
    );

    if (!user) {
      console.log('Login failed:', {
        attemptedEmail: credentials.email,
        registeredUsers: users.map((u) => u.email),
      });
      return throwError(() => new Error('Invalid email or password'));
    }

    // Remove password before storing in currentUser
    const { password, ...userWithoutPassword } = user;
    localStorage.setItem(
      this.CURRENT_USER_KEY,
      JSON.stringify(userWithoutPassword)
    );

    return of(userWithoutPassword);
  }

  register(userData: any): Observable<User> {
    const users = this.getUsers();

    if (users.some((u) => u.email === userData.email)) {
      return throwError(() => new Error('Email already exists'));
    }

    const newUser = {
      ...userData,
      id: Date.now().toString(),
      role: 'user',
      points: 0,
    };

    users.push(newUser);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));

    const { password, ...userWithoutPassword } = newUser;
    localStorage.setItem(
      this.CURRENT_USER_KEY,
      JSON.stringify(userWithoutPassword)
    );
    return of(userWithoutPassword);
  }

  logout(): void {
    localStorage.removeItem(this.CURRENT_USER_KEY);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.CURRENT_USER_KEY);
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem(this.CURRENT_USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  updateUser(userData: Partial<User>): Observable<User> {
    const users = this.getUsers();
    const index = users.findIndex((u) => u.id === userData.id);

    if (index === -1) {
      return throwError(() => new Error('User not found'));
    }

    users[index] = { ...users[index], ...userData };
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(users[index]));
    return of(users[index]);
  }
}
