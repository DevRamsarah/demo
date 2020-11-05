
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
  addCategoryForm = new FormGroup({
    CategoryName: new FormControl('', [Validators.required]),
    CategoryDesc: new FormControl('', [Validators.required]),


  });
  editCategoryForm = new FormGroup({
    CategoryID: new FormControl('', [Validators.required]),
    CategoryName: new FormControl('', [Validators.required]),
    CategoryDesc: new FormControl('', [Validators.required]),


  });

  displayedColumns: string[] = [
    'CategoryID',
    'CategoryName',
    'CategoryDesc',
    'edit',
    'delete'


  ];
  dataSource: MatTableDataSource<TypeData>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  row = [];
  router: Router;


  constructor(private TypeService: TypeService) { }


  ngOnInit(): void {

    this.TypeService.getTypes().subscribe(
      (data: Array<TypeData>) => {
        this.dataSource = new MatTableDataSource(data)
      });

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  handleEdit(row): void {
    this.row = row;
    console.log(row)
  }
  addCategory(): void {
    const CategoryName = this.addCategoryForm.value.CategoryName;
    const CategoryDesc = this.addCategoryForm.value.CategoryDesc;

    this.TypeService.addType(
      CategoryName,
      CategoryDesc,

    ).subscribe(
      (data) => {
        this.router.navigate(['/Category']);
      },
      (err) => {
        console.error("Error")
      }
    );
  }

  editCategory(row): void {
    const id = this.editCategoryForm.value.CategoryID == "" ? row.CategoryID : this.editCategoryForm.value.CategoryID;
    const CategoryName = this.editCategoryForm.value.CategoryName == "" ? row.CategoryName : this.editCategoryForm.value.CategoryName;
    const CategoryDesc = this.editCategoryForm.value.CategoryDesc == "" ? row.CategoryDesc : this.editCategoryForm.value.CategoryDesc;

    this.TypeService.editCategory(
      id,
      CategoryName,
      CategoryDesc,

    ).subscribe(
      (data) => {
        this.router.navigate(['/Category']);
      },
      (err) => {
        console.error("Error")
      }
    );
  }
  delete(id): void {

    this.TypeService.delete(id
    ).subscribe(
      (data) => {
        this.router.navigate(['/Category']);
      },
      (err) => {
        console.error("Error")
      }
    );
  }



}
