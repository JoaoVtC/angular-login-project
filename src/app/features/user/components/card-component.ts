import { Component, Input } from "@angular/core";

@Component({
    selector: "card-user",
    templateUrl: "../templates/card-user.html",
    styleUrl: "../templates/css/card-user.css"
})
export class CardComponent{

    @Input() title!: string
    @Input() subtitle?: string
}