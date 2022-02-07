import useSpotify from '../hooks/useSpotify'
import { millistToMinutesAndSeconds } from '../lib/time'
import {currentTrackIdState, isPlayingState} from '../atoms/songAtom'
import { useRecoilState } from 'recoil'


const Song = ({ order, track }) => {
  const spotifyApi = useSpotify()
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)

  const playSong = () => {
    setCurrentTrackId(track.track.id);
    console.log('soy el track.track.uri', track.track.uri);
    setIsPlaying(true);
    spotifyApi.play({
      uris: [track.track.uri],
    })
  }

  return (
    <div className="grid cursor-pointer grid-cols-2 rounded-lg py-4 px-5 text-gray-500 hover:bg-gray-900" onClick={playSong}>
      <div className="flex items-center space-x-4">
        <p>{order + 1}</p>
        <img
          className="h-10 w-10"
          src={track.track.album.images[0].url}
          alt=""
        />

        <div>
          <p className="w-36 truncate text-white lg:w-64">{track.track.name}</p>
          <p className="w-40">{track.track.artists[0].name}</p>
        </div>
      </div>

      <div className="items-centes ml-auto flex justify-between md:ml-0">
        <p className="hidden w-40 md:inline">{track.track.album.name}</p>
        <p>{millistToMinutesAndSeconds(track.track.duration_ms)}</p>
      </div>
    </div>
  )
}

export default Song
