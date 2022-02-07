import { useState, useEffect } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'

import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
} from '@heroicons/react/outline'

import {
  HeartIcon
} from '@heroicons/react/solid'
import useSpotify from '../hooks/useSpotify'
import {useRecoilState} from 'recoil';
import {playlistIdState} from '../atoms/playlistAtom'
 
function Siderbar() {
  const spotifyApi = useSpotify()
  const { data: session, status } = useSession()
  const [playlists, setPlaylists] = useState([])
   const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

/*      console.log('you pick this >>>>>>', playlistId) */
   
  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items)
      })
    }
  }, [session, spotifyApi])



  return (
    <div className="boder-gray-900 h-screen overflow-y-scroll border-r p-5 text-xm lg:text-sm text-gray-500 scrollbar-hide sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex pb-36">
      <div className="space-y-4 ">
        <button className="flex items-center space-x-2 hover:text-white">
          <SearchIcon className="h-5 w-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <LibraryIcon className="h-5 w-5" />
          <p>Your Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />

        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create PlayList</p>
        </button>
        <button className="flex items-center space-x-2 text-blue-500 hover:text-white">
          <HeartIcon className="h-5 w-5" />
          <p>Like Songs</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <RssIcon className="h-5 w-5 text-green-500"  />
          <p>Search</p>
        </button>

        <hr className="border-t-[0.1px] border-gray-900" />
        {/* play List */}

        {playlists.map((playlist) => (
          <p
            key={playlist.id}
            onClick={() => setPlaylistId(playlist.id)}
            className="cursor-pointer hover:text-white "
          >
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  )
}

export default Siderbar
