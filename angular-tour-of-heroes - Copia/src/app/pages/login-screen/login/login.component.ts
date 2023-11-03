import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user:string = "";
  pass:string = "";
  messageLogin:string = "";

  buttonLogin():void {
    if (this.user == "admin" && this.pass == "admin") {
      this.messageLogin = ""
    } else {
      this.messageLogin = "Credenciais invalidas!"
    }
  }

}
