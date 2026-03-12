# Correcao Dos Bugs De Formulario

## Problema 1: erro aparecia e sumia rapido

Os templates de login e signup usavam o evento nativo `submit` do formulario sem cancelar o comportamento padrao do navegador.

Trecho anterior:

```html
<form (submit)="formSubmit.emit(formData)">
```

Quando havia erro de validacao no front, o estado de erro era atualizado, mas logo em seguida o navegador continuava com o submit nativo do formulario. Isso fazia a tela recarregar ou reinicializar o estado do componente, e a mensagem desaparecia.

### Como foi resolvido

Foi adicionado `preventDefault()` no submit dos formularios:

```html
<form (submit)="$event.preventDefault(); formSubmit.emit(formData)">
```

Assim, o Angular continua tratando o envio no componente, sem deixar o navegador executar o submit HTML padrao.

## Problema 2: valor do campo virava `[Object Event]`

O componente compartilhado de input tinha um `@Output()` chamado `change`:

```typescript
@Output() change = new EventEmitter<string>()
```

E os componentes pais ouviam isso assim:

```html
<input-auth (change)="emailChange.emit($event)"></input-auth>
```

O nome `change` conflita com o evento DOM nativo `change`. Como o `input` interno tambem dispara esse evento ao perder foco, o componente pai acabava recebendo um `Event` do navegador em vez de uma `string`. Quando esse objeto era jogado no estado e depois renderizado no input, o valor aparecia como `[Object Event]`.

### Como foi resolvido

O output customizado foi renomeado para `valueChange`:

```typescript
@Output() valueChange = new EventEmitter<string>()
```

E os bindings dos formularios foram atualizados para:

```html
<input-auth (valueChange)="emailChange.emit($event)"></input-auth>
```

Com isso, o componente pai escuta apenas o evento customizado do Angular, sem colisao com o evento DOM nativo.

## Arquivos alterados

- `src/app/shared/input-component.ts`
- `src/app/shared/templates/input-auth.html`
- `src/app/features/user/template/signup-component.html`
- `src/app/features/user/template/login-component.html`

## Resultado

- Os erros de validacao agora permanecem visiveis na tela.
- Os campos continuam mostrando o texto digitado corretamente.
- O valor nao e mais substituido por `[Object Event]` ao sair do campo.

## Ajuste Para API Real

O exercicio original sugeria uma simulacao local, mas o projeto foi conectado a uma API Spring real em `http://localhost:8080/api/auth`.

Isso mudou dois pontos importantes do frontend:

### 1. Erros da API nao chegam no `next`

No `HttpClient` do Angular, respostas `4xx` e `5xx` nao passam pelo `next` do `subscribe`. Elas caem no callback `error`.

Antes, o signup e o login tratavam o retorno como se o backend devolvesse `AuthResponse | AuthError` no mesmo fluxo de sucesso. Isso funcionaria em uma simulacao usando `of(...)`, mas nao com uma API HTTP real.

Exemplo do problema anterior:

```typescript
this.authService.signUp(this.request()).subscribe({
	next: (response: any) => {
		if (response.code) {
			this.error.set(response.message);
		} else {
			this.router.navigate(['/login']);
		}
	}
});
```

Com a API real, quando havia conflito ou erro de validacao, o Angular nem entrava nesse `next`. Por isso a mensagem podia nao aparecer corretamente.

### Como foi resolvido

- O sucesso agora redireciona diretamente no `next`.
- Os erros HTTP agora sao lidos no callback `error`.
- Quando o backend devolve `errors` por campo, o frontend converte esse objeto em uma lista de mensagens e mostra abaixo do formulario.

### 2. O frontend nao estava registrando o `HttpClient`

Como o projeto usa uma API real, o Angular precisa do provider de HTTP no bootstrap da aplicacao.

Foi adicionado em `src/app/app.config.ts`:

```typescript
provideHttpClient()
```

Sem isso, o fluxo com backend real nao fica corretamente preparado para fazer as chamadas de `signup` e `login`.

### 3. A validacao local estava lendo o valor do campo, nao o erro

Nos containers, a validacao anterior usava a API de forms signals de um jeito que acabava puxando o valor digitado, nao a mensagem de validacao. Por isso o frontend mostrava algo como o proprio nome ou email digitado na area de erro.

### Como foi resolvido

- A validacao local de signup e login foi substituida por uma validacao explicita e previsivel.
- Agora o container monta um array de mensagens com regras simples:
	- campos obrigatorios
	- email valido
	- senha minima de 6 caracteres no cadastro
	- confirmacao de senha igual

Isso deixou o comportamento coerente tanto para validacao local quanto para respostas da API real.

## Arquivos alterados nesta segunda correcao

- `src/app/app.config.ts`
- `src/app/features/user/container/signup-container.ts`
- `src/app/features/user/container/login-container.ts`

## Resultado com API real

- Cadastro valido redireciona para `/login`.
- Erros do backend aparecem abaixo do formulario.
- Erros de validacao local nao mostram mais o valor digitado.
- Login e signup seguem a semantica correta do `HttpClient` do Angular.