import { LoginContainer } from "./container/login-container";
import { Routes } from "@angular/router";
import { SignupContainer } from "./container/signup-container";

export const userRoutes: Routes = [
    {
        path: 'signup',
        component: SignupContainer
    },
    {
        path: 'login',
        component: LoginContainer
    }
];
