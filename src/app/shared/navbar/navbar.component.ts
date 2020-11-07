import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  _role = "";
  _name = "";
  _log = false;
  loginForm = new FormGroup({
    Email: new FormControl('', [Validators.required]),
    Password: new FormControl('', [Validators.required]),


  });
  constructor(private userService: UserService) {
    this._role = localStorage.getItem('role');
    this._name = localStorage.getItem('username');
    this._log = false
  }

  ngOnInit(): void {

  }
  login() {

    this.userService.getUsers().subscribe(
      (data) => {
        data.forEach((user) => {
          if (user.Email === this.loginForm.value.Email && user.Password === this.loginForm.value.Password) {
            localStorage.setItem('username', user.UserName);
            localStorage.setItem('role', user.Role);
            localStorage.setItem('UserID', user.UserID);
            this._log = true
          } else {
            console.log('No result found');
          }
        });
      });

    var retrievedObject = localStorage.getItem('role');
    if (retrievedObject) { console.log(retrievedObject); console.log("log") } else { console.log("nnn") }
    location.reload()
  }
  SignOut() {
    localStorage.clear();
    this._log = false
    location.reload()

  }
}
