import { Component, OnInit, ViewChild } from '@angular/core';
import { PostService } from 'src/app/services/Post/Post.service';
import { PostData } from 'src/app/models/post.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-headline',
  templateUrl: './headline.component.html',
  styleUrls: ['./headline.component.css']
})
export class HeadlineComponent implements OnInit {

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
    "PostID",
    "UserID",
    "PostDes",
    "Current_Time",
    "CategoryID",
    "Like",
    "Dislike"


  ];
  dataSource: MatTableDataSource<PostData>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  row = {
    CategoryID: "",
    CategoryName: "",
    CategoryDesc: ""
  };
  router: Router;


  constructor(private PostService: PostService) { }


  ngOnInit(): void {

    this.PostService.getPosts().subscribe(
      (data: Array<PostData>) => {
        this.dataSource = new MatTableDataSource(data)

      });

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  handleEdit(row): void {
    this.row = row;
    console.log(row)
  }
  // addCategory(): void {
  //   const CategoryName = this.addCategoryForm.value.CategoryName;
  //   const CategoryDesc = this.addCategoryForm.value.CategoryDesc;

  //   this.PostService.addPost(
  //     CategoryName,
  //     CategoryDesc,

  //   ).subscribe(
  //     (data) => {
  //       this.router.navigate(['/Category']);
  //     },
  //     (err) => {
  //       console.error("Error")
  //     }
  //   );
  // }

  // editCategory(row): void {
  //   const id = this.editCategoryForm.value.CategoryID == "" ? row.CategoryID : this.editCategoryForm.value.CategoryID;
  //   const CategoryName = this.editCategoryForm.value.CategoryName == "" ? row.CategoryName : this.editCategoryForm.value.CategoryName;
  //   const CategoryDesc = this.editCategoryForm.value.CategoryDesc == "" ? row.CategoryDesc : this.editCategoryForm.value.CategoryDesc;

  //   this.PostService.editCategory(
  //     id,
  //     CategoryName,
  //     CategoryDesc,

  //   ).subscribe(
  //     (data) => {
  //       this.router.navigate(['/Category']);
  //     },
  //     (err) => {
  //       console.error("Error")
  //     }
  //   );
  // }
  // delete(id): void {

  //   this.PostService.delete(id
  //   ).subscribe(
  //     (data) => {
  //       this.router.navigate(['/Category']);
  //     },
  //     (err) => {
  //       console.error("Error")
  //     }
  //   );
  // }



}
