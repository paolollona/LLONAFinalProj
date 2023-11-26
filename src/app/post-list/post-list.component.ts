import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { BackEndService } from '../back-end.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  listOfPosts: Post[] = [

  ];
  constructor(
    private postService: PostService, private backendService: BackEndService
  ) { }

  ngOnInit(): void {
    this.listOfPosts = this.postService.getPost();
  
    this.backendService.fetchData().subscribe((posts) => {
      this.listOfPosts.push(...posts);
    
    });
  }
  



}
