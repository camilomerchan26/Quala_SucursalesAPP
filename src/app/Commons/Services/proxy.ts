import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';




@Injectable({
	providedIn: 'root'
  })
  export class Proxy {


    public _http: HttpClient;
	public relativeUrl!: string;
    public token!: string;

    constructor (http:HttpClient) {
        this._http = http;
    }

    execute( 
		     requestMethod:string,
			 token:string,
			 myAppUrl: string,
			 myApiUrl :string,
			 func:string,
			 input:any){

			let request :any;
			this.token = token;

			let headers = new HttpHeaders()

			       .set('Authorization', 'Bearer ' + token)
				   .set('Content-Type', 'application/json');
				   
		
			switch (requestMethod) {

					
				    case "POST":					   
					  
						this.relativeUrl = myAppUrl + myApiUrl + func;
						request = this._http.post(this.relativeUrl,input,{headers: headers});	

					break;
	  
					case "GET":
				
						this.relativeUrl = myAppUrl + myApiUrl + func;
						request = this._http.get(this.relativeUrl + input,{ headers: headers });

					break;
	  
					
					case "PUT":
					
						this.relativeUrl = myAppUrl + myApiUrl + func;
						request = this._http.put(this.relativeUrl + input,{ headers: headers});

					break;

					case "DELETE":
						
						this.relativeUrl = myAppUrl + myApiUrl + func;
						request = this._http.delete(this.relativeUrl + input,{ headers: headers});
					  
						break;

					default:
					
				  }
			   
			return request;
    }
}