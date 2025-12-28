import { Routes } from '@angular/router';
import { ClientLayoutComponent } from './layouts/client-layout/client-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { NotfoundComponent } from './clientComponents/notfound/notfound.component';
import { HomeComponent } from './clientComponents/home/home.component';
import { ToursComponent } from './clientComponents/tours/tours.component';
import { TransferComponent } from './clientComponents/transfer/transfer.component';
import { DestnationsComponent } from './clientComponents/destnations/destnations.component';
import { FaqComponent } from './clientComponents/faq/faq.component';
import { ServicesComponent } from './clientComponents/services/services.component';
import { LoginComponent } from './adminCompoents/login/login.component';
import { UsersComponent } from './adminCompoents/users/users.component';
import { RegisterComponent } from './adminCompoents/register/register.component';
import { DashboardComponent } from './adminCompoents/dashboard/dashboard.component';
import { TOurDetailComponent } from './clientComponents/tour-detail/tour-detail.component';
import { TransfersDetailComponent } from './clientComponents/transfers-detail/transfers-detail.component';
import { DesntationDetailComponent } from './clientComponents/desntation-detail/desntation-detail.component';
import { CategoryTourDetailComponent } from './clientComponents/category-tour-detail/category-tour-detail.component';
import { ToursAdComponent } from './adminCompoents/tours-ad/tours-ad.component';
import { EmailAdComponent } from './adminCompoents/email-ad/email-ad.component';
import { CategorytourAdComponent } from './adminCompoents/categorytour-ad/categorytour-ad.component';
import { DestnationAdComponent } from './adminCompoents/destnation-ad/destnation-ad.component';
import { TrasnfersAdComponent } from './adminCompoents/trasnfers-ad/trasnfers-ad.component';
import { CreateTourComponent } from './adminCompoents/create-tour/create-tour.component';
import { UpdateTourComponent } from './adminCompoents/update-tour/update-tour.component';
import { CreateDestnaionsComponent } from './adminCompoents/create-destnaions/create-destnaions.component';
import { UpdateDestnaionsComponent } from './adminCompoents/update-destnaions/update-destnaions.component';
import { CreateCatTourComponent } from './adminCompoents/create-cat-tour/create-cat-tour.component';
import { UpdateCatTourComponent } from './adminCompoents/update-cat-tour/update-cat-tour.component';
import { CreateTransferComponent } from './adminCompoents/create-transfer/create-transfer.component';
import { UpdateTransferComponent } from './adminCompoents/update-transfer/update-transfer.component';
import { authGuardGuard } from './core/guards/auth-guard.guard';
import { AboutComponent } from './clientComponents/about/about.component';
import { ReviewsComponent } from './clientComponents/reviews/reviews.component';
import { BlogsComponent } from './clientComponents/blogs/blogs.component';
import { HurghadablogsComponent } from './clientComponents/hurghadablogs/hurghadablogs.component';
import { LuxorblogComponent } from './clientComponents/luxorblog/luxorblog.component';

export const routes: Routes = [
    {
        path: '',component:ClientLayoutComponent,
        children:[
            {path: '',redirectTo: 'home',pathMatch: 'full' },
            {path: 'home',component:HomeComponent,title: 'Home' },  
            {path: 'transfer',component:TransferComponent,title: 'Transfers' },
            {path: 'tourDetail/:slug',component:TOurDetailComponent,title: 'Tour Details' },
            {path: 'transferDetail/:slug',component:TransfersDetailComponent,title: 'Transfers Details' },
            {path: 'categrytourDetail/:slug',component:CategoryTourDetailComponent,title: 'Tours Category Details' },
            {path: 'reviews',component:ReviewsComponent,title: 'Reviews' },
            {path: 'hurghadaBlog',component:HurghadablogsComponent,title: 'Hurghada Blogs' },
            {path: 'luxorBlog',component:LuxorblogComponent,title: 'Luxor Blogs' },
            {path: 'blogs',component:BlogsComponent,title: 'Our Blogs' },
            {path: 'about',component:AboutComponent,title: 'About' },
        ] 
    },
    {
        path: 'admin',
        component: AdminLayoutComponent,
        children: [
          // صفحات غير محمية (Login / Register)
          { path: 'login', component: LoginComponent, title: 'Login' },
          { path: 'register', component: RegisterComponent, title: 'Register' },
      
          // صفحات Dashboard محمية بالـ guard
          { path: 'tours', component: ToursAdComponent, title: 'Tours Dashboard', canActivate: [] },// authGuardGuard
          { path: 'categorytour', component: CategorytourAdComponent, title: 'Category Tour Dashboard', canActivate: [] },
          { path: 'destnaions', component: DestnationAdComponent, title: 'Destnaions Dashboard', canActivate: [] },
          { path: 'transfers', component: TrasnfersAdComponent, title: 'Transfers Dashboard', canActivate: [] },
      
          { path: 'emails', component: EmailAdComponent, title: 'Emails', canActivate: [] },
          { path: 'users', component: UsersComponent, title: 'Users', canActivate: [] },
          { path: 'dashboard', component: DashboardComponent, title: 'Dashboard', canActivate: [] },
      
          // CRUD Tours محمية بالـ guard
          { path: 'tourCreate', component: CreateTourComponent, title: 'Admin Create a Tour', canActivate: [] },
          { path: 'tourUpdate/:id', component: UpdateTourComponent, title: 'Admin Update a Tour', canActivate: [] },
      
          // CRUD Destinations محمية بالـ guard
          { path: 'destnationCreate', component: CreateDestnaionsComponent, title: 'Admin Create a Destnation', canActivate: [] },
          { path: 'destnationUpdate/:id', component: UpdateDestnaionsComponent, title: 'Admin Update a Destnation', canActivate: [] },
      
          // CRUD Category Tours محمية بالـ guard
          { path: 'catTourCreate', component: CreateCatTourComponent, title: 'Admin Create a Category Tour', canActivate: [] },
          { path: 'catTourUpdate/:id', component: UpdateCatTourComponent, title: 'Admin Update a Category Tour', canActivate: [] },
      
          // CRUD Transfers محمية بالـ guard
          { path: 'transferCreate', component: CreateTransferComponent, title: 'Admin Create a Transfer', canActivate: [] },
          { path: 'transferUpdate/:id', component: UpdateTransferComponent, title: 'Admin Update a Transfer', canActivate: [] },
      
          // redirect افتراضي لأي /admin يذهب للـ dashboard
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      
          // صفحة not found داخل الـ admin
          { path: '**', redirectTo: 'dashboard' },
        ]
      }
      ,
    {
        path: '**',component:NotfoundComponent ,title: 'Not Found Page'
    }
];
