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

  addPostForm = new FormGroup({
    CategoryID: new FormControl('', [Validators.required]),
    PostDes: new FormControl('', [Validators.required]),


  });
  editPostForm = new FormGroup({
    PostID: new FormControl('', [Validators.required]),
    CategoryID: new FormControl('', [Validators.required]),
    PostDes: new FormControl('', [Validators.required]),


  });

  displayedColumns: string[] = [
    "PostID",
    "UserID",
    "PostDes",
    "Current_Time",
    "CategoryID",
    "Like",
    "Dislike",
    "delete"


  ];
  dataSource: MatTableDataSource<PostData>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  row = {
    PostID: "",
    CategoryID: "",
    PostDes: ""
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
  addPost(): void {
    const CategoryID = this.addPostForm.value.CategoryID;
    const PostDes = this.addPostForm.value.PostDes;
    const UserID = localStorage.getItem('UserID');
    const Headlines = false;
    const Current_Time = new Date().toISOString().substr(0, 10) + 'T' + '00:00:00';
    const Like = 0;
    const Dislike = 0;

    this.PostService.addPost(UserID, PostDes, Headlines, Current_Time, CategoryID, Like, Dislike).subscribe(
      (data) => {
        location.reload()
      },
      (err) => {
        console.error("Error")
      }
    );
  }

  editPost(row): void {
    //   const id = this.editCategoryForm.value.CategoryID == "" ? row.CategoryID : this.editCategoryForm.value.CategoryID;
    //   const CategoryID = this.editCategoryForm.value.CategoryID == "" ? row.CategoryID : this.editCategoryForm.value.CategoryID;
    //   const PostDes = this.editCategoryForm.value.PostDes == "" ? row.PostDes : this.editCategoryForm.value.PostDes;

    //   this.PostService.editCategory(
    //     id,
    //     CategoryID,
    //     PostDes,

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
  }
  delete(id): void {

    this.PostService.delete(id
    ).subscribe(
      (data) => {
        location.reload()
      },
      (err) => {
        console.error("Error")
      }
    );
  }


}
