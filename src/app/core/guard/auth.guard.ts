import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthStateService } from '../service/auth-state.service';
import { map, Observable, of } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(private readonly authStateService: AuthStateService, private readonly router: Router) {}

	canActivate(): Observable<boolean> {
        return this.authStateService.isAuthenticated().pipe(
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
