import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/Post/Post.service';
import { PostData } from 'src/app/models/post.model';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})
export class FeedsComponent implements OnInit {

  constructor(private PostService: PostService) { }

  ngOnInit(): void {
    this.PostService.getPosts().subscribe(
      (data: Array<PostData>) => {

      });
  }

}
