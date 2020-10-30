import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserData } from 'src/app/models/user.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  displayedColumns: string[] = [
    'UserID',
    'Email',
    'LastName',
    'FirstName',
    'UserName',
    'Gender',
  ];
  dataSource: MatTableDataSource<UserData>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private userService: UserService) { }


  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (data: Array<UserData>) => {
        this.dataSource = new MatTableDataSource(data)
      });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

}
