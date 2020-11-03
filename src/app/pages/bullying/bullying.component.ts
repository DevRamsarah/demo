
import { Component, OnInit, ViewChild } from '@angular/core';
import { TypeService } from 'src/app/services/type/type.service';
import { TypeData } from 'src/app/models/type.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bullying',
  templateUrl: './bullying.component.html',
  styleUrls: ['./bullying.component.css']
})
export class BullyingComponent implements OnInit {

  displayedColumns: string[] = [
    'TypeID',
    'Title',
    'SubTitle',
    'Description',
    'Category',
    'Current_Time',
    'Headlines',
    'Slideshow'

  ];
  dataSource: MatTableDataSource<TypeData>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  addUserForm: FormGroup;

  constructor(private userService: TypeService) { }


  ngOnInit(): void {

    this.userService.getTypes().subscribe(
      (data: Array<TypeData>) => {
        this.dataSource = new MatTableDataSource(data)
      });

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }



}
