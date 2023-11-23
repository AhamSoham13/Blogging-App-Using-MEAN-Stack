import { Component, ViewChild, OnInit } from '@angular/core';
import { Auth, Crude } from '../Services/auth_crud.service';
import { Shared } from '../Services/shared.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css'],
})
export class CreateBlogComponent implements OnInit {
  constructor(
    private auth: Auth,
    private crude: Crude,
    private router: Router,
    private shared: Shared // private cdr: ChangeDetectorRef
  ) {}

  reactiveForm: FormGroup = new FormGroup({}); // since I dont want to turn off strict mode
  blog: any;
  // newblog: { title: string; body: string } = { title: '', body: '' };
  @ViewChild('createblog') createblog!: NgForm; // for clearing
  token = localStorage.getItem(this.auth.JWTTokenKey);
  header = new HttpHeaders({ Authorization: `Bearer ${this.token}` });
  FormModeCreate = this.shared.FormMode === 'create';

  retriveBlog() {
    this.crude.viewBlog(this.header, this.shared.blog_id).subscribe({
      next: (res) => {
        console.log(res);
        this.blog = res.blog;
        console.log('createblog/retrieveblog:- ', this.blog.title);
        if (this.shared.FormMode === 'update') {
          this.reactiveForm.patchValue({
            title: this.blog.title,
            body: this.blog.body,
          });
        }

        // this.blog.title = "I changed . Can yo see?";
        // console.log("Changed title in create blog",this.blog.title);
      },
      error: (res) => {
        console.log(res);
      },
    });
  }

  ngOnInit(): void {
    this.retriveBlog();
    this.reactiveForm = new FormGroup({
      title: new FormControl(null),
      body: new FormControl(null),
    });
  }

  OnPublish(newblog: { title: string; body: string }) {
    // console.log("From Onpublish in create:- ",newblog.title, newblog.body);
    this.crude.createBlog(this.header, newblog).subscribe({
      next: (res) => {
        console.log(res);
        this.createblog.resetForm();
        alert('Blog Published Successfully !!');
      },
      error: (res) => {
        console.log(res);
      },
    });
  }
  OnUpdate(UpdatedBlog: { title: string; body: string }) {
    this.shared.FormMode = 'create';
    // api call
    this.crude
      .updateBlog(this.header, UpdatedBlog, this.shared.blog_id)
      .subscribe({
        next: (res) => {},
        error: (res) => {},
      });

    this.router.navigate(['/View-Blog']);
  }
}
