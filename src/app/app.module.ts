import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { BookComponent } from './pages/book/book.component';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './pages/login/login.component';
import { BullyingComponent } from './pages/bullying/bullying.component';
import { ArticleComponent } from './pages/article/article.component';
import { HeadlineComponent } from './pages/headline/headline.component';
import { FeedsComponent } from './pages/feeds/feeds.component';
import { UserComponent } from './pages/user/user.component';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CustomMaterialModule } from './material.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomepageComponent,
    BookComponent,
    AboutComponent,
    LoginComponent,
    BullyingComponent,
    ArticleComponent,
    HeadlineComponent,
    FeedsComponent,
    UserComponent
  ],
  imports: [
    MDBBootstrapModule.forRoot(),
    CustomMaterialModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    MatTableModule,
    NoopAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
