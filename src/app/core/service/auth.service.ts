import { Injectable } from "@angular/core";
import { SignUpRequest } from "../../features/user/model/signup.request";
import { AuthResponse } from "../model/auth.response";
import { AuthError } from "../model/auth.error";
import { AuthApi } from "../api/auth-api";

Injectable({
  providedIn: 'root'
})

export class AuthService{

    constructor(private readonly authApi: AuthApi){}

    public signUp(request: SignUpRequest){
        return this.authApi.signUp(request);
    }
}