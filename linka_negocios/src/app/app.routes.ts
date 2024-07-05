import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import { LoginComponent } from './login/login.component';

export const routeConfig: Routes = [
    {
      path: '',
      component: HomeComponent,
      title: 'Home page',
    },
    {
      path: 'login',
      component: LoginComponent,
      title: 'Login page',
    },
    // {
    //   path: 'details/:id',
    //   component: DetailsComponent,
    //   title: 'Home details',
    // },
  ];
  export default routeConfig;