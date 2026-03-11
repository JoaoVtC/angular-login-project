import { Injectable } from "@angular/core";
import { SignUpRequest } from "../../features/user/model/signup.request";
import { AuthResponse } from "../model/auth.response";
import { AuthError } from "../model/auth.error";
import { AuthApi } from "../api/auth-api";
import { LoginRequest } from "../../features/user/model/login.request";

@Injectable({
  providedIn: 'root'
})

export class AuthService{

    constructor(private readonly authApi: AuthApi){}

    public signUp(request: SignUpRequest){
        return this.authApi.signUp(request);
    }

    public login(request: LoginRequest){
        return this.authApi.login(request);
    }
}