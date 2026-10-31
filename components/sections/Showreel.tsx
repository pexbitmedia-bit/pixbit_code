import { VideoShowcase } from '@/components/sections/VideoShowcase';
import { channelName, channelUrl, getChannelVideos } from '@/lib/youtube';

export async function Showreel() {
  const videos = await getChannelVideos();
  return <VideoShowcase videos={videos} channelUrl={channelUrl} channelName={channelName} />;
}
