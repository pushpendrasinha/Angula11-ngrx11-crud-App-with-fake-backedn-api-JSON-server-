import { Injectable } from "@angular/core";
import { HttpClient, HttpRequest } from '@angular/common/http';
import { User } from "../models/userModel";

const AUTH_URL = "http://localhost:8080/auth/";

@Injectable({
    providedIn: 'root'
})

export class AuthService{

    constructor (private http : HttpClient) { }

    // data:any;
    // accessToekn:any;

    register(user:User){
        return this.http.post(AUTH_URL + "signup", user );
    }

    login(user:User){
        return this.http.post(AUTH_URL + "login", user ).subscribe( (res) => {
        //     if(res.data.accessToken){
        //         localStorage.setItem("user", JSON.stringify(res.data));
        //     }
        //     return res.data;
        // });
    });
}

    logout() {
        localStorage.clear();
   };

}