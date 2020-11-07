
import { Component, OnInit, ViewChild } from '@angular/core';
import { ArticleService } from 'src/app/services/article/article.service';
import { ArticleData } from 'src/app/models/article.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage'
import { finalize } from "rxjs/operators";
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
    Slideshow: new FormControl('', [Validators.required]),


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
    Slideshow: new FormControl('', [Validators.required]),
  });
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
  row = {
    ArticleID: "",
    Title: "",
    SubTitle: "",
    Description: "",
    Category: "",
    Current_Time: "",
    Headlines: "",
    Slideshow: ""

  };
  filePath: string
  imgSrc: string;
  selectedImage: any = null;
  img: string
  private _showClearButton: boolean;
  private _search: string;
  constructor(private ArticleService: ArticleService, private afStorage: AngularFireStorage) { }


  ngOnInit(): void {

    this.ArticleService.getArticles().subscribe(
      (data: Array<ArticleData>) => {
        this.dataSource = new MatTableDataSource(data)
      });

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }
  upload(event) {
    this.filePath = event.target.files[0]
  }
  uploadImage() {
    console.log(this.filePath[0])
    const fileRef = this.afStorage.ref(this.addArticleForm.value.Slideshow.slice(12));
    this.afStorage.upload(this.addArticleForm.value.Slideshow.slice(12), this.filePath).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          // formValue['imageUrl'] = url;
          this.img = url
          console.log(url)
        })
      })
    ).subscribe();

  }
  showPreview(event: any) {
    this.filePath = event.target.files[0]
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else {
      this.imgSrc = '../../../img/image_placeholder.jpg';
      this.selectedImage = null;
    }
  }
  handleEdit(row): void {
    this.row = row;
    var myPath = this.row.Slideshow;


    document.getElementById("img").innerHTML = "<img src='" + myPath + "' width='350px' height='250px'>";
    console.log(row)

  }
  applyFilter(event: Event): void {
    const filterValue: string = (event.target as HTMLInputElement).value;
    this._search = filterValue;
    this._showClearButton = true;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  addArticle(): void {
    this.uploadImage();
    const Current_Time = new Date().toISOString().substr(0, 10) + 'T' + '00:00:00';
    const Slideshow = this.imgSrc;
    const Title = this.addArticleForm.value.Title;
    const SubTitle = this.addArticleForm.value.SubTitle;
    const Description = this.addArticleForm.value.Description;
    const Category = this.addArticleForm.value.Category;
    const Headlines = this.addArticleForm.value.Headlines;
    console.log(Slideshow)
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
        location.reload();
      },
      (err) => {
        console.error("Error")
      }
    );
  }

  editArticle(row): void {

    const id = this.editArticleForm.value.ArticleID == "" ? row.ArticleID : this.editArticleForm.value.ArticleID;
    const Current_Time = row.Current_Time;
    const Slideshow = this.editArticleForm.value.Slideshow == "" ? row.Slideshow : this.uploadImage();
    const Title = this.editArticleForm.value.Title == "" ? row.Title : this.editArticleForm.value.Title;
    const SubTitle = this.editArticleForm.value.SubTitle == "" ? row.SubTitle : this.editArticleForm.value.SubTitle;
    const Description = this.editArticleForm.value.Description == "" ? row.Description : this.editArticleForm.value.Description;
    const Category = this.editArticleForm.value.Category == "" ? row.Category : this.editArticleForm.value.Category;
    const Headlines = this.editArticleForm.value.Headlines == "" ? row.Headlines : this.editArticleForm.value.Headlines;
    console.log(id,
      Title,
      SubTitle,
      Description,
      Category,
      Current_Time,
      Headlines,
      Slideshow)
    this.ArticleService.editArticle(
      id,
      Title,
      SubTitle,
      Description,
      Category,
      Current_Time,
      Headlines,
      Slideshow

    ).subscribe(
      (data) => {
        this.router.navigate(['Article']);
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
        location.reload();
      },
      (err) => {
        console.error("Error")
      }
    );
  }


}

