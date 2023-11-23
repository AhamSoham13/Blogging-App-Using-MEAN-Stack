import { Component ,OnInit, ViewChild} from '@angular/core';
import { Shared } from '../Services/shared.service';
import { Crude, Auth } from '../Services/auth_crud.service';
import { HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.css'],
})
export class ViewBlogComponent implements OnInit {
  // CI:{comment:string,_id:number}={comment:"",_id:1}
  DisplayCommentBox: boolean = false;
  comments: any[] = [1, 2, 3, 4, 5, 6];
  token = localStorage.getItem(this.auth.JWTTokenKey);
  header = new HttpHeaders({ Authorization: `Bearer ${this.token}` });
  blog: any;
  @ViewChild('postcomment') postcomment!: NgForm;
  constructor(
    private shared: Shared,
    private crude: Crude,
    private auth: Auth
  ) {
    // console.log(this.shared.blog_id);
    // this.crude.viewBlog(this.header, this.shared.blog_id).subscribe({
    //   next: (res) => {
    //     console.log(res);
    //     this.blog = res.blog;
    //   },
    //   error: (res) => {
    //     console.log(res);
    //   },
    // });
  }

  retriveBlog() {
    this.crude.viewBlog(this.header, this.shared.blog_id).subscribe({
      next: (res) => {
        console.log(res);
        this.blog = res.blog;
      },
      error: (res) => {
        console.log(res);
      },
    });
  }

  ngOnInit() {
   //template is rendered only after blog is retrieved which is async job. This is achieved using *ngif on very 1st tag. And when blog is retrieved , change detection cycle detects this change and re-renders template and since this time blog is not undefined, temlate is rendered successfully. 
    this.retriveBlog();
  }
  deleteBlog() {
    this.crude.deleteBlog(this.header, this.shared.blog_id).subscribe({
      next: (res) => {
        alert('Blog Deeleted Successfully!');
        console.log(res);
      },
      error: (res) => {
        console.log(res);
      },
    });
  }

  Tab: String = this.shared.RouterLink; //For buttons
  ShowComments = false;
  Loggedin = this.shared.LoginStatus; //display if loggedin

  ViewComments() {
    this.ShowComments = !this.ShowComments;
    
  }

  toggleCommentBox() {
    this.DisplayCommentBox = !this.DisplayCommentBox;
  }

  addComment(CI: { comment: string; _id: number }) {
    this.crude.addComment(this.header, CI).subscribe({
      next: (res) => {
        console.log("res in view-blog ts:- ", res);
        this.blog = res.added_comment;
      },
      error: (res) => {
        console.log(res);
      },
    });
  }

  onPosting(comment: string) {
    console.log("this is comment from view-blog onPosting method:- ",comment);
    const _id: number = this.shared.blog_id;
    const CI: { comment: string, _id: number } = { comment,_id  };
    
    this.addComment(CI);
    const modalElement = document.getElementById('docomment');
    if (modalElement) {
      modalElement.click();
    }
    this.postcomment.resetForm();
   // this.retriveBlog();
    //this.ViewComments();
    this.ShowComments = true;
  }
  onEdit()
  {
    this.shared.FormMode = "update";
    // routerLink = '../Edit-Blogs'; handled in form
    console.log("form mode in view blog on clicking edit:- ",this.shared.FormMode);
  }
}
