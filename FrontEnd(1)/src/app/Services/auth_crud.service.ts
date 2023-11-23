import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  // Already in providers array in app module. still getting error if decoarator not used. Why!
  providedIn: 'root',
})
export class Auth {
  constructor(private http: HttpClient) {}

  //   register(Credentials: {}): Observable<any> {
  //     return this.http.post('http://127.0.0.1:3000/user/register', {
  //       ...Credentials,
  //     });
  //   }
  register(Credentials: {}): Observable<any> {
    return this.http.post('http://127.0.0.1:3000/user/register', {
      ...Credentials,
    });
  }

  login(Credentials: {}): Observable<any> {
    return this.http.post('http://127.0.0.1:3000/user/login', {
      ...Credentials,
    });
  }
  JWTTokenKey: string = 'JWS';

  loggout() {
    localStorage.removeItem(this.JWTTokenKey);
  }
}

@Injectable({
  providedIn: 'root',
})
export class Crude {
  constructor(private http: HttpClient) {}

  getAllBlogs(token: HttpHeaders): Observable<any> {
    const options = {
      headers: token,
    };
    return this.http.get('http://127.0.0.1:3000/blogs/all_blogs', options);
  }

  getMyBlogs(token: HttpHeaders): Observable<any> {
    const options = {
      headers: token,
    };
    return this.http.get('http://127.0.0.1:3000/blogs/your_blogs', options);
  }

  createBlog(token: HttpHeaders, newBlog: {}): Observable<any> {
    const options = {
      headers: token,
    };
    return this.http.post(
      'http://127.0.0.1:3000/blogs/create_blog',
      { ...newBlog },
      options
    );
  }

  viewBlog(token: HttpHeaders, _id: number): Observable<any> {
    const options = {
      headers: token,
    };
    return this.http.get(`http://127.0.0.1:3000/blogs/find/${_id}`, options);
  }

  deleteBlog(token: HttpHeaders, _id: number): Observable<any> {
    const options = {
      headers: token,
    };
    return this.http.delete(
      `http://127.0.0.1:3000/blogs/delete_blog/${_id}`,
      options
    );
  }

  addComment(
    token: HttpHeaders,
    CI: { comment: string; _id: number }
  ): Observable<any> {
    const options = {
      headers: token,
    };
    return this.http.put(
      `http://127.0.0.1:3000/blogs/add_comment`,
      { ...CI },
      options
    );
  }

  searchBlogByTitle(
    token: HttpHeaders,
    title: string,
    tab: string
  ): Observable<any> {
    console.log('in crud service:- ', token, ' + ', title, ' ', tab);
    const options = {
      headers: token,
    };
    return this.http.get(
      `http://127.0.0.1:3000/blogs/search/${tab}/${title}`,
      options
    );
  }

  updateBlog(token: HttpHeaders, UpdatedBlog: {},id:number): Observable<any> {
    const options = {
      headers: token,
    };
    return this.http.put(
      `http://127.0.0.1:3000/blogs/update_blog/${id}`,
      { ...UpdatedBlog },
      options
    );
  }
}
