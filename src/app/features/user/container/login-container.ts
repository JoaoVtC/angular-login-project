import { HttpErrorResponse } from "@angular/common/http";
import { Injectable, signal, Component, ChangeDetectionStrategy } from "@angular/core";
import { AuthService } from "../../../core/service/auth.service";
import { Router } from "@angular/router";
import { LoginRequest } from "../model/login.request";
import { LoginFormComponent } from "../component/login-form-component";
import { AuthResponse } from "../../../core/model/auth.response";
import { AuthStateService } from "../../../core/service/auth-state.service";


@Component({
    selector: "login-container",
    imports: [LoginFormComponent],
    templateUrl: "../template/login-container.html",
    styleUrl: "../template/css/login-container.css",
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

    constructor(private readonly authService: AuthService,  private readonly router: Router, private readonly authState: AuthStateService  ){}

    public onSubmit(_formData?: LoginRequest): void {
        const validationErrors = this.validateRequest();

        if (validationErrors.length > 0) {
            this.error.set(validationErrors);
            return;
        }

        this.error.set(null);
        this.loading.set(true);

        this.authService.login(this.request()).subscribe({
            next: (response) => {
                this.authState.saveAuthResponse(response as AuthResponse);
                this.router.navigate(["/welcome"]);
                this.loading.set(false);
            },
            error: (err: HttpErrorResponse) => {
                this.error.set(this.getApiErrorMessage(err));
                this.loading.set(false);
            }
        });
    }


    public onEmailChange(email: string): void {
        this.error.set(null);
        this.request.set({...this.request(), email})
    }

    public onPasswordChange(password: string): void {
        this.error.set(null);
        this.request.set({...this.request(), password})
    }

    private validateRequest(): string[] {
        const { email, password } = this.request();
        const errors: string[] = [];

        if (!email.trim()) {
            errors.push("Email é obrigatório");
        } else if (!this.isValidEmail(email)) {
            errors.push("Email deve ser válido");
        }

        if (!password) {
            errors.push("Senha é obrigatória");
        }

        return errors;
    }

    private isValidEmail(email: string): boolean {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    private getApiErrorMessage(error: HttpErrorResponse): string | string[] {
        const apiError = error.error;

        if (apiError?.errors && typeof apiError.errors === "object") {
            return Object.values(apiError.errors as Record<string, string>);
        }

        if (typeof apiError?.message === "string") {
            return apiError.message;
        }

        return "Erro ao fazer login";
    }


    
}