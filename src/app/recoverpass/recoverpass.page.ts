import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recoverpass',
  templateUrl: './recoverpass.page.html',
  styleUrls: ['./recoverpass.page.scss'],
})
export class RecoverpassPage implements OnInit {

  view: boolean = true;
  email: string = '';
  code: string = '';

  constructor() { }

  ngOnInit() { }

  onSubmitMain() {
    console.log(this.view);
  }

  getEmailEmitted(variable: string) {
    this.email = variable;
    console.log(variable); 
  }

  getCodeEmitted(variable: string) {
    this.code = variable;
    this.view = false;
    console.log(variable); 
  }
}
