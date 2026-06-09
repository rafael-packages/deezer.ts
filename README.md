# @rafaelsilvadeveloper/deezer.ts

A strongly typed, zero-dependency TypeScript client for the Deezer API, featuring rate limiting, caching, and async iterators.

[![NPM Version](https://img.shields.io/npm/v/@rafaelsilvadeveloper/deezer.ts.svg?style=flat-square)](https://www.npmjs.com/package/@rafaelsilvadeveloper/deezer.ts)
[![Discord Support](https://img.shields.io/discord/1111111111?color=7289da&label=Discord&logo=discord&style=flat-square)](https://discord.gg/7Fw7snafYS)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-zero-blueviolet.svg?style=flat-square)](https://www.npmjs.com/package/@rafaelsilvadeveloper/deezer.ts)

## Features

*   🛡️ **100% API Coverage**: Fully typed requests and responses for Albums, Artists, Tracks, Playlists, Users, Podcasts, Episodes, Radios, Genres, and Editorials.
*   📦 **Zero Dependencies**: Built entirely using native `fetch`. Runs in Node.js, Bun, Cloudflare Workers, Edge, and Serverless environments.
*   🚦 **Built-in Rate Limiting**: Automatic queue management complying with Deezer API's 50 requests/second limit.
*   🚀 **In-Memory Cache**: Smart built-in caching layer to save resources and speed up repeat requests.
*   🔌 **Custom Interceptors**: Flexible middlewares to intercept and modify requests/responses dynamically.
*   🔄 **Async Iterators**: Page-fetch search results, playlist tracks, and user library items seamlessly using modern `for await...of` loops.

## Installation

```bash
npm install @rafaelsilvadeveloper/deezer.ts
```

## Getting Started

```typescript
import { DeezerClient } from '@rafaelsilvadeveloper/deezer.ts';

const client = new DeezerClient();

async function run() {
  // Fetch artist profile, top tracks, and albums
  const artist = await client.artists.get(13); // Eminem
  const topTracks = await client.artists.getTop(13);
  
  // Get related radios and fans
  const radio = await client.artists.getRadio(13);
  const fans = await client.artists.getFans(13);

  // Get user's personal Flow tracks
  const flow = await client.users.getFlow(123456);
}

run();
```

## Pagination with Async Iterators

Iterate through paginated resources (like search results or playlist tracks) automatically without manually handling offsets or limit indexes:

```typescript
import { DeezerClient } from '@rafaelsilvadeveloper/deezer.ts';

const client = new DeezerClient();

async function run() {
  // Automatically fetches next pages behind the scenes as you loop!
  for await (const track of client.search.trackIterator('Daft Punk')) {
    console.log(`Track: ${track.title} - Duration: ${track.duration}s`);
  }
}

run();
```

## Error Handling

Throws strongly typed `DeezerError` when the API returns an error structure.

```typescript
import { DeezerError } from '@rafaelsilvadeveloper/deezer.ts';

try {
  await client.albums.get(9999999999);
} catch (error) {
  if (error instanceof DeezerError) {
    console.error(`API Error: ${error.message} (Code: ${error.code})`);
  }
}
```

## Support

For support, questions, or discussions, join our Discord server:

[![Discord Server](https://img.shields.io/discord/1111111111?color=7289da&label=Discord&logo=discord&style=for-the-badge)](https://discord.gg/7Fw7snafYS)

## License
MIT
