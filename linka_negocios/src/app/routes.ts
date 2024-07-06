import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import { SidebarClienteComponent } from './sidebar-cliente/sidebar-cliente.component';
import { FooterComponent } from './footer/footer.component';

const routeConfig: Routes = [
    {
      path: '',
      component: HomeComponent,
      title: 'Home page',
    },
    // {
    //   path: 'details/:id',
    //   component: DetailsComponent,
    //   title: 'Home details',
    // },
    {
      path: 'sidebar-cliente',
      component: SidebarClienteComponent,
      title: 'Menu Cliente',
    },
    {
      path: 'footer',
      component: FooterComponent,
      title: 'Footer',
    },
  ];
  export default routeConfig;