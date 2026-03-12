import { Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/signup', pathMatch: 'full' },
    {
        path: '',
        loadChildren: () => import('./features/user/user.routes').then((m) => m.userRoutes)
    },
    {
        path: 'welcome',
        loadChildren: () => import('./features/welcome/welcome.routes').then((m) => m.welcomeRoutes),
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        redirectTo: '/signup'
    }
];