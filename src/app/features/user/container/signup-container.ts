import { HttpErrorResponse } from "@angular/common/http";
import { Injectable, Component, signal, ChangeDetectionStrategy } from "@angular/core";
import { AuthService } from "../../../core/service/auth.service";
import { Router } from "@angular/router";
import { SignUpRequest } from "../model/signup.request";
import { SignupFormComponent } from "../component/signup-form-component";



@Component({
    selector: "signup-container",
    imports: [SignupFormComponent],
    templateUrl: "../template/signup-container.html",
    styleUrl: "../template/css/signup-container.css",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})

@Injectable({
    providedIn: "root"
})
export class SignupContainer{
    loading = signal(false);
    error = signal<string | null | string[]>(null);

    readonly request = signal<SignUpRequest>({
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
    })

    constructor(private readonly authService: AuthService,  private readonly router: Router  ){}

    public onSubmit(_formData?: SignUpRequest): void {
        const validationErrors = this.validateRequest();

        if (validationErrors.length > 0) {
            this.error.set(validationErrors);
            return;
        }

        this.error.set(null);
        this.loading.set(true);

        this.authService.signUp(this.request()).subscribe({
            next: () => {
                this.loading.set(false);
                this.router.navigate(["/login"]);
            },
            error: (err: HttpErrorResponse) => {
                this.loading.set(false);
                this.error.set(this.getApiErrorMessage(err));
            }
        });
    }

    public onNameChange(name: string): void {
        this.error.set(null);
        this.request.set({...this.request(), name})
    }

    public onEmailChange(email: string): void {
        this.error.set(null);
        this.request.set({...this.request(), email})
    }

    public onPasswordChange(password: string): void {
        this.error.set(null);
        this.request.set({...this.request(), password})
    }

    public onPasswordConfirmChange(passwordConfirm: string): void {
        this.error.set(null);
        this.request.set({...this.request(), passwordConfirm})
    }

    private validateRequest(): string[] {
        const { email, name, password, passwordConfirm } = this.request();
        const errors: string[] = [];

        if (!name.trim()) {
            errors.push("Nome é obrigatório");
        } else if (name.trim().length < 3) {
            errors.push("Nome deve ter no mínimo 3 caracteres");
        }

        if (!email.trim()) {
            errors.push("Email é obrigatório");
        } else if (!this.isValidEmail(email)) {
            errors.push("Email deve ser válido");
        }

        if (!password) {
            errors.push("Senha é obrigatória");
        } else if (password.length < 6) {
            errors.push("Senha deve ter no mínimo 6 caracteres");
        }

        if (password !== passwordConfirm) {
            errors.push("As senhas não coincidem");
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

        return "Erro ao fazer cadastro";
    }

    
}