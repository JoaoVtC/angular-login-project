import { Component, Input } from "@angular/core";

@Component({
    selector: "card-component",
    templateUrl: "./templates/card-user.html",
    styleUrl: "./templates/css/card-user.css",
    standalone: true
})
export class CardComponent{
    @Input() title!: string
    @Input() subtitle?: string
}