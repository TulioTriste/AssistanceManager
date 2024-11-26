import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recoverpass',
  templateUrl: './recoverpass.page.html',
  styleUrls: ['./recoverpass.page.scss'],
})
export class RecoverpassPage implements OnInit {

  view: boolean = true;
  oldEmail: string = '';
  createdCode: string = '';

  constructor() { }

  ngOnInit() { }

  getEmailEmitted(variable: string) {
    this.oldEmail = variable;
    console.log(variable); 
  }

  getCodeEmitted(variable: string) {
    this.createdCode = variable;
    this.view = false;
    console.log(variable);
  }
}
