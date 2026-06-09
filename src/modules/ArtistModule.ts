import { BaseModule } from './BaseModule';
import type {
  DeezerArtist,
  DeezerAlbum,
  DeezerTrack,
  PaginatedResponse,
  DeezerPlaylist,
  DeezerUser,
} from '../types';

/**
 * ArtistModule
 * Handles artist catalog operations including top tracks, albums, fans, and related artists.
 */
export class ArtistModule extends BaseModule {
  /**
   * Fetch core artist data (image, name, stats).
   */
  public async get(id: number | string): Promise<DeezerArtist> {
    return this.client.request<DeezerArtist>(`/artist/${id}`);
  }

  /**
   * Fetch top tracks of the artist.
   */
  public async getTop(
    id: number | string,
    limit: number = 10
  ): Promise<PaginatedResponse<DeezerTrack>> {
    return this.client.request<PaginatedResponse<DeezerTrack>>(`/artist/${id}/top`, { limit });
  }

  /**
   * Fetch albums, singles, and EPs of the artist.
   */
  public async getAlbums(
    id: number | string,
    limit: number = 25,
    index: number = 0
  ): Promise<PaginatedResponse<DeezerAlbum>> {
    return this.client.request<PaginatedResponse<DeezerAlbum>>(`/artist/${id}/albums`, {
      limit,
      index,
    });
  }

  /**
   * Returns an async iterator to paginate over artist's albums.
   */
  public getAlbumsIterator(
    id: number | string,
    limit: number = 25
  ): AsyncGenerator<DeezerAlbum, void, unknown> {
    return this.paginate<DeezerAlbum>((index) => this.getAlbums(id, limit, index));
  }

  /**
   * Fetch related artists.
   */
  public async getRelated(
    id: number | string,
    limit: number = 20
  ): Promise<PaginatedResponse<DeezerArtist>> {
    return this.client.request<PaginatedResponse<DeezerArtist>>(`/artist/${id}/related`, { limit });
  }

  /**
   * Fetch smart radio based on the artist.
   */
  public async getRadio(
    id: number | string,
    limit: number = 20
  ): Promise<PaginatedResponse<DeezerTrack>> {
    return this.client.request<PaginatedResponse<DeezerTrack>>(`/artist/${id}/radio`, { limit });
  }

  /**
   * Fetch playlists containing tracks of the artist.
   */
  public async getPlaylists(
    id: number | string,
    limit: number = 20,
    index: number = 0
  ): Promise<PaginatedResponse<DeezerPlaylist>> {
    return this.client.request<PaginatedResponse<DeezerPlaylist>>(`/artist/${id}/playlists`, {
      limit,
      index,
    });
  }

  /**
   * Returns an async iterator to paginate over artist's playlists.
   */
  public getPlaylistsIterator(
    id: number | string,
    limit: number = 20
  ): AsyncGenerator<DeezerPlaylist, void, unknown> {
    return this.paginate<DeezerPlaylist>((index) => this.getPlaylists(id, limit, index));
  }

  /**
   * Fetch user fans of the artist.
   */
  public async getFans(
    id: number | string,
    limit: number = 20
  ): Promise<PaginatedResponse<DeezerUser>> {
    return this.client.request<PaginatedResponse<DeezerUser>>(`/artist/${id}/fans`, { limit });
  }
}
