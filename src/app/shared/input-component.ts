import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: "input-auth",
    templateUrl: "./templates/input-auth.html",
    styleUrl: "./templates/css/input-auth.css",
    standalone: true
})
export class InputComponent{
    @Input() label!: string
    @Input() type: 'email' | 'password' | 'text' = 'text'
    @Input() value: string = ''
    @Output() change = new EventEmitter<string>()
}