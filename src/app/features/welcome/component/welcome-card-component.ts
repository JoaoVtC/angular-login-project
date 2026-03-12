import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CardComponent } from "../../../shared/card-component";
import { ButtonComponent } from "../../../shared/button-component";


@Component({
    selector: "welcome-card",
    templateUrl:"../template/welcome-card.html",
    styleUrl:"../template/css/welcome-card.css",
    imports: [CardComponent, ButtonComponent],
    standalone: true
})
export class WelcomeCard{
    @Input() userName!: string
    @Output() logout = new EventEmitter<void>()
}