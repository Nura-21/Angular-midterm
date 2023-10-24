import { Injectable } from '@angular/core';
import { AxiosRequestConfig } from 'axios';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class QuotesService {
  constructor() {}

  private async axiosCall<T>(config: AxiosRequestConfig): Promise<T> {
    const { data } = await axios
      .create({ baseURL: 'https://type.fit/api' })
      .request<T>(config);
    return data;
  }

  async getQuotes() {
    return await this.axiosCall<{ text: string; author: string }[]>({
      url: '/quotes',
    });
  }
}
