import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
 

@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    
  ) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = this.authService.getCurrentUser();
    
    if (!currentUser) {
      
      return this.router.createUrlTree(['/auth/login']);
    }

    if (!this.isProfileComplete(currentUser)) {
      
   
      return this.router.createUrlTree(['/profile']);
    }

    return true;
  }

  private isProfileComplete(user: any): boolean {
    return !!(
      user.phoneNumber &&
      user.dateOfBirth &&
      user.address?.street &&
      user.address?.district &&
      user.address?.city &&
      user.address?.postalCode
    );
  }
} 