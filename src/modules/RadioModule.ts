import { BaseModule } from './BaseModule';
import type { DeezerRadio, PaginatedResponse, DeezerTrack } from '../types';

/**
 * RadioModule
 * Handles access to the Deezer radio catalog.
 */
export class RadioModule extends BaseModule {
  /**
   * List all basic available radio channels.
   */
  public async getRadios(limit: number = 20): Promise<PaginatedResponse<DeezerRadio>> {
    return this.client.request<PaginatedResponse<DeezerRadio>>('/radio', { limit });
  }

  /**
   * Fetch radio details by ID.
   */
  public async get(id: number | string): Promise<DeezerRadio> {
    return this.client.request<DeezerRadio>(`/radio/${id}`);
  }

  /**
   * Fetch currently trending radios.
   */
  public async getTop(limit: number = 20): Promise<PaginatedResponse<DeezerRadio>> {
    return this.client.request<PaginatedResponse<DeezerRadio>>('/radio/top', { limit });
  }

  /**
   * Fetch tracks available on the radio channel.
   */
  public async getTracks(id: number | string, limit: number = 20): Promise<PaginatedResponse<DeezerTrack>> {
    return this.client.request<PaginatedResponse<DeezerTrack>>(`/radio/${id}/tracks`, { limit });
  }
}
