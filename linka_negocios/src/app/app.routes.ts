import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ServicosPageComponent } from './servicos-page/servicos-page.component';

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
    {
      path: 'servicos',
      component: ServicosPageComponent,
      title: 'Servicos page',
    },
    // {
    //   path: 'details/:id',
    //   component: DetailsComponent,
    //   title: 'Home details',
    // },
  ];
  export default routeConfig;