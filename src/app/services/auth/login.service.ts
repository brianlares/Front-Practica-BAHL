import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from './loginRequest';
import { Observable, throwError, catchError, BehaviorSubject, tap, of} from 'rxjs';
import { User } from './user';
import { SignUpRequest } from './signRequest';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<User> =new BehaviorSubject<User>({id:0, email:''});

  constructor(private http: HttpClient) { }

  /*login(credentials:LoginRequest):Observable<User>{
    return this.http.get<User>('././assets/data.json').pipe(
      tap( (userData: User) => {
        this.currentUserData.next(userData);
        this.currentUserLoginOn.next(true);
      }),
      catchError(this.handleError)
    );
  }*/

  login(credentials:LoginRequest):Observable<boolean>{

    const localUsers = localStorage.getItem('angular17users');

    if (localUsers != null)
    {
      const users = JSON.parse(localUsers);

      const isUserPresent = users.find((user: LoginRequest) => user.email == credentials.email && user.password == credentials.password);

      if (isUserPresent != undefined)
      {
        localStorage.setItem('loggedUser', JSON.stringify(isUserPresent));
        this.currentUserLoginOn.next(true);
        return of(true);
      }
      else
      {
        this.currentUserLoginOn.next(false);
        return of(false);
      }
    }
    else
    {
      this.currentUserLoginOn.next(false);
      return of(false);
    }
  }

  register(credentials:SignUpRequest):Observable<String>{

    const localUser = localStorage.getItem('angular17users');

    if (localUser != null)
    {
      const users = JSON.parse(localUser);

      users.push(credentials);
      localStorage.setItem('angular17users', JSON.stringify(users))
    }
    else
    {
      const users = [];
      users.push(credentials);
      localStorage.setItem('angular17users', JSON.stringify(users))
    }

    return of("Registration Success");
  }

  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('Se ha producio un error ', error.error);
    }
    else{
      console.error('Backend retornó el código de estado ', error.status, error.error);
    }
    return throwError(()=> new Error('Algo falló. Por favor intente nuevamente.'));
  }

  get userData():Observable<User>{
    return this.currentUserData.asObservable();
  }

  get userLoginOn(): Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }

}
