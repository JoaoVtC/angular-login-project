import { Injectable, signal, Component, ChangeDetectionStrategy } from "@angular/core";
import { AuthService } from "../../../core/service/auth.service";
import { Router } from "@angular/router";
import { email, form, required } from "@angular/forms/signals";
import { LoginRequest } from "../model/login.request";
import { LoginFormComponent } from "../components/login-form-component";
import { AuthError } from "../../../core/model/auth.error";
import { AuthResponse } from "../../../core/model/auth.response";
import { AuthStateService } from "../../../core/service/auth-state.service";


@Component({
    selector: "login-container",
    imports: [LoginFormComponent],
    templateUrl: "../templates/login-container.html",
    styleUrl: "../templates/css/login-container.css",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})

@Injectable({
    providedIn: "root"
})
export class LoginContainer{
    loading = signal(false);
    error = signal<string | null | string[]>(null);

    readonly request = signal<LoginRequest>({
        email: "",
        password: "",
    })

    private readonly requestForm = form(this.request, (schemaPath) => {
        required(schemaPath.email, {message: "Email is required"})
        required(schemaPath.password, {message: "password is required"})

        email(schemaPath.email, {message: "Enter a valid email adress"})

    })

    constructor(private readonly authService: AuthService,  private readonly router: Router, private readonly authState: AuthStateService  ){}

    public onSubmit(event: LoginRequest){
        // event.preventDefault(); não funciona

        if (this.requestForm.email().value())
        {
            this.error.set(this.requestForm.email().value());
            return;
        }
    
        if (this.requestForm.password().value()) {
            this.error.set(this.requestForm.password().value());
            return;
        }

        this.loading.set(true);

        this.authService.login(this.request()).subscribe({
            next: (response) => {
                // Check if response is an error
                if ((response as AuthError).code) {
                    this.error.set((response as AuthError).message);
                } else {
                    // Success - save and navigate
                    this.authState.saveAuthResponse(response as AuthResponse);
                    this.router.navigate(["/dashboard"]);
                }
                this.loading.set(false);
            },
            error: (err) => {
                this.error.set("Erro ao fazer login");
                this.loading.set(false);
            }
        });
    }


    public onEmailChange(email: string){
        this.request.set({...this.request(), email})
    }

    public onPasswordChange(password: string){
        this.request.set({...this.request(), password})
    }


    
}