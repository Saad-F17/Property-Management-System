import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  userForm: FormGroup = new FormGroup(
    {
      username: new FormControl('', [Validators.required]),
      password: new FormControl('')
    }
  )
  router= inject(Router)

onLogin(){
  const formValue= this.userForm.value;
  if(formValue.username=='admin'&& formValue.password=='112233')
{
  this.router.navigateByUrl('dashboard')
}
else{
  alert('wrong credentials')
}
}



}
