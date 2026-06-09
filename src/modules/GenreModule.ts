import { BaseModule } from './BaseModule';
import type { DeezerGenre, PaginatedResponse, DeezerArtist, DeezerRadio } from '../types';

/**
 * GenreModule
 * Handles musical genres catalog on Deezer.
 */
export class GenreModule extends BaseModule {
  /**
   * List all available genres (when no ID is provided).
   */
  public async getGenres(): Promise<PaginatedResponse<DeezerGenre>> {
    return this.client.request<PaginatedResponse<DeezerGenre>>('/genre');
  }

  /**
   * Fetch details of a specific genre.
   */
  public async get(id: number | string): Promise<DeezerGenre> {
    return this.client.request<DeezerGenre>(`/genre/${id}`);
  }

  /**
   * Fetch artists associated with a genre.
   */
  public async getArtists(id: number | string, limit: number = 20): Promise<PaginatedResponse<DeezerArtist>> {
    return this.client.request<PaginatedResponse<DeezerArtist>>(`/genre/${id}/artists`, { limit });
  }

  /**
   * Fetch radio stations themed around a genre.
   */
  public async getRadios(id: number | string, limit: number = 20): Promise<PaginatedResponse<DeezerRadio>> {
    return this.client.request<PaginatedResponse<DeezerRadio>>(`/genre/${id}/radios`, { limit });
  }
}
