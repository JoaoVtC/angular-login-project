import { Component, EventEmitter, Input, Output } from "@angular/core";
import { SignUpRequest } from "../model/signup.request";
import { CardComponent } from "../../../shared/card-component";
import { ButtonComponent } from "../../../shared/button-component";
import { InputComponent } from "../../../shared/input-component";

@Component({
    selector: "signup-component",
    templateUrl: "../templates/signup-component.html",
    styleUrl: "../templates/css/signup-component.css",
    imports: [CardComponent, ButtonComponent, InputComponent]
})
export class SignupFormComponent{
    @Input() formData! : SignUpRequest;
    @Input() loading!: boolean
    @Input() error?: string | string[] | null
    @Input() label!: string
    @Output() emailChange = new EventEmitter<string>();
    @Output() nameChange = new EventEmitter<string>();
    @Output() passwordChange = new EventEmitter<string>();
    @Output() passwordConfirmChange = new EventEmitter<string>();
    @Output() submit = new EventEmitter<SignUpRequest>();
    
    isArray(value: any): boolean {
        return Array.isArray(value);
    }
}