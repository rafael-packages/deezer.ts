import type { DeezerClient } from '../DeezerClient';
import type { PaginatedResponse } from '../types';

export abstract class BaseModule {
  protected client: DeezerClient;

  constructor(client: DeezerClient) {
    this.client = client;
  }

  /**
   * Helper generator to paginate through responses.
   */
  protected async *paginate<T>(
    requestPage: (index: number) => Promise<PaginatedResponse<T>>,
    maxPages?: number
  ): AsyncGenerator<T, void, unknown> {
    let index = 0;
    let pageCount = 0;
    while (true) {
      const response = await requestPage(index);
      const items = response.data;
      if (!items || items.length === 0) {
        break;
      }
      for (const item of items) {
        yield item;
      }
      index += items.length;
      pageCount++;
      if (maxPages && pageCount >= maxPages) {
        break;
      }
      if (!response.next) {
        break;
      }
    }
  }
}
