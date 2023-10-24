import { Injectable } from '@angular/core';
import { AxiosRequestConfig } from 'axios';
import axios from './api/axios';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor() {}

  private async axiosCall<T>(config: AxiosRequestConfig): Promise<T> {
    const { data } = await axios.request<T>(config);
    return data;
  }

  async getPosts() {
    return await this.axiosCall<any[]>({ url: '/posts' });
  }

  async addPosts(data: { text: string }) {
    return await this.axiosCall<any>({
      url: '/posts',
      method: 'post',
      data: data,
    });
  }
}
