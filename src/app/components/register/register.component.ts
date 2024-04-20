import { Component, OnInit } from '@angular/core';
import { JwtService } from 'src/app/services/jwt.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/entities/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  
  creatingMode : boolean = true;
  userToModify : User = new User();

 
  constructor(
    private service: JwtService,
    private fb: FormBuilder,

  ) {
    // Initialize registerForm in the constructor
    this.registerForm = this.fb.group({

      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      mail: ['', [Validators.required]],
      role: ['', [Validators.required]],
      telNumber: ['', [Validators.required]],
      birthDay: ['', [Validators.required]],
      address: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    // No need to initialize registerForm here anymore
  }

  submitForm() {
     console.log(this.registerForm.value);
     this.service.register(this.registerForm.value).subscribe(
      ( Response ) => {
        
        alert("User Added Successfully");
        window.location.reload();
        console.log(Response)
        
      }
    )
   /* const newUser = {
      iduser : this.userToModify.idUser,
      firstName : this.userToModify.firstName,
      lastName : this.userToModify.lastName,
      password: this.userToModify.password,
      mail:this.userToModify.mail,
      telNumber:this.userToModify.telNumber,
      
    };
    
    this.service.register(newUser).subscribe(()=>{
      alert("User Added Successfully");
      window.location.reload();
    });
    */

   



  }
}
