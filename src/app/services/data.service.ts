import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const options={
  headers:new HttpHeaders()
}


@Injectable({
  providedIn: 'root'
})
export class DataService {




  constructor(private http:HttpClient) {
    
  }



  //register
  register(username: any, acno: any, password: any) {

    const body = {
      username,
      acno,
      password
    }
    
    return this.http.post('http://localhost:3000/register',body)
    
  }


  login(acno: any, pswd: any) {

    const body={
      acno,pswd
    }

    return this.http.post('http://localhost:3000/login',body)
   
  }


  deposit(acno: any, pswd: any, amt: any) {
    const body={
      acno,pswd,amt
    }

    return this.http.post('http://localhost:3000/deposit',body,this.getToken())
  }



  //to get token and attach to req header
  getToken(){
    //get token
    var token = JSON.parse(localStorage.getItem('token')||'') 

    //create request header
    let headers = new HttpHeaders()
    headers= headers.append('x-access-token',token)
    //function overloading
    options.headers=headers

    return options
  }


  withdraw(acno: any, pswd: any, amt: any) {
    const body={
      acno,pswd,amt
    }

    return this.http.post('http://localhost:3000/withdraw',body,this.getToken())
  }


  getTransaction(acno: any) {
    const body={
      acno
    }

    return this.http.post('http://localhost:3000/getTransaction',body,this.getToken())
  }


  deleteAcc(acno:any){
    //delete api
    return this.http.delete('http://localhost:3000/deleteAcc'+acno)
  }

  

}




