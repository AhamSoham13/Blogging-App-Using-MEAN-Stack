import { Component, OnInit } from '@angular/core';
import { Shared } from '../Services/shared.service';
import { Auth, Crude } from '../Services/auth_crud.service';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-blog',
  templateUrl: './search-blog.component.html',
  styleUrls: ['./search-blog.component.css'],
})
export class SearchBlogComponent implements OnInit {
  blogs: [] = [];
  p: number = 1;
  display = this.shared.LoginStatus;
  constructor(
    private crude: Crude,
    private auth: Auth,
    private shared: Shared,
    private route: ActivatedRoute
  ) {}

  token = localStorage.getItem(this.auth.JWTTokenKey);
  header = new HttpHeaders({ Authorization: `Bearer ${this.token}` });
   title = this.shared.searchTXT;
  tab = this.shared.RouterLink.toString();
  ngOnInit(): void {
    this.route.params.subscribe(() => {
        this.title = this.shared.searchTXT;
      console.log('In search component:- ', this.title);
        this.runSerach();
    }
    
    );
    
  }
  runSerach() {
    this.crude.searchBlogByTitle(this.header, this.title, this.tab).subscribe({
      next: (res) => {
        console.log(res);
        this.blogs = res.blog;
      },
      error: (res) => {
        console.log(res);
      },
    });
  }
}
