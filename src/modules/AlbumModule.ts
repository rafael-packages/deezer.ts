import { BaseModule } from './BaseModule';
import type { DeezerAlbum, DeezerTrack, PaginatedResponse, DeezerUser } from '../types';

/**
 * AlbumModule
 * Manages album searches, their tracks, and users who favorited them.
 */
export class AlbumModule extends BaseModule {
  /**
   * Fetch a full album by ID.
   */
  public async get(id: number | string): Promise<DeezerAlbum> {
    return this.client.request<DeezerAlbum>(`/album/${id}`);
  }

  /**
   * Fetch track list of an album.
   */
  public async getTracks(
    id: number | string,
    limit: number = 50,
    index: number = 0
  ): Promise<PaginatedResponse<DeezerTrack>> {
    return this.client.request<PaginatedResponse<DeezerTrack>>(`/album/${id}/tracks`, { limit, index });
  }

  /**
   * Returns an async iterator to paginate over album tracks.
   */
  public getTracksIterator(id: number | string, limit: number = 50): AsyncGenerator<DeezerTrack, void, unknown> {
    return this.paginate<DeezerTrack>((index) => this.getTracks(id, limit, index));
  }

  /**
   * Fetch users who favorited this album.
   */
  public async getFans(id: number | string, limit: number = 20): Promise<PaginatedResponse<DeezerUser>> {
    return this.client.request<PaginatedResponse<DeezerUser>>(`/album/${id}/fans`, { limit });
  }
}
