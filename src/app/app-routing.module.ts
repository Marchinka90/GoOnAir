import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/not-found/not-found.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/flights'
    },
    {
        path: 'flights',
        loadChildren: () => import('./flight/flight.module').then(m => m.FlightModule)
    },
    {
        path: 'user',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule)
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
