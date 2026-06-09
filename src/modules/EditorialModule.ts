import { BaseModule } from './BaseModule';
import type { DeezerEditorial, PaginatedResponse, DeezerAlbum, DeezerChart } from '../types';

/**
 * EditorialModule
 * Handles editorial blocks, staff picks, and releases.
 */
export class EditorialModule extends BaseModule {
  /**
   * Fetch the list of editorial selections.
   */
  public async getEditorials(limit: number = 20): Promise<PaginatedResponse<DeezerEditorial>> {
    return this.client.request<PaginatedResponse<DeezerEditorial>>('/editorial', { limit });
  }

  /**
   * Fetch editorial details by ID.
   */
  public async get(id: number | string): Promise<DeezerEditorial> {
    return this.client.request<DeezerEditorial>(`/editorial/${id}`);
  }

  /**
   * Fetch charts for a specific editorial. Use id = 0 for global charts.
   */
  public async getCharts(id: number | string = 0): Promise<DeezerChart> {
    return this.client.request<DeezerChart>(`/editorial/${id}/charts`);
  }

  /**
   * Fetch new releases and recommendations by genre/editorial.
   */
  public async getReleases(
    id: number | string = 0,
    limit: number = 20
  ): Promise<PaginatedResponse<DeezerAlbum>> {
    return this.client.request<PaginatedResponse<DeezerAlbum>>(`/editorial/${id}/releases`, {
      limit,
    });
  }
}
