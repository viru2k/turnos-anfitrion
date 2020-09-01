import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { ConexionService } from './conexion.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    usuario:User;
    constructor(private http: HttpClient, private conexionService: ConexionService) { }

    login(username: string, password: string) {
        console.log(this.conexionService.getURL_SERVICIOS()+'oauth/token');
       this.usuario = new User('','','','','',username,password,[]);
       console.log(this.usuario);
        return this.http.post<User>(this.conexionService.getURL_SERVICIOS()+'oauth/token',this.usuario);
           /*  .pipe(map(user => {
                // login successful if there's a jwt token in the response
                console.log('usuario: '+JSON.stringify(user));
              //  if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('userData', JSON.stringify(this.usuario));
                    localStorage.setItem('currentUser', JSON.stringify(user));
               // }

                return user;
            })); */
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('userData');
        localStorage.removeItem('error');
    }
}

