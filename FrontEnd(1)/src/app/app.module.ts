import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { AllBlogsComponent } from './all-blogs/all-blogs.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { MyBlogsComponent } from './my-blogs/my-blogs.component';
import { ViewBlogComponent } from './view-blog/view-blog.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { BlogCardComponent } from './blog-card/blog-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Shared } from './Services/shared.service';
import { Auth, Crude } from './Services/auth_crud.service';
import { HttpClientModule } from '@angular/common/http';
import { SearchBlogComponent } from './search-blog/search-blog.component';

const appRoutes: Routes = [
  {
    path: 'My-Blogs',
    component: MyBlogsComponent,
  },
  {
    path: 'All-Blogs',
    component: AllBlogsComponent,
  },
  {
    path: 'Create-Blog',
    component: CreateBlogComponent,
  },
  {
    path: 'Edit-Blogs',
    component: CreateBlogComponent,
  },
  {
    path: 'View-Blog',
    component: ViewBlogComponent,
  },
  {
    path: 'Search-Blog/:ran',
    component: SearchBlogComponent,
  },
];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AllBlogsComponent,
    CreateBlogComponent,
    MyBlogsComponent,
    ViewBlogComponent,
    BlogCardComponent,
    SearchBlogComponent,
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [Shared, Auth, Crude],
  bootstrap: [AppComponent],
})
export class AppModule {}
