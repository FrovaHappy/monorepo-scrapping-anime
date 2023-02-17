import { useState } from 'react'
import { AnimeList } from '../../../../types'
import './styles/animeList.scss'

import { AnimeInfo } from './animeInfo'
import TargetAnime from './components/targetAnime'

interface props {
  animes: AnimeList[]
}

export function AnimeComponet({ animes }: props) {
  const [id, setId] = useState<number>(0)
  if (animes.length == 0) {
    return <h1>esta cargando</h1>
  }
  return (
    <>
      <div className="animeList">
        {animes.map((anime) => {
          return <TargetAnime key={anime.dataAnilist.id} anime={anime} setId={setId} id={id} />
        })}
      </div>
      <AnimeInfo animes={animes} id={id} />
    </>
  )
}
