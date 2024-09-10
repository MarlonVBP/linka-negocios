import { Routes } from '@angular/router';
import { HomeComponent } from './pages/public/home/home.component';
import { LoginComponent } from './pages/admin/login/login.component';
import { SobreNosComponent } from './pages/public/sobre-nos/sobre-nos.component';
import { ServicosPageComponent } from './pages/public/servicos-page/servicos-page.component';
import { SlidesShowComponent } from './components/public/slides-show/slides-show.component';
import { SidebarAdminComponent } from './components/public/sidebar-admin/sidebar-admin.component';
import { CreatePostComponent } from './pages/admin/create-post/create-post.component';
import { ContatoComponent } from './pages/public/contato/contato.component';
import { BlogPostsAdminComponent } from './pages/admin/blog-posts-admin/blog-posts-admin.component';
import { DownloadsComponent } from './pages/public/downloads/downloads.component';
import { InsightsComponent } from './pages/public/insights/insights.component';
import { InsightsListPostComponent } from './pages/public/insights-list-post/insights-list-post.component';
import { ServicosComponent } from './pages/admin/servicos/servicos.component';
import { ListarContatosComponent } from './pages/admin/listar-contatos/listar-contatos.component';
import { PerguntasComponent } from './pages/admin/perguntas/perguntas.component';
import { authGuard } from './_guards/auth.guard';
import { SignUpComponent } from './pages/admin/sign-up/sign-up.component';
import { AdminHomeComponent } from './pages/admin/admin-home/admin-home.component';
import { ComentariosComponent } from './pages/admin/comentarios/comentarios.component';
import { PerfilAdminComponent } from './pages/admin/perfil-admin/perfil-admin.component';
import { CriarProdutoComponent } from './pages/admin/criar-produto/criar-produto.component';
import { ListarProdutosComponent } from './pages/public/listar-produtos/listar-produtos.component';
import { ListaProdutosComponent } from './pages/admin/lista-produtos/lista-produtos.component';
import { MotivosComponent } from './pages/admin/motivos/motivos.component';
import { PrivacyPoliciesComponent } from './pages/public/privacy-policies/privacy-policies.component';
import { CreateTagsComponent } from './pages/admin/create-tags/create-tags.component';
import { TermosDeUsoComponent } from './pages/public/termos-de-uso/termos-de-uso.component';
import { CasosDeSucessoComponent } from './pages/admin/casos-de-sucesso/casos-de-sucesso.component';

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
  {
    path: 'sidebar-admin',
    component: SidebarAdminComponent,
    title: 'Menu Admin',
  },
  {
    path: 'slide',
    component: SlidesShowComponent,
    title: 'Slide Show',
  },
  {
    path: 'lista-produtos',
    component: ListarProdutosComponent,
    title: 'Produtos',
  },
  {
    path: 'downloads/:id',
    component: DownloadsComponent,
    title: 'DownLoads Page',
  },
  {
    path: 'servicos',
    component: ServicosPageComponent,
    title: 'Serviços Page',
  },
  {
    path: 'motivos',
    component: MotivosComponent,
    title: 'Motivos',
  },
  {
    path: 'contato',
    component: ContatoComponent,
    title: 'Contato Page',
  },
  {
    path: 'insights',
    component: InsightsComponent,
    title: 'Insights Page',
  },
  {
    path: 'read-more/:id',
    component: InsightsListPostComponent,
    title: 'Read more',
  },
  {
    path: 'perguntas-faq',
    component: PerguntasComponent,
    title: 'Perguntas Page',
    canActivate: [authGuard]
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    title: 'Sing Up page',
    canActivate: [authGuard]
  },
  {
    path: 'creat-post',
    component: CreatePostComponent,
    title: 'Post',
    canActivate: [authGuard]
  },
  {
    path: 'postsAdmin',
    component: BlogPostsAdminComponent,
    title: 'Posts',
    canActivate: [authGuard]
  },
  {
    path: 'creat-servicos',
    component: ServicosComponent,
    title: 'Criar serviço',
    canActivate: [authGuard]
  },
  {
    path: 'creat-produtos',
    component: CriarProdutoComponent,
    title: 'Criar produto',
    canActivate: [authGuard]
  },
  {
    path: 'perfil',
    component: PerfilAdminComponent,
    title: 'perfil',
    canActivate: [authGuard]
  },
  {
    path: 'listar-contatos',
    component: ListarContatosComponent,
    title: 'Listar contatos',
    canActivate: [authGuard]
  },
  {
    path: 'listagem-produtos',
    component: ListaProdutosComponent,
    title: 'Listagem de Produtos',
  },
  {
    path: 'casos-de-sucesso',
    component: CasosDeSucessoComponent,
    title: 'Casos de sucesso',
  },
  {
    path: 'admin-home',
    component: AdminHomeComponent,
    title: 'Home',
    canActivate: [authGuard]
  },
  {
    path: 'comentarios-admin',
    component: ComentariosComponent,
    title: 'comentarios',
    canActivate: [authGuard]
  },
  {
    path: 'app-create-tags',
    component: CreateTagsComponent,
    title: 'Posts tags',
    canActivate: [authGuard]
  },
  {
    path: 'privacy-policies',
    component: PrivacyPoliciesComponent,
    title: 'Política de privacidade',
  },
  {
    path: 'termos-de-uso',
    component: TermosDeUsoComponent,
    title: 'Termos de Uso',
  },
  {
    path: '**',
    component: HomeComponent,
    title: 'Home page',
  },
];
export default routeConfig;
