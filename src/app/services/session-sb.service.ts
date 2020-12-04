import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {User} from "../models/user";
import {shareReplay} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SessionSbService {

  public readonly BACKEND_AUTH_URL = "http://localhost:8080/authenticate"
  public currentUserName: string = null;

  public readonly BS_TOKEN_NAME = "QM_SB_AUTH_TOKEN";

  constructor(public http: HttpClient) {

  }

  /**
   * Sign in as
   * @param email
   * @param password
   */
  public signIn(email: string, password: string): Observable<any> {
    console.log('login ' + email + '\n' + password);
    let signInResponse = this.http.post<HttpResponse<User>>(this.BACKEND_AUTH_URL + "/login", {
        email: email,
        password: password
      },
      {observe: "response"}).pipe(shareReplay(1));

    signInResponse
      .subscribe((response) => {
        console.log(response);
      this.saveTokenIntoSessionStorage(
        response.headers.get("Authorization"),
        ((response.body as unknown) as User).name
      );
    },error => {
        console.log(error);
        this.saveTokenIntoSessionStorage(null, null);
      })
    return signInResponse;
  }

  public signOut(){
    this.saveTokenIntoSessionStorage(null,null);
  }

  public isAuthenticated(): boolean {
    return this.currentUserName != null;
  }

  /**
   * To save to remove the session
   * @param token
   * @param uName
   */
  saveTokenIntoSessionStorage(token:string, uName?: string){
    let namedToken = token
    let oldSessionToken = sessionStorage.getItem(this.BS_TOKEN_NAME);
    if (namedToken == oldSessionToken) return;
    console.log("New token for "+ uName + ": " + token);
    if (token == null){
      this.currentUserName = null;
      let oldLocalToken = localStorage.getItem(this.BS_TOKEN_NAME);
      sessionStorage.removeItem(this.BS_TOKEN_NAME);
      if (oldSessionToken == oldLocalToken){
        localStorage.removeItem(this.BS_TOKEN_NAME);
      }
    }else {
      this.currentUserName = uName;
      sessionStorage.setItem(this.BS_TOKEN_NAME, namedToken+"|"+uName);
      localStorage.setItem(this.BS_TOKEN_NAME, namedToken+"|"+uName);
    }
  }

  /**
   * To get the JWT
   */
  getTokenFromSessionStorage():string{
    let token = sessionStorage.getItem(this.BS_TOKEN_NAME);
    if (token == null) {
      token = localStorage.getItem(this.BS_TOKEN_NAME);
      sessionStorage.setItem(this.BS_TOKEN_NAME, token);
      return null;
    }else{
      let tokenParts = token.split("|");
      this.currentUserName = tokenParts[1];
      return tokenParts[0];
    }
  }
}


