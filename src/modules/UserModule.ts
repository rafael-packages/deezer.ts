import { BaseModule } from './BaseModule';
import type {
  DeezerUser,
  DeezerAlbum,
  DeezerArtist,
  DeezerPlaylist,
  DeezerTrack,
  PaginatedResponse,
  DeezerRadio,
  DeezerPodcast,
} from '../types';

/**
 * UserModule
 * Fetch all information from public Deezer user profiles.
 */
export class UserModule extends BaseModule {
  /**
   * Fetch basic user profile data.
   */
  public async get(id: number | string): Promise<DeezerUser> {
    return this.client.request<DeezerUser>(`/user/${id}`);
  }

  /**
   * Fetch albums favorited by the user.
   */
  public async getAlbums(
    id: number | string,
    limit: number = 20,
    index: number = 0
  ): Promise<PaginatedResponse<DeezerAlbum>> {
    return this.client.request<PaginatedResponse<DeezerAlbum>>(`/user/${id}/albums`, {
      limit,
      index,
    });
  }

  /**
   * Returns an async iterator to paginate over user's favorite albums.
   */
  public getAlbumsIterator(
    id: number | string,
    limit: number = 20
  ): AsyncGenerator<DeezerAlbum, void, unknown> {
    return this.paginate<DeezerAlbum>((index) => this.getAlbums(id, limit, index));
  }

  /**
   * Fetch artists followed by the user.
   */
  public async getArtists(
    id: number | string,
    limit: number = 20,
    index: number = 0
  ): Promise<PaginatedResponse<DeezerArtist>> {
    return this.client.request<PaginatedResponse<DeezerArtist>>(`/user/${id}/artists`, {
      limit,
      index,
    });
  }

  /**
   * Returns an async iterator to paginate over user's followed artists.
   */
  public getArtistsIterator(
    id: number | string,
    limit: number = 20
  ): AsyncGenerator<DeezerArtist, void, unknown> {
    return this.paginate<DeezerArtist>((index) => this.getArtists(id, limit, index));
  }

  /**
   * Fetch playlists created or followed by the user.
   */
  public async getPlaylists(
    id: number | string,
    limit: number = 20,
    index: number = 0
  ): Promise<PaginatedResponse<DeezerPlaylist>> {
    return this.client.request<PaginatedResponse<DeezerPlaylist>>(`/user/${id}/playlists`, {
      limit,
      index,
    });
  }

  /**
   * Returns an async iterator to paginate over user's playlists.
   */
  public getPlaylistsIterator(
    id: number | string,
    limit: number = 20
  ): AsyncGenerator<DeezerPlaylist, void, unknown> {
    return this.paginate<DeezerPlaylist>((index) => this.getPlaylists(id, limit, index));
  }

  /**
   * Fetch user's favorite/liked tracks.
   */
  public async getTracks(
    id: number | string,
    limit: number = 50,
    index: number = 0
  ): Promise<PaginatedResponse<DeezerTrack>> {
    return this.client.request<PaginatedResponse<DeezerTrack>>(`/user/${id}/tracks`, {
      limit,
      index,
    });
  }

  /**
   * Returns an async iterator to paginate over user's liked tracks.
   */
  public getTracksIterator(
    id: number | string,
    limit: number = 50
  ): AsyncGenerator<DeezerTrack, void, unknown> {
    return this.paginate<DeezerTrack>((index) => this.getTracks(id, limit, index));
  }

  /**
   * Fetch the user's smart Flow tracks.
   */
  public async getFlow(
    id: number | string,
    limit: number = 20
  ): Promise<PaginatedResponse<DeezerTrack>> {
    return this.client.request<PaginatedResponse<DeezerTrack>>(`/user/${id}/flow`, { limit });
  }

  /**
   * Fetch the user's listening history.
   */
  public async getHistory(
    id: number | string,
    limit: number = 20
  ): Promise<PaginatedResponse<DeezerTrack>> {
    return this.client.request<PaginatedResponse<DeezerTrack>>(`/user/${id}/history`, { limit });
  }

  /**
   * Fetch users this user is following.
   */
  public async getFollowings(
    id: number | string,
    limit: number = 20
  ): Promise<PaginatedResponse<DeezerUser>> {
    return this.client.request<PaginatedResponse<DeezerUser>>(`/user/${id}/followings`, { limit });
  }

  /**
   * Fetch users following this user.
   */
  public async getFollowers(
    id: number | string,
    limit: number = 20
  ): Promise<PaginatedResponse<DeezerUser>> {
    return this.client.request<PaginatedResponse<DeezerUser>>(`/user/${id}/followers`, { limit });
  }

  /**
   * Fetch radio stations favorited by the user.
   */
  public async getRadios(
    id: number | string,
    limit: number = 20
  ): Promise<PaginatedResponse<DeezerRadio>> {
    return this.client.request<PaginatedResponse<DeezerRadio>>(`/user/${id}/radios`, { limit });
  }

  /**
   * Fetch podcasts subscribed to by the user.
   */
  public async getPodcasts(
    id: number | string,
    limit: number = 20
  ): Promise<PaginatedResponse<DeezerPodcast>> {
    return this.client.request<PaginatedResponse<DeezerPodcast>>(`/user/${id}/podcasts`, { limit });
  }

  /**
   * Fetch personal charts.
   */
  public async getCharts(
    id: number | string,
    category: 'tracks' | 'albums' | 'artists' | 'playlists' = 'tracks',
    limit: number = 20
  ): Promise<PaginatedResponse<any>> {
    return this.client.request<PaginatedResponse<any>>(`/user/${id}/charts/${category}`, { limit });
  }
}
