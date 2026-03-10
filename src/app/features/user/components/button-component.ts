import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: "button-auth",
    templateUrl: "../templates/button-auth.html",
    styleUrl: "../templates/button-auth.css"
})
class ButtonComponent{
    @Input() label!: string
    @Input() loading: boolean = false
    @Input() disabled: boolean = false
    @Output() click = new EventEmitter<void>()
}