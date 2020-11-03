import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { UserData } from 'src/app/models/user.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  addUserForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    Password: new FormControl('', [Validators.required]),
    Age: new FormControl('', [Validators.required]),
    Gender: new FormControl('', [Validators.required]),
    FirstName: new FormControl('', [Validators.required]),
    LastName: new FormControl('', [Validators.required]),
    UserName: new FormControl('', [Validators.required]),
    Role: new FormControl('', [Validators.required]),

  });




  displayedColumns: string[] = [
    'UserID',
    'Email',
    'Password',
    'LastName',
    'FirstName',
    'Age',
    'Gender',
    'UserName',
    'Gender',
    'Role'
  ];
  dataSource: MatTableDataSource<UserData>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  router: Router;


  constructor(private userService: UserService) { }

  Email = document.getElementById("email");

  ngOnInit(): void {

    this.userService.getUsers().subscribe(
      (data: Array<UserData>) => {
        this.dataSource = new MatTableDataSource(data)
      });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  addUser(): void {

    const email = this.addUserForm.value.email;
    const Password = this.addUserForm.value.Password;
    const Age = this.addUserForm.value.Age;
    const Gender = this.addUserForm.value.Gender;
    const FirstName = this.addUserForm.value.FirstName;
    const LastName = this.addUserForm.value.LastName;
    const UserName = this.addUserForm.value.UserName;
    const Role = this.addUserForm.value.Role;
    this.userService.addUser(
      email,
      Password,
      LastName,
      FirstName,
      UserName,
      Age,
      Gender,
      Role
    ).subscribe(
      (data) => {
        this.router.navigate(['/User']);
      },
      (err) => {
        console.error("Error")
      }
    );
  }
}
