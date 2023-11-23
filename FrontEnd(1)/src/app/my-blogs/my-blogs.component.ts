
import { Component, OnInit } from '@angular/core';
import { Shared } from '../Services/shared.service';
import { Auth, Crude } from '../Services/auth_crud.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-my-blogs',
  templateUrl: './my-blogs.component.html',
  styleUrls: ['./my-blogs.component.css'],
})
export class MyBlogsComponent implements OnInit {
  blogs: [] = [];
  p: number = 1;
  display = this.shared.LoginStatus;
  constructor(private crude: Crude, private auth: Auth, private shared:Shared) {
    // for (let i = 1; i <= 50; i++) {
    //   this.blogs.push(i);
    // }
  }

  token = localStorage.getItem(this.auth.JWTTokenKey);
  header = new HttpHeaders({ Authorization: `Bearer ${this.token}` });
  getMyBlogs() {
    this.crude.getMyBlogs(this.header).subscribe({
      next: (res) => {
       // console.log(res);
        this.blogs = res.blogs;
        console.log('blog array from all-component.ts:- ', this.blogs);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  ngOnInit(): void {
    this.getMyBlogs();
  }
}
