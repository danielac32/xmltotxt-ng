import { Routes } from '@angular/router';
//import {guardCheckGuard} from './auth/services/guard-check.guard'
//import { AuthGuard } from './auth/services/auth.guard';

export const routes: Routes = [
    {
        path: 'txt', 
        loadChildren: () => import('./txt/pages/pages.routes').then(m => m.TXT_ROUTES),
        //canActivate: [AuthGuard]
    }

    /*{
        path: 'articles',
        loadChildren: () => import('./articles/articles.routes').then(m => m.ARTICLES_ROUTES)
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./admin/admin.routes').then(m => m.ADMIN_ROUTES),
        canActivate: [AuthGuard]
    }*/
];