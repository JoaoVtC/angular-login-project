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
})

@Injectable({
    providedIn: "root"
})
class SignupContainer{
    loading = signal(false);
    error = signal<string | null>(null);

    private readonly request = signal<SignUpRequest>({
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
    })

    private requestForm = form(this.request, (schemaPath) => {
        required(schemaPath.email, {message: "Email is required"})
        required(schemaPath.password, {message: "password is required"})
        required(schemaPath.name, {message: "Name is required"})

        email(schemaPath.email, {message: "Enter a valid email adress"})

        minLength(schemaPath.password, 8, {message: "Your password must have a length of minimum 8"})
        minLength(schemaPath.name, 3, {message: "Your name must have a length of minimum 3" })
    })

    constructor(private readonly authService: AuthService,  private readonly router: Router  ){}

    public onSubmit(event: Event){
        event.preventDefault(); 

        if (!this.request().email || !this.request().email.includes('@')
) {
            this.error.set("Email inválido");
            return;
        }
    
        if (!this.request().name || this.request().name.length < 3) {
            this.error.set("Nome deve ter no mínimo 3 caracteres");
            return;
        }
        
        if (!this.request().password || this.request().password.length < 8) {
            this.error.set("Senha deve ter no mínimo 8 caracteres");
            return;
        }

        if(this.request().password !== this.request().passwordConfirm){
            this.error.set("As senhas não coincidem")
            return;
        }

        this.authService.signUp(this.request());
        this.router.navigate(["/dashboard"]);
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