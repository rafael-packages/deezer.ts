import { BaseModule } from './BaseModule';
import type { DeezerPlaylist, DeezerTrack, PaginatedResponse, DeezerUser } from '../types';

/**
 * PlaylistModule
 * Fetch public playlists, their tracks, and fans.
 */
export class PlaylistModule extends BaseModule {
  /**
   * Fetch metadata of a playlist.
   */
  public async get(id: number | string): Promise<DeezerPlaylist> {
    return this.client.request<DeezerPlaylist>(`/playlist/${id}`);
  }

  /**
   * Fetch tracks of a playlist.
   */
  public async getTracks(
    id: number | string,
    limit: number = 50,
    index: number = 0
  ): Promise<PaginatedResponse<DeezerTrack>> {
    return this.client.request<PaginatedResponse<DeezerTrack>>(`/playlist/${id}/tracks`, { limit, index });
  }

  /**
   * Returns an async iterator to paginate over playlist tracks.
   */
  public getTracksIterator(id: number | string, limit: number = 50): AsyncGenerator<DeezerTrack, void, unknown> {
    return this.paginate<DeezerTrack>((index) => this.getTracks(id, limit, index));
  }

  /**
   * Fetch users who favorited this playlist.
   */
  public async getFans(id: number | string, limit: number = 20): Promise<PaginatedResponse<DeezerUser>> {
    return this.client.request<PaginatedResponse<DeezerUser>>(`/playlist/${id}/fans`, { limit });
  }

  /**
   * Smart radio generated from the playlist.
   */
  public async getRadio(id: number | string, limit: number = 20): Promise<PaginatedResponse<DeezerTrack>> {
    return this.client.request<PaginatedResponse<DeezerTrack>>(`/playlist/${id}/radio`, { limit });
  }
}
