import Song from './Song';
import { useRecoilValue } from 'recoil';
import { playlistState } from '../atoms/playlistAtom';

const Songs = () => {
    const playlist = useRecoilValue(playlistState);
  return (
<div className='flex flex-col space-y-1 pb-28 text-white p-8'>
      {playlist?.tracks.items.map((track, i) => (
          <Song key={track.track.id} track={track} order={i}/>
          
          
      ))}
  </div>
  );
};

export default Songs;