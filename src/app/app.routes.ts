import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Layout } from './pages/layout/layout';
import { Dashboard } from './pages/dashboard/dashboard';
import { PropertyType } from './pages/property-type/property-type';
import { Site } from './pages/site/site';
import { Booking } from './pages/booking/booking';

export const routes: Routes = [

{
    path:'',
    redirectTo:'login',
    pathMatch:'full'
},
{
path:'login',
component:Login
},
{
path:'',
component:Layout,
children:[
    {
        path:'dashboard',
        component:Dashboard
    },
     {
        path:'property-type',
        component:PropertyType
    },
      {
        path:'site-master',
        component:Site
    },
     {
        path:'booking',
        component:Booking,
        title:"Booking"
    }
]

}



];
