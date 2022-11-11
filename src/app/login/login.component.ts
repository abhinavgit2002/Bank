import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //property/variable 

  header = "Welcome to our Bank"
  dot = "..."
  accPlaceholder = "Account Please"

  acno = ""
  pswd = ""

  loginForm = this.formBuilder.group({

    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
  })


  constructor(private formBuilder: FormBuilder, private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
  }

  //user defined function
  acnoChange(event: any) {
    this.acno = event.target.value


  }
  pswdChange(event: any) {
    this.pswd = event.target.value

  }

  login() {
    var acno = this.loginForm.value.acno
    var pswd = this.loginForm.value.pswd


    if (this.loginForm.valid) {
      const result = this.dataService.login(acno, pswd)
        .subscribe(
          //status:200
          (result: any) => {
            localStorage.setItem('token', JSON.stringify(result.token))
            localStorage.setItem('currentUser', JSON.stringify(result.currentUser))
            localStorage.setItem('currentAcno', JSON.stringify(result.currentAcno))
            alert(result.message)
            this.router.navigateByUrl('dashboard')


          },
          result => {
            alert(result.error.message)
          })

    } else {
      alert('Invalid form')
    }

  }
}

  
