import { Component, OnInit } from '@angular/core';
// import { NgxPaginationModule } from 'ngx-pagination/public-api';
import { Auth, Crude } from '../Services/auth_crud.service';
import { Shared } from '../Services/shared.service';
import {  HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-all-blogs',
  templateUrl: './all-blogs.component.html',
  styleUrls: ['./all-blogs.component.css'],
})
export class AllBlogsComponent implements OnInit {
  blogs: any[] = [];
  p: number = 1;
  display = this.shared.LoginStatus;
    constructor(private crude: Crude, private auth: Auth, private shared:Shared) {
    // for (let i = 1; i <= 50; i++) {
    //   this.blogs.push(i);
    // }
  }
  token = localStorage.getItem(this.auth.JWTTokenKey);
  header = new HttpHeaders({ Authorization: `Bearer ${this.token}` });
  getAllBlogs() {
    this.crude.getAllBlogs(this.header).subscribe({
      next: (res) => {
        //console.log(res);
        this.blogs = res.blogs;
        //console.log("blog array from my-component.ts:- ", this.blogs);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  ngOnInit(): void {
    console.log("I am ckicked in ngoninit all-blogs");
    this.getAllBlogs();
  }


}
