import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
 import { UserRole } from '../model/user.model'; 


@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
 
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = this.authService.getCurrentUser();
    const requiredRole = route.data['role'] as UserRole;
    
    if (!currentUser) {
     
      return this.router.createUrlTree(['/auth/login']);
    }

    if (requiredRole && currentUser.role !== requiredRole) {
      
      return this.router.createUrlTree(['/dashboard']);
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