import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CardComponent } from "../../../shared/card-component";
import { ButtonComponent } from "../../../shared/button-component";
import { InputComponent } from "../../../shared/input-component";
import { LoginRequest } from "../model/login.request";
import { RouterLink } from "@angular/router";

@Component({
    selector: "login-component",
    templateUrl: "../template/login-component.html",
    styleUrl: "../template/css/login-component.css",
    imports: [CardComponent, ButtonComponent, InputComponent, RouterLink],
    standalone: true
})

export class LoginFormComponent {
    @Input() formData!: LoginRequest;
    @Input() loading!: boolean
    @Input() error?: string | string[] | null
    @Output() emailChange = new EventEmitter<string>();
    @Output() passwordChange = new EventEmitter<string>();
    @Output() formSubmit = new EventEmitter<LoginRequest>()

    isArray(value: any): boolean {
        return Array.isArray(value);
    }
}
// - 
// - Form reativo com: email, password
// - Link "Não tem conta? Cadastre-se" → /auth/signup
