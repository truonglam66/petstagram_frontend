import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';
import { toJSON, fromJSON, stringify } from 'flatted';
import * as Flatted from 'flatted';
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  host = environment.backEnd;
  constructor(private http: HttpClient) {
    const temp: any = null;
    // this.currentUserSubject = new BehaviorSubject<User>(
    //   localStorage.getItem('currentUser')
    //     ? Flatted.parse(localStorage.getItem('currentUser') || temp)
    //     : temp
    // );
    // this.currentUser = this.currentUserSubject.asObservable();

    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser') || temp)
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http
      .post(`${this.host}/auth/login`, { username, password })
      .pipe(
        map((user: any) => {
          // let result = fromJSON(user);
          let result = user;
          // result.enumData = JSON.parse(user.enumData)
          // store user details and jwt token in local storage to keep user logged in between page refreshes

          // localStorage.setItem(
          //   'currentUser',
          //   Flatted.stringify({ ...result, username })
          // );
          // this.currentUserSubject.next({ ...result, username } as User);

          localStorage.setItem(
            'currentUser',
            JSON.stringify({ ...user, username })
          );
          this.currentUserSubject.next({ ...user, username } as User);

          return result;
        })
      );
  }

  updatePassword(
    currentPassword: string,
    newPassword: string,
    confirmNewPassword: string
  ) {
    return this.http
      .post(`${this.host}/auth/update-password`, {
        currentPassword,
        newPassword,
        confirmNewPassword,
      })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    const temp: any = null;
    this.currentUserSubject.next(temp);
  }
}
