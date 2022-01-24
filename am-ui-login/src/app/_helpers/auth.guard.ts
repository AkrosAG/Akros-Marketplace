import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router'
import { Observable, Subject } from 'rxjs';
import { AuthStore } from '../_services/auth.services';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

    constructor(private auth: AuthStore, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        
        return this.checkLogin(state);

    }

        checkLogin(state: RouterStateSnapshot): Promise<boolean> {
            return new Promise((resolve, reject) => {
                this.auth.isLoggedIn$.subscribe(
                    
                    (res) => {
                                if(!res) 
                                {
                                    this.router.navigate(['/login']);
                                    console.log("user not logged in and trying to access ..." + state.url)
                                    reject(false);
                                }else
                                {
                                    resolve(true);
                                }

                          } 
                         );
          })
        }
        
 }