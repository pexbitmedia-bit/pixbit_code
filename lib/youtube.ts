export const channelId = 'UCYgu3qmmhgovLZtoT1tx00g';
export const channelUrl = 'https://www.youtube.com/@ParasSharmai';
export const channelName = 'Paras Sharma';

export type ChannelVideo = {
  id: string;
  title: string;
  published: string;
  thumbnail: string;
};

function decodeXml(value: string): string {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, code: string) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .trim();
}

function tag(entry: string, name: string): string {
  const match = entry.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`));
  return decodeXml(match?.[1] ?? '');
}

const uploadsPlaylistId = channelId.replace(/^UC/, 'UU');

type PlaylistItem = {
  snippet?: {
    title?: string;
    publishedAt?: string;
    resourceId?: { videoId?: string };
  };
};

function toVideo(id: string, title: string, published: string): ChannelVideo | null {
  if (!id || !title || title === 'Private video' || title === 'Deleted video') return null;
  return {
    id,
    title,
    published,
    thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
  };
}

async function videosFromApi(key: string): Promise<ChannelVideo[] | null> {
  const videos: ChannelVideo[] = [];
  let pageToken = '';

  for (let page = 0; page < 2; page += 1) {
    const url = new URL('https://www.googleapis.com/youtube/v3/playlistItems');
    url.searchParams.set('part', 'snippet');
    url.searchParams.set('playlistId', uploadsPlaylistId);
    url.searchParams.set('maxResults', '50');
    url.searchParams.set('key', key);
    if (pageToken) url.searchParams.set('pageToken', pageToken);

    const response = await fetch(url, { next: { revalidate: 60 }, signal: AbortSignal.timeout(8000) });
    if (!response.ok) return null;
    const data = (await response.json()) as { nextPageToken?: string; items?: PlaylistItem[] };
    for (const item of data.items ?? []) {
      const video = toVideo(
        item.snippet?.resourceId?.videoId ?? '',
        item.snippet?.title ?? '',
        item.snippet?.publishedAt ?? '',
      );
      if (video) videos.push(video);
    }
    if (!data.nextPageToken) break;
    pageToken = data.nextPageToken;
  }

  videos.sort((a, b) => Date.parse(b.published) - Date.parse(a.published));
  return videos;
}

async function videosFromFeed(): Promise<ChannelVideo[]> {
  const response = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`, {
    next: { revalidate: 60 },
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) return [];
  const xml = await response.text();
  return xml
    .split('<entry>')
    .slice(1)
    .map((entry) => toVideo(tag(entry, 'yt:videoId'), tag(entry, 'title'), tag(entry, 'published')))
    .filter((video): video is ChannelVideo => video !== null);
}

export async function getChannelVideos(): Promise<ChannelVideo[]> {
  try {
    const key = process.env.YOUTUBE_API_KEY?.trim();
    if (key) {
      const videos = await videosFromApi(key);
      if (videos && videos.length > 0) return videos;
    }
    return (await videosFromFeed()).sort((a, b) => Date.parse(b.published) - Date.parse(a.published));
  } catch {
    return [];
  }
}
