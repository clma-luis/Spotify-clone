import Sidebar from '../containers/Sidebar'
import Center from '../containers/Center'
import Player from '../containers/Player'
import { getSession, GetSessionParams } from 'next-auth/react'

export default function Home() {
  return (
    <div className="h-screen overflow-hidden bg-black">
    <main className="flex ">
      <Sidebar />
      <Center />

    </main>

    <div className='sticky bottom-0'>
      <Player/>
    </div>
  </div>
  )
}


export async function getServerSideProps(context: GetSessionParams | undefined) {
  const session = await getSession(context)

  return {
    props: {
      session,
    },
  }
}
