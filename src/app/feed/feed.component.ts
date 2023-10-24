import { Component, OnInit } from '@angular/core';
import { QuotesService } from '../quotes.service';
import { PostsService } from '../posts.service';
import { FormBuilder, NgForm } from '@angular/forms';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styles: [],
})
export class FeedComponent implements OnInit {
  posts: any[] = [];
  quotes: { text: string; author: string }[] = [];
  loading: boolean = true;
  constructor(
    private api: PostsService,
    private quoteApi: QuotesService,
    private readonly formBuilder: FormBuilder
  ) {}

  async ngOnInit() {
    try {
      this.loading = true;
      const posts = await this.api.getPosts();
      const quotes = await this.quoteApi.getQuotes();
      console.log(quotes);
      if (posts && posts.length) this.posts = posts;
      if (quotes && quotes.length) this.quotes = quotes;
    } catch (err) {
      console.log(err);
    } finally {
      this.loading = false;
    }
  }

  async getPosts() {
    try {
      this.loading = true;
      const posts = await this.api.getPosts();
      if (posts && posts.length) this.posts = posts;
    } catch (err) {
      console.log(err);
    } finally {
      this.loading = false;
    }
  }

  async addPost(f: NgForm) {
    try {
      if (f.value) {
        const text = f.value.text;
        if (text) {
          const added = await this.api.addPosts({ text: text });
          if (added && !!added.id) {
            this.loading = true;
            await this.getPosts();
            this.loading = false;
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
}
