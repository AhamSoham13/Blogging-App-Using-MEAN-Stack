import { Component, ViewChild} from '@angular/core';
import { Shared } from '../Services/shared.service';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Auth } from '../Services/auth_crud.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(
    private shared: Shared,
    // private http: HttpClient,
    private auth: Auth,
    private router: Router,
    // private crude: Crude
  ) {}

  @ViewChild('LoginForm') LoginForm!: NgForm; // used to reset form
  @ViewChild('Signup') Signup!: NgForm; // used to reset form
  @ViewChild('search') search!: NgForm;
  Errror = false;
  toggleError() {
    this.Errror = !this.Errror;
  }
  loggedin = false;
  togglelog() {
    this.loggedin = !this.loggedin;
    this.shared.LoginStatus = !this.shared.LoginStatus;
  }

  ActiveTab: String = 'All-Blogs';
 
  RadioValue() {
    console.log('ActiveTAb= ' + this.ActiveTab);
  }

  forViewBlog(Tab: String) {
    this.shared.RouterLink = Tab;
    this.search.resetForm();
    // console.log(Tab);
  }
  // OnRegister(Credentials: {usernameS:String, emailS: String; passwordS: String }) {
  //   console.log(Credentials);
  //   this.http
  //     .post('http://127.0.0.1:3000/user/register', { ...Credentials })
  //     .subscribe((res) => {
  //       console.log(res);
  //     });
  // }
  //Depricated
  // OnRegister(Credentials: {
  //   usernameS: String;
  //   emailS: String;
  //   passwordS: String;
  // }) {
  //   console.log(Credentials);
  //   this.auth.register(Credentials).subscribe(
  //     (res) => {
  //       console.log(res);
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }

  OnRegister(Credentials: {
    usernameS: String;
    emailS: String;
    passwordS: String;
  }) {
    console.log(Credentials);
    this.auth.register(Credentials).subscribe({
      next: (res) => {
        alert('Account Created Successfully!!');
        console.log(res);

        const modalElement = document.getElementById('y');
        if (modalElement) {
          modalElement.click();
        }
        this.Signup.resetForm();
      },
      error: (err) => {
        console.log(err);
        alert('Account Creation Failed. Email Already Registered!');
      },
    });
  }

  OnLogin(Credentials: { emailL: String; passwordL: String }) {
    console.log(Credentials);
    // this.http.post('localhost://3000/user/register');
    this.auth.login(Credentials).subscribe({
      next: (res) => {
        console.log('Response got from login:- ', res);
        localStorage.setItem(this.auth.JWTTokenKey, res.token);
        this.togglelog();

        if (this.Errror) {
          // will make error false if we had a failed attempt before and errror was set to true
          
          this.toggleError();
          console.log('Errror= ', this.Errror);
        }
        //this.modalService.dismissAll();         // Didnt work
        const modalElement = document.getElementById('x');
        if (modalElement) {
          modalElement.click();
        }
        this.LoginForm.resetForm();
        this.router.navigate(['/All-Blogs']);
      },
      error: (err) => {
        if (!this.Errror) {
           this.toggleError();
        }
       
        console.log(err, 'Errror', this.Errror);
      },
    });
  }

  OnLoggedOut()
  {
    this.auth.loggout();
    console.log('After removal:', localStorage.getItem(this.auth.JWTTokenKey));
    this.router.navigate(['/']);
  }

  onModalClosed()
  {
    this.LoginForm.resetForm();
    this.Signup.resetForm();
    this.Errror = false;
  }

  onSearch(searchTXT:{title:string})
  {
    const uniqueId = new Date().getTime().toString();
    console.log("In header component onSearch  ", searchTXT);
    this.shared.searchTXT = searchTXT.title;
    console.log('searchTXT after research in header ', this.shared.searchTXT);
    this.router.navigate(['/Search-Blog', uniqueId]);
    // this.element = document.getElementById('se');
    
  }

  onUpload()
  {
    this.shared.FormMode = 'create';
  }


 
}
