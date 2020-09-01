



import { Routes } from '@angular/router';
import { PrincipalComponent } from './pages/principal/principal.component';

export const ROUTES: Routes = [
    /** principal **/
    { path: 'inicio', component: PrincipalComponent },
    

    { path: '', pathMatch: 'full', redirectTo: 'inicio' },
    { path: '**', pathMatch: 'full', redirectTo: 'inicio' }
];



