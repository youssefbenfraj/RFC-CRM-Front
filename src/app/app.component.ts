import { Component, Renderer2, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'RFC Support';

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  
}
