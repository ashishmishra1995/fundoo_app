import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {

    // modify request
    request = request.clone({
      setHeaders: {
        Authorization: `${localStorage.getItem('token')}`
      }
    });
   
   return next.handle(request)
	    .pipe(
	        tap(event => {
	          if (event instanceof HttpResponse) {
	             
	           
	            // http response status code
	        
	          }
	        }, error => {
	   			// http response status code
	        

	        })
        )
      };

}
