import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type':  'application/json'
//     // 'Authorization': 'my-auth-token'
//   })
// };

@Injectable({
  providedIn: 'root'
})
export class HttpService {


  configUrl = 'http://34.213.106.173/api';

  constructor(private http: HttpClient) { }

  httpGet(nextUrl) {
    return this.http.get(this.configUrl+'/'+nextUrl);
  }

  httpPost(nextUrl,body){
    return this.http.post(this.configUrl+'/'+nextUrl, body);
  }

  httpLogout(nextUrl,token){
    var httpOptions={
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization': token
      })
    };
    return this.http.post(this.configUrl+'/'+nextUrl,null, httpOptions);
  }

  httpPasswordUpdate(nextUrl, token, body) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': token
      })

    };
    
    return this.http.post(this.configUrl+"/"+nextUrl,this.getFormUrlEncoded(body),httpOptions)
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
     return this.http.post(this.configUrl+'/'+nextUrl, this.getFormUrlEncoded(body), httpOptions)
   }

   httpGetNote(nextUrl,token){
    var httpOptions={
      headers: new HttpHeaders({
       'Content-Type': 'application/x-www-form-urlencoded',
       'Authorization':token
      })

    };
    return this.http.get(this.configUrl+'/'+nextUrl, httpOptions)
   }

   httpDeleteNote(nextUrl,body,token){
    var httpOptions={
      headers: new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization':token
      })

    };
    return this.http.post(this.configUrl+'/'+nextUrl, body, httpOptions)
   }

   httpUpdateNote(nextUrl,body,token){
    var httpOptions={
      headers: new HttpHeaders({
       'Content-Type': 'application/x-www-form-urlencoded',
       'Authorization':token
      })

    };
    return this.http.post(this.configUrl+'/'+nextUrl, this.getFormUrlEncoded(body), httpOptions)
   }

   httpArchiveNote(nextUrl,body,token){
    var httpOptions={
      headers: new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization':token
      })

    };
    return this.http.post(this.configUrl+'/'+nextUrl, body, httpOptions)
   }

   httpColorNote(nextUrl,body,token){
    var httpOptions={
      headers: new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization':token
      })

    };
    return this.http.post(this.configUrl+'/'+nextUrl, body, httpOptions)
   }
   httpAddLabel(nextUrl,body,token){
    var httpOptions={
      headers: new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization':token
      })

    };
    return this.http.post(this.configUrl+'/'+nextUrl, body, httpOptions)
   }

   httpGetLabel(nextUrl,token){
    var httpOptions={
      headers: new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization':token
      })

    };
    return this.http.get(this.configUrl+'/'+nextUrl, httpOptions)
   }

   httpDeleteLabel(nextUrl,token){
    var httpOptions={
      headers: new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization':token
      })

    };
    return this.http.delete(this.configUrl+'/'+nextUrl, httpOptions)
   }

   httpUpdateLabel(nextUrl,body,token){
    var httpOptions={
      headers: new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization':token
      })

    };
    return this.http.post(this.configUrl+'/'+nextUrl, body, httpOptions)
   }
   httpAddLabelToNotes(nextUrl,token,body){
    var httpOptions={
      headers: new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization':token
      })

    };
    return this.http.post(this.configUrl+'/'+nextUrl, body, httpOptions)
   }
}
