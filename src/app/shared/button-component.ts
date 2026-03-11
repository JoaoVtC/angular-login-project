import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: "button-auth",
    templateUrl: "./templates/button-auth.html",
    styleUrl: "./templates/css/button-auth.css",
    standalone: true
})
export class ButtonComponent{
    @Input() label!: string
    @Input() loading: boolean = false
    @Input() disabled: boolean = false
    @Output() click = new EventEmitter<void>()
}