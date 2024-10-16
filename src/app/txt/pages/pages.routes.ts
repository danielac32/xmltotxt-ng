import { Routes } from "@angular/router";

import {LayoutComponent} from './layout/layout.component'

//import {guardCheckGuard} from './auth/service/guard-check.guard'
//import { AuthGuard } from '../auth/services/auth.guard' //'./auth/service/auth.guard';

export const TXT_ROUTES: Routes = [
    {
        //path: '', component: LayoutComponent, children: [
        path: '', component: LayoutComponent, children: [
            //{ path: 'list', component: IndexComponent, canActivate: [AuthGuard]},
           
            //{ path: '', redirectTo: 'nuevo-ingreso', pathMatch: 'full' }
        ]
    }
];
