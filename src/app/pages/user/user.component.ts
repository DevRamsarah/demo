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
  editUserForm = new FormGroup({
    UserID: new FormControl('', [Validators.required]),
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
    'Role',
    'edit',
    'delete'
  ];
  dataSource: MatTableDataSource<UserData>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  router: Router;

  row = {
    id: "",
    Age: "",
    Email: "",
    FirstName: "",
    Gender: "",
    LastName: "",
    Password: "",
    Role: "",
    UserID: "",
    UserName: ""
  };

  constructor(private userService: UserService) { }



  ngOnInit(): void {

    this.userService.getUsers().subscribe(
      (data: Array<UserData>) => {
        this.dataSource = new MatTableDataSource(data)

      });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  handleEdit(row): void {
    this.row = row;
    console.log(row)
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

  editUser(row): void {
    const id = this.editUserForm.value.UserID == "" ? row.UserID : this.editUserForm.value.UserID;
    const email = this.editUserForm.value.email == "" ? row.Email : this.editUserForm.value.email;
    const Password = this.editUserForm.value.Password == "" ? row.Password : this.editUserForm.value.Password;
    const Age = this.editUserForm.value.Age == "" ? row.Age : this.editUserForm.value.Age;
    const Gender = this.editUserForm.value.Gender == "" ? row.Gender : this.editUserForm.value.Gender;
    const FirstName = this.editUserForm.value.FirstName == "" ? row.FirstName : this.editUserForm.value.FirstName;
    const LastName = this.editUserForm.value.LastName == "" ? row.LastName : this.editUserForm.value.LastName;
    const UserName = this.editUserForm.value.UserName == "" ? row.UserName : this.editUserForm.value.UserName;
    const Role = this.editUserForm.value.Role == "" ? row.Role : this.editUserForm.value.Role;


    this.userService.editUser(
      id,
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
  delete(id): void {

    this.userService.delete(id
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
