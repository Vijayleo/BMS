import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menucomponent',
  templateUrl: './menucomponent.component.html',
  styleUrls: ['./menucomponent.component.css']
})
export class MenucomponentComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  logout()
  {
    this.router.navigate(['login']);
  }

  applyLoan()
  {
    this.router.navigate(['applyLoan']);
  }
  updateProfile()
  {
    this.router.navigate(['updateProfile']);
  }

}
