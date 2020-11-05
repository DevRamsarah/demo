import { Component, OnInit } from '@angular/core';
import gsap from 'gsap/all';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article/article.service';
import { ArticleData } from 'src/app/models/article.model';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private ArticleService: ArticleService) { }
  article = []
  ngOnInit(): void {

    const tl = gsap.timeline({ defaults: { ease: "power1.out" } });

    tl.to(".text", { y: "0%", duration: 1, stagger: 0.25 });
    tl.to(".slider", { y: "-100%", duration: 1.5, delay: 0.5 });
    tl.to(".intro", { y: "-100%", duration: 1 }, "-=1");
    tl.fromTo("nav", { opacity: 0 }, { opacity: 1, duration: 1 });
    tl.fromTo(".big-text", { opacity: 0 }, { opacity: 1, duration: 1 }, "-=1");

    this.ArticleService.getArticles().subscribe(
      (data: Array<ArticleData>) => {
        data.forEach((art) => {
          this.article.push(art)
        })
        console.log(this.article)
      });
  }


}
