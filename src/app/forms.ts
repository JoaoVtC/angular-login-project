import { Component, signal, computed, ChangeDetectionStrategy} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { email, form, FormField, required, minLength } from '@angular/forms/signals';



interface LoginData {
  email: string;
  password: string;
}

@Component({
  selector: 'app-form',
  templateUrl: 'form.html',
  styleUrl: 'form.css',
  imports: [FormField, FormsModule, ReactiveFormsModule, RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})


export class FormComponent{
    private loginModel = signal<LoginData>({
    email: '',
    password: '',
    });

    public readonly loginForm = form(this.loginModel, (schemaPath) => {
        required(schemaPath.email, {message: "Email is required"})
        required(schemaPath.password, {message: "password is required"})

        email(schemaPath.email, {message: "Enter a valid email adress"})

        minLength(schemaPath.password, 8, {message: "Your password must have a length of minimum 8"})
    });

    public onSubmit(event: Event){
    event.preventDefault();
    // Perform login logic here
    const credentials = this.loginModel();
    console.log('Logging in with:', credentials);
    }
}

/*

State	Description
valid()	Returns true if the field passes all validation rules
touched()	Returns true if the user has focused and blurred the field
dirty()	Returns true if the user has changed the value
disabled()	Returns true if the field is disabled
readonly()	Returns true if the field is readonly
pending()	Returns true if async validation is in progress
errors()	Returns an array of validation errors with kind and message properties

Retorno das validações
*/
