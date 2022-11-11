import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  //form group
  depositForm = this.formBuilder.group({
    amount: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
  })

  withdrawForm = this.formBuilder.group({
    amount: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
  })
  // dataService: any;
  acno: any;
  pswd: any;
  
  user:any;

  constructor(private formBuilder: FormBuilder,private dataService:DataService, private router:Router) { }

  ngOnInit(): void {
    
    if(!localStorage.getItem('token')){
      alert('Please Login')
      this.router.navigateByUrl('')
    }
    
      this.user= JSON.parse(localStorage.getItem('currentUser') || '')
    
    
  }



  deposit() {
    var acno = this.depositForm.value.acno
    var pswd = this.depositForm.value.pswd
    var amount = this.depositForm.value.amount

    if (this.depositForm.valid) {

      
      this.dataService.deposit(acno,pswd,amount)
      .subscribe((result:any)=>{
        alert(result.message)
      },
      result=>{
        alert(result.error.message)
      })
      


    } else {
      alert('Invalid form')
    }


  }

  withdraw() {
    var acno = this.withdrawForm.value.acno
    var pswd = this.withdrawForm.value.pswd
    var amount = this.withdrawForm.value.amount

    if (this.withdrawForm.valid) {
     this.dataService.withdraw(acno,pswd,amount)
     .subscribe((result:any)=>{
      alert(result.message)
    },
    result=>{
      alert(result.error.message)
    })
    } else {
      alert('Invalid form')
    }

  }


  logout() {
    localStorage.removeItem('currentAcno')
    localStorage.removeItem('currentUser')
    localStorage.removeItem('token')
    this.router.navigateByUrl('')

  }

  deleteAcc(){
    this.acno= JSON.parse(localStorage.getItem('currentAcno')  || '')
  }


  cancel(){
    this.acno=''
  }

  delete(event:any){
    
    this.dataService.deleteAcc(event)
    .subscribe((result:any)=>{
      alert(result.message)
      this.logout()
    },
    result=>{
      alert(result.error.message)
    })
  }
}
