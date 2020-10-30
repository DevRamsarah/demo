
import { Component, OnInit, ViewChild } from '@angular/core';
import { ArticleService } from 'src/app/services/article/article.service';
import { ArticleData } from 'src/app/models/article.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  displayedColumns: string[] = [
    'ArticleID',
    'Title',
    'SubTitle',
    'Description',
    'Category',
    'Current_Time',
    'Headlines',
    'Slideshow'

  ];
  dataSource: MatTableDataSource<ArticleData>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  addUserForm: FormGroup;

  constructor(private userService: ArticleService) { }


  ngOnInit(): void {

    this.userService.getArticles().subscribe(
      (data: Array<ArticleData>) => {
        this.dataSource = new MatTableDataSource(data)
      });

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


}
