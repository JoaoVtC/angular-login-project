import { Injectable, Component, signal, ChangeDetectionStrategy, computed } from "@angular/core";
import { AuthService } from "../../../core/service/auth.service";
import { Router } from "@angular/router";
import { SignUpRequest } from "../model/signup.request";
import { email, form, minLength, required } from "@angular/forms/signals";
import { SignupFormComponent } from "../components/signup-form-component";



@Component({
    selector: "signup-container",
    imports: [SignupFormComponent],
    templateUrl: "../templates/signup-container.html",
    styleUrl: "../templates/css/signup-container.css",
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

    private readonly requestForm = form(this.request, (schemaPath) => {
        required(schemaPath.email, {message: "Email is required"})
        required(schemaPath.password, {message: "password is required"})
        required(schemaPath.name, {message: "Name is required"})

        email(schemaPath.email, {message: "Enter a valid email adress"})

        minLength(schemaPath.password, 8, {message: "Your password must have a length of minimum 8"})
        minLength(schemaPath.name, 3, {message: "Your name must have a length of minimum 3" })
    })

    constructor(private readonly authService: AuthService,  private readonly router: Router  ){}

    public onSubmit(formData: SignUpRequest){
        if (this.requestForm.email().value())
        {
            this.error.set(this.requestForm.email().value());
            return;
        }
    
        if (this.requestForm.name().value()) {
            this.error.set(this.requestForm.name().value());
            return;
        }
        
        if (this.requestForm.password().value()) {
            this.error.set(this.requestForm.password().value());
            return;
        }

        if(this.request().password !== this.request().passwordConfirm){
            this.error.set("As senhas não coincidem")
            return;
        }

        this.loading.set(true);

        this.authService.signUp(this.request()).subscribe({
            next: (response: any) => {
                if (response.code) {
                    this.error.set(response.message);
                } else {
                    this.router.navigate(["/login"]);
                }
                this.loading.set(false);
            },
            error: (err: any) => {
                this.error.set("Erro ao fazer cadastro");
                this.loading.set(false);
            }
        });
    }

    public onNameChange(name: string){
        this.request.set({...this.request(), name})
    }

    public onEmailChange(email: string){
        this.request.set({...this.request(), email})
    }

    public onPasswordChange(password: string){
        this.request.set({...this.request(), password})
    }

    public onPasswordConfirmChange(passwordConfirm: string){
        this.request.set({...this.request(), passwordConfirm})
    }

    
}