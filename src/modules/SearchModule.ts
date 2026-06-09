import { BaseModule } from './BaseModule';
import type { DeezerSearchOptions, PaginatedResponse, DeezerTrack, DeezerAlbum, DeezerArtist, DeezerPlaylist, DeezerRadio, DeezerPodcast } from '../types';

/**
 * SearchModule
 * Unified search for all Deezer objects (track, album, artist, etc).
 */
export class SearchModule extends BaseModule {
  /**
   * Search for tracks. Supports simple query string or advanced queries like: 'artist:"eminem" track:"lose yourself"'
   */
  public async track(options: string | DeezerSearchOptions): Promise<PaginatedResponse<DeezerTrack>> {
    const params = typeof options === 'string' ? { q: options } : options;
    return this.client.request<PaginatedResponse<DeezerTrack>>(`/search`, params);
  }

  /**
   * Returns an async iterator to paginate over track search results.
   */
  public trackIterator(options: string | Omit<DeezerSearchOptions, 'index'>): AsyncGenerator<DeezerTrack, void, unknown> {
    return this.paginate<DeezerTrack>((index) => {
      const params = typeof options === 'string' ? { q: options } : options;
      return this.track({ ...params, index });
    });
  }

  /**
   * Search for albums.
   */
  public async album(options: string | DeezerSearchOptions): Promise<PaginatedResponse<DeezerAlbum>> {
    const params = typeof options === 'string' ? { q: options } : options;
    return this.client.request<PaginatedResponse<DeezerAlbum>>(`/search/album`, params);
  }

  /**
   * Returns an async iterator to paginate over album search results.
   */
  public albumIterator(options: string | Omit<DeezerSearchOptions, 'index'>): AsyncGenerator<DeezerAlbum, void, unknown> {
    return this.paginate<DeezerAlbum>((index) => {
      const params = typeof options === 'string' ? { q: options } : options;
      return this.album({ ...params, index });
    });
  }

  /**
   * Search for artists.
   */
  public async artist(options: string | DeezerSearchOptions): Promise<PaginatedResponse<DeezerArtist>> {
    const params = typeof options === 'string' ? { q: options } : options;
    return this.client.request<PaginatedResponse<DeezerArtist>>(`/search/artist`, params);
  }

  /**
   * Returns an async iterator to paginate over artist search results.
   */
  public artistIterator(options: string | Omit<DeezerSearchOptions, 'index'>): AsyncGenerator<DeezerArtist, void, unknown> {
    return this.paginate<DeezerArtist>((index) => {
      const params = typeof options === 'string' ? { q: options } : options;
      return this.artist({ ...params, index });
    });
  }

  /**
   * Search for playlists.
   */
  public async playlist(options: string | DeezerSearchOptions): Promise<PaginatedResponse<DeezerPlaylist>> {
    const params = typeof options === 'string' ? { q: options } : options;
    return this.client.request<PaginatedResponse<DeezerPlaylist>>(`/search/playlist`, params);
  }

  /**
   * Returns an async iterator to paginate over playlist search results.
   */
  public playlistIterator(options: string | Omit<DeezerSearchOptions, 'index'>): AsyncGenerator<DeezerPlaylist, void, unknown> {
    return this.paginate<DeezerPlaylist>((index) => {
      const params = typeof options === 'string' ? { q: options } : options;
      return this.playlist({ ...params, index });
    });
  }

  /**
   * Search for radio stations.
   */
  public async radio(options: string | DeezerSearchOptions): Promise<PaginatedResponse<DeezerRadio>> {
    const params = typeof options === 'string' ? { q: options } : options;
    return this.client.request<PaginatedResponse<DeezerRadio>>(`/search/radio`, params);
  }

  /**
   * Search for podcasts.
   */
  public async podcast(options: string | DeezerSearchOptions): Promise<PaginatedResponse<DeezerPodcast>> {
    const params = typeof options === 'string' ? { q: options } : options;
    return this.client.request<PaginatedResponse<DeezerPodcast>>(`/search/podcast`, params);
  }
}
