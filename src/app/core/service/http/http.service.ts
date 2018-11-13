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
  httpRemoveReminder(nextUrl,token,body){
    var httpOptions={
      headers: new HttpHeaders({
       'Authorization':token
      })

    };
    return this.http.post(environment.baseUrl+'/'+nextUrl, body, httpOptions)
   }

   getData(name){
    return this.http.get(environment.baseUrl+"/"+name);
  }
  postData(name,body){
    console.log(body)
    return this.http.post(environment.baseUrl+"/"+name,body);
  }
  post(name,input,access_token){
    // console.log(input);
    // console.log(access_token)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': access_token
      })
    };
    // console.log(this.getFormUrlEncoded(input))
    return this.http.post(environment.baseUrl+name,this.getFormUrlEncoded(input),httpOptions)
  }

  get(name,token){
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': token
    })
  }
    return this.http.get(environment.baseUrl + "/" + name,httpOptions);
  }

postDel(name, input, access_token){
 
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': access_token
    })
  };
  console.log(access_token)

  return this.http.post(environment.baseUrl + "/" + name, input, httpOptions)
}
  addImage(name, input, access_token){
  const httpOptions = {
    headers: new HttpHeaders({
      
      'Authorization': access_token
    })
  };
  console.log(access_token)

  return this.http.post(environment.baseUrl+ "/" + name, input, httpOptions)
}
 NewPost(url,RequestBody,httpHeaders){
   return this.http.post(url, RequestBody, httpHeaders)
 }
 NewGet(url,httpHeaders){
   return this.http.get( url,  httpHeaders)
 }
  delete(url,httpHeaders) {
   
   
    return this.http.delete(url, httpHeaders)

  }

}
