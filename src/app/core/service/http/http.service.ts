import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HttpService {


  constructor(private http: HttpClient) { }

  httpGet(nextUrl) {
    return this.http.get(environment.baseUrl+'/'+nextUrl);
  }

  httpPost(nextUrl,body){
    return this.http.post(environment.baseUrl+'/'+nextUrl, body);
  }

  httpLogout(nextUrl,token){
    var httpOptions={
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization': token
      })
    };
    return this.http.post(environment.baseUrl+'/'+nextUrl,null, httpOptions);
  }

  httpPasswordUpdate(nextUrl, token, body) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': token
      })

    };
    
    return this.http.post(environment.baseUrl+"/"+nextUrl,this.getFormUrlEncoded(body),httpOptions)
  }
  getFormUrlEncoded(toConvert) {
    const formBody = [];
    for (const property in toConvert) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(toConvert[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
   }

   httpAddNote(nextUrl,token,body){
     var httpOptions={
       headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization':token
       })

     };
     return this.http.post(environment.baseUrl+'/'+nextUrl, this.getFormUrlEncoded(body), httpOptions)
   }

   httpGetNote(nextUrl,token){
    var httpOptions={
      headers: new HttpHeaders({
       'Content-Type': 'application/x-www-form-urlencoded',
       'Authorization':token
      })

    };
    return this.http.get(environment.baseUrl+'/'+nextUrl, httpOptions)
   }

   httpDeleteNote(nextUrl,body,token){
    var httpOptions={
      headers: new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization':token
      })

    };
    return this.http.post(environment.baseUrl+'/'+nextUrl, body, httpOptions)
   }

   httpUpdateNote(nextUrl,body,token){
    var httpOptions={
      headers: new HttpHeaders({
       'Content-Type': 'application/x-www-form-urlencoded',
       'Authorization':token
      })

    };
    return this.http.post(environment.baseUrl+'/'+nextUrl, this.getFormUrlEncoded(body), httpOptions)
   }

   httpArchiveNote(nextUrl,body,token){
    var httpOptions={
      headers: new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization':token
      })

    };
    return this.http.post(environment.baseUrl+'/'+nextUrl, body, httpOptions)
   }

   httpColorNote(nextUrl,body,token){
    var httpOptions={
      headers: new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization':token
      })

    };
    return this.http.post(environment.baseUrl+'/'+nextUrl, body, httpOptions)
   }
   httpAddLabel(nextUrl,body,token){
    var httpOptions={
      headers: new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization':token
      })

    };
    return this.http.post(environment.baseUrl+'/'+nextUrl, body, httpOptions)
   }

   httpGetLabel(nextUrl,token){
    var httpOptions={
      headers: new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization':token
      })

    };
    return this.http.get(environment.baseUrl+'/'+nextUrl, httpOptions)
   }

   httpDeleteLabel(nextUrl,token){
    var httpOptions={
      headers: new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization':token
      })

    };
    return this.http.delete(environment.baseUrl+'/'+nextUrl, httpOptions)
   }

   httpUpdateLabel(nextUrl,body,token){
    var httpOptions={
      headers: new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization':token
      })

    };
    return this.http.post(environment.baseUrl+'/'+nextUrl, body, httpOptions)
   }
   httpAddLabelToNotes(nextUrl,token,body){
    var httpOptions={
      headers: new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization':token
      })

    };
    return this.http.post(environment.baseUrl+'/'+nextUrl, body, httpOptions)
   }
   httpAddReminder(nextUrl,token,body){
    var httpOptions={
      headers: new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization':token
      })

    };
    return this.http.post(environment.baseUrl+'/'+nextUrl, body, httpOptions)
   }
   httpAddImage(nexturl,body,token){
    console.log(token);
    var httpOptions={
      headers:new HttpHeaders({
       
       'Authorization':token
      })
    };
    return this.http.post(environment.baseUrl+"/"+nexturl,body,httpOptions)
  }
}
