import { Component, Input, OnInit } from '@angular/core';
import { Shared } from '../Services/shared.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.css'],
})
export class BlogCardComponent implements OnInit {
  @Input()
  blog: any;
  
  constructor(private shared:Shared,private router: Router)
  {
   
  }

  ngOnInit(): void {
    // console.log("IN BLOG-Card ts ",this.blog);
  }
  readBlog(_id:number) {
    this.shared.blog_id = _id;
    this.router.navigate(['/View-Blog']);
  }

 
}
