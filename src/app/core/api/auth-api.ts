import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {environment} from "../environments/environment";
import {User} from "../../features/user/model/user.model"
import {SignUpRequest} from "../../features/user/model/signup.request"
import {LoginRequest} from "../../features/user/model/login.request"
import {AuthResponse} from "../model/auth.response"
import {AuthError} from "../model/auth.error"




@Injectable({
    providedIn:"root"
})
export class AuthApi{
    // Implemente:
// 1. signup(email, name, password): Observable<AuthResponse>
//    - Simule uma chamada HTTP (use delay do RxJS)
//    - Valide: email não pode estar vazio, nome min 3 chars
//    - Se email "admin@test.com" → erro: "Usuário já existe"
//    - Se válido → retornar AuthResponse com token fictício
//
// 2. login(email, password): Observable<AuthResponse>
//    - Valide: email e password obrigatórios
//    - Se email "user@test.com" e password "123456" → sucesso
//    - Se não → erro: "Email ou senha inválidos"
//    - Retornar AuthResponse com token fictício
//


    constructor(private http: HttpClient){}

    public signUp(request: SignUpRequest){
        return this.http.post<AuthResponse | AuthError>(`${environment.API_BASE}/signup`, request);;
    }

    public login(request: LoginRequest){
        return this.http.post<AuthResponse | AuthError>(`${environment.API_BASE}/login`, request);
    }

}