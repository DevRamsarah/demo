
import { Component, OnInit, ViewChild } from '@angular/core';
import { ArticleService } from 'src/app/services/article/article.service';
import { ArticleData } from 'src/app/models/article.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  addArticleForm = new FormGroup({
    ArticleName: new FormControl('', [Validators.required]),
    ArticleDesc: new FormControl('', [Validators.required]),
    Title: new FormControl('', [Validators.required]),
    SubTitle: new FormControl('', [Validators.required]),
    Description: new FormControl('', [Validators.required]),
    Category: new FormControl('', [Validators.required]),
    Headlines: new FormControl('', [Validators.required]),


  });
  editArticleForm = new FormGroup({
    ArticleID: new FormControl('', [Validators.required]),
    ArticleName: new FormControl('', [Validators.required]),
    ArticleDesc: new FormControl('', [Validators.required]),
    Title: new FormControl('', [Validators.required]),
    SubTitle: new FormControl('', [Validators.required]),
    Description: new FormControl('', [Validators.required]),
    Category: new FormControl('', [Validators.required]),
    Headlines: new FormControl('', [Validators.required]),

  });
  row = [];
  router: Router;

  displayedColumns: string[] = [
    'ArticleID',
    'Title',
    'SubTitle',
    'Description',
    'Category',
    'Headlines',
    'edit',
    'delete'

  ];
  dataSource: MatTableDataSource<ArticleData>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  addUserForm: FormGroup;

  constructor(private ArticleService: ArticleService) { }


  ngOnInit(): void {

    this.ArticleService.getArticles().subscribe(
      (data: Array<ArticleData>) => {
        this.dataSource = new MatTableDataSource(data)
      });

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  handleEdit(row): void {
    this.row = row;
    console.log(row)
  }
  addArticle(): void {
    const Current_Time = this.addArticleForm.value.Current_Time;
    const Slideshow = this.addArticleForm.value.Slideshow;
    const Title = this.addArticleForm.value.Title;
    const SubTitle = this.addArticleForm.value.SubTitle;
    const Description = this.addArticleForm.value.Description;
    const Category = this.addArticleForm.value.Category;
    const Headlines = this.addArticleForm.value.Headlines;

    this.ArticleService.addArticle(
      Title,
      SubTitle,
      Description,
      Category,
      Current_Time,
      Headlines,
      Slideshow,

    ).subscribe(
      (data) => {
        this.router.navigate(['/Article']);
      },
      (err) => {
        console.error("Error")
      }
    );
  }

  editArticle(row): void {
    const id = this.editArticleForm.value.ArticleID == "" ? row.ArticleID : this.editArticleForm.value.ArticleID;
    const Current_Time = this.editArticleForm.value.ArticleName == "" ? row.ArticleName : this.editArticleForm.value.ArticleName;
    const Slideshow = this.editArticleForm.value.ArticleDesc == "" ? row.ArticleDesc : this.editArticleForm.value.ArticleDesc;
    const Title = this.editArticleForm.value.Title;
    const SubTitle = this.editArticleForm.value.SubTitle;
    const Description = this.editArticleForm.value.Description;
    const Category = this.editArticleForm.value.Category;
    const Headlines = this.editArticleForm.value.Headlines;

    this.ArticleService.editArticle(
      id,
      Title,
      SubTitle,
      Description,
      Category,
      Current_Time,
      Headlines,
      Slideshow,

    ).subscribe(
      (data) => {
        this.router.navigate(['/Article']);
      },
      (err) => {
        console.error("Error")
      }
    );
  }
  delete(id): void {

    this.ArticleService.delete(id
    ).subscribe(
      (data) => {
        this.router.navigate(['/Article']);
      },
      (err) => {
        console.error("Error")
      }
    );
  }


}

