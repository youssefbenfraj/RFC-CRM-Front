import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from 'src/app/entities/role';
import { JwtService } from 'src/app/services/jwt.service';
import { UserService } from 'src/app/services/user.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  user: any;

  constructor(
    private service: JwtService,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private cdr: ChangeDetectorRef,
  ) {}

  triggerChangeDetection() {
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user");
    this.loginForm = this.fb.group({
      mail: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  submitFrom() {
    console.log(this.loginForm.value);
    
    this.service.login(this.loginForm.value).subscribe(
      (response) => {
        console.log(response);
        if (response.jwtToken !== null) {
          const jwtToken = response.jwtToken;
          localStorage.setItem('jwtToken', jwtToken);

          this.userService.retrieveByMail(this.loginForm.get('mail')?.value).subscribe(data => {
            this.user = data;
            console.log(this.user);
            localStorage.setItem('user', JSON.stringify(data));
            this.redirectUserByRole();
          });
        }
      }
    );
    this.triggerChangeDetection();
  }
  

  redirectUserByRole() {
    const userString = localStorage.getItem('user');
    console.log(userString);
    const user = userString ? JSON.parse(userString) : null;
    const role = user ? user.role : "";
    console.log(role);

    switch (role) {
      case "customer":
        this.router.navigate(['/user']);
        break;
      case "support":
        this.router.navigate(['/user']);
        break;
      case "admin":
        this.router.navigate(['/admin']);
        break;
      default:
        alert("User not found");
    }
  }
}
