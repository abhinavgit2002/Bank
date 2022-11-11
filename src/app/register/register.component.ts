import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  router: any;

  //formgroup

  registerForm = this.formBuilder.group({
    uname: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    acno: ['',[Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ['',[Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
  })

  constructor(private formBuilder: FormBuilder, private dataService: DataService) { }

  ngOnInit(): void {
  }

  register() {
    var acno = this.registerForm.value.acno
    var uname = this.registerForm.value.uname
    var pswd = this.registerForm.value.pswd

    if (this.registerForm.valid) {

      this.dataService.register(uname, acno, pswd)
      .subscribe(
        (result:any)=>{
        alert(result.message)
        this.router.navigateByUrl('')
      },
      result=>{
        alert(result.error.message)
      }
      )

    }
      else {
        alert("Invalid form")
      }
    

  }

}

