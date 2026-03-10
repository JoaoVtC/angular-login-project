import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth-state.service';
import { map, Observable, of } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(private readonly authService: AuthService, private readonly router: Router) {}

	canActivate(): Observable<boolean> {
        return this.authService.isAuthenticated().pipe(
            map( isAuth => {
                if(isAuth){
                    return true;
                }
                this.router.navigate(["/login"]);
                return false;
            }
            )
        );
	}
}
