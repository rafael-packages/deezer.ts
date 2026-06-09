import { BaseModule } from './BaseModule';
import type { DeezerPodcast, PaginatedResponse, DeezerEpisode } from '../types';

/**
 * PodcastModule
 * Handles podcast show catalogs.
 */
export class PodcastModule extends BaseModule {
  /**
   * Fetch podcast details by ID.
   */
  public async get(id: number | string): Promise<DeezerPodcast> {
    return this.client.request<DeezerPodcast>(`/podcast/${id}`);
  }

  /**
   * Fetch the list of episodes of a podcast.
   */
  public async getEpisodes(
    id: number | string,
    limit: number = 20
  ): Promise<PaginatedResponse<DeezerEpisode>> {
    return this.client.request<PaginatedResponse<DeezerEpisode>>(`/podcast/${id}/episodes`, {
      limit,
    });
  }
}
