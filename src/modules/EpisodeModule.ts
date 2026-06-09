import { BaseModule } from './BaseModule';
import type { DeezerEpisode } from '../types';

/**
 * EpisodeModule
 * Handles podcast episode metadata catalog.
 */
export class EpisodeModule extends BaseModule {
  /**
   * Fetch episode metadata by ID.
   */
  public async get(id: number | string): Promise<DeezerEpisode> {
    return this.client.request<DeezerEpisode>(`/episode/${id}`);
  }
}
