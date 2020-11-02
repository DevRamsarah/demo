import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './pages/login/login.component';
import { BullyingComponent } from './pages/bullying/bullying.component';
import { ArticleComponent } from './pages/article/article.component';
import { HeadlineComponent } from './pages/headline/headline.component';
import { FeedsComponent } from './pages/feeds/feeds.component';
import { UserComponent } from './pages/user/user.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/homepage',
    pathMatch: 'full'
  },
  {
    path: 'homepage',
    component: HomepageComponent
  },
  {
    path: 'feeds',
    component: FeedsComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'type',
    component: BullyingComponent
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'article',
    component: ArticleComponent
  }, {
    path: 'headline',
    component: HeadlineComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
