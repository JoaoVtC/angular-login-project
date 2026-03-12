import { Component, Injectable } from '@angular/core';
import { WelcomeCard } from '../component/welcome-card-component';
import { AuthStateService } from '../../../core/service/auth-state.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../user/model/user.model';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-welcome-container',
  imports: [WelcomeCard, AsyncPipe],
  templateUrl: '../template/welcome-container.html',
  styleUrl: '../template/css/welcome-container.css',
  standalone: true
})
@Injectable({
    providedIn: "root"
})
export class WelcomeContainer {
  public readonly currentUser$: Observable<User | null>;

  constructor(
  private readonly authStateService: AuthStateService, 
  private readonly router: Router
  ) {
    this.currentUser$ = authStateService.getCurrentUser();
  }
  
  public onLogout(){
    this.authStateService.logout()
    this.router.navigate(["/login"]);
  }

}
