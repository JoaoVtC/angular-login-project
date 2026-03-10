import { Component, signal, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FormComponent} from "./forms";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormComponent], // Import de componentes
  // templateUrl: './trial.html', // HTML usado pelo componente
  // styleUrl: './app.css', // CSS usado pelo componente
  template: `<button [disabled]="!isTrialExpired()" (click)="renovateTrial()">Renovar trial</button> <!--Setta o disabled pra mudar quando isTrialExpired() for falso-->
   @if(showTrialDuration()){
        <h1>24 horas de trial</h1>
        <app-form></app-form>
    }
    @else {
      <h1>Trial finalizada</h1>
    }

    <h2>Usuários em trial</h2>
    <ul class="user-in-trial">
      @for(usuario of usuarios(); track usuario.id){
        <li class="user">{{usuario.nome}}</li> <!-- Text Interpolation -> {{usuario()}} assim é com signal, altera sempre que o signal é alterado-->
      }
    </ul>
  `
})



export class App {
  protected title = signal('essentials'); // Signals serve para criar e gerir estado, são consideradas funções
  public readonly titleConfig  = computed(() => this.title().length); // Valor muda automaticamente quando o signal muda
  isTrial = signal(true);
  isTrialExpired = signal(true);
  showTrialDuration = computed(() => this.isTrial() && !this.isTrialExpired());
  public readonly usuarios = signal([{id: 1, nome:"João"}, {id: 1, nome:"Carlos"}])

  public activateTrial() {
    this.isTrial.set(true);
  }

  public renovateTrial(){
    this.isTrialExpired.set(false)
  }

  public getTitle(){
    return this.title();
  }

  public setTitle(title: string) : void{
    this.title.set(title); 
  }

  public updateTitle() : string{
    this.title.update((title) => title.toLowerCase())
    return this.title();
  }

  
  
}

let app: App = new App();

const loginModel = signal<App>(app);

console.log(app.getTitle());
console.log(app.titleConfig())
console.log(app.setTitle("Carlos"));
console.log(app.getTitle());
console.log(app.titleConfig())
console.log(app.updateTitle());
console.log(app.titleConfig())


// <ul [attr.role]="listRole()"> -> binding no atributo role

/*
<!-- When `isExpanded` is truthy, add the `expanded` CSS class. -->
<ul [class.expanded]="isExpanded()">
*/

// Posso carregar varias classes dentfo de um atributo class com string, listas ou objetos

/*
Exemplo:

@Component({
  template: `
    <ul [class]="listClasses"> ... </ul>
    <section [class]="sectionClasses()"> ... </section>
    <button [class]="buttonClasses()"> ... </button>
  `,
  ...
})
export class UserProfile {
  listClasses = 'full-width outlined';
  sectionClasses = signal(['expandable', 'elevated']);
  buttonClasses = signal({
    highlighted: true,
    embiggened: false,
  });
}
*/

/*
@Component({
  template: `<ul class="list" [class]="listType()" [class.expanded]="isExpanded()"> ...`,
  ...
})
export class Listbox {
  listType = signal('box');
  isExpanded = signal(true);
}
check
In the example above, Angular renders the ul element with all three CSS classes.

<ul class="list box expanded">
*/

/*
É possível setar propriedades do CSS:

<!-- Set the CSS `display` property based on the `isExpanded` property. -->
<section [style.display]="isExpanded() ? 'block' : 'none'">
*/

/*
@Component({
  template: `
    <ul [style]="listStyles()"> ... </ul>
    <section [style]="sectionStyles()"> ... </section>
  `,
  ...
})
export class UserProfile {
  listStyles = signal('display: flex; padding: 8px');
  sectionStyles = signal({
    border: '1px solid black',
    'font-weight': 'bold',
  });
}
*/

/*
When you want to capture specific keyboard events for a specific key, you might write some code like the following:

@Component({
  template: `
    <input type="text" (keyup)="updateField($event)" />
  `,
  ...
})
export class App {
  updateField(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      console.log('The user pressed enter in the text field.');
    }
  }
}

ou

@Component({
  template: `
    <input type="text" (keyup.enter)="updateField($event)" />
  `,
  ...
})
export class App{
  updateField(event: KeyboardEvent): void {
    console.log('The user pressed enter in the text field.');
  }
}
*/