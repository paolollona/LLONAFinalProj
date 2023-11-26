import { Injectable } from '@angular/core';
import { PostService } from './post.service';
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackEndService {

  constructor(private postService: PostService, private http: HttpClient) { }

  saveData() {
    const listOfPosts: Post[] = this.postService.getPost();
    this.http.put(
      'https://angular-6a4a8-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
      listOfPosts)
      .subscribe((res) => {
        console.log(res)
      })
  }
  fetchData(): Observable<Post[]> {
    return this.http.get<Post[]>(
      'https://angular-6a4a8-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json'
    ).pipe(tap((listOfPosts: Post[]) => {
        console.log(listOfPosts)

        listOfPosts.forEach(post => {
          if (!Array.isArray(post.comments)) (
            post.comments = []
          )
        });
        this.postService.setPosts(listOfPosts);
        this.postService.listChangedEvent.emit(listOfPosts);
      }));
  }
}
