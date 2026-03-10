import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: "input-auth",
    templateUrl: "../templates/input-auth.html",
    styleUrl: "../templates/input-auth.css"
})
class InputComponent{
    @Input() label!: string
    @Input() type: 'email' | 'password' | 'text' = 'text'
    @Input() value: string = ''
    @Input() errorMessage?: string
    @Output() change = new EventEmitter<string>()
}