import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SobreNosComponent } from './sobre-nos/sobre-nos.component';
import { ServicosPageComponent } from './servicos-page/servicos-page.component';
import { SlidesShowComponent } from './components/public/slides-show/slides-show.component';
import { SidebarAdminComponent } from './components/public/sidebar-admin/sidebar-admin.component';

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
    path: 'sobre-nos',
    component: SobreNosComponent,
    title: 'Sobre nós',
  },
  // {
  //   path: '**',
  //   component: HomeComponent,
  //   title: 'Home page',
  // },
  {
    path: 'servicos',
    component: ServicosPageComponent,
    title: 'Serviços page',
  },
  {
    path: 'sidebar-admin',
    component: SidebarAdminComponent,
    title: 'Menu Admin',
  },
  {
    path: '**',
    component: HomeComponent,
    title: 'Home page',
  },
  // {
  //   path: 'details/:id',
  //   component: DetailsComponent,
  //   title: 'Home details',
  // },
  {
    path: 'slide',
    component: SlidesShowComponent,
    title: 'Slide Show',
  },
];
export default routeConfig;