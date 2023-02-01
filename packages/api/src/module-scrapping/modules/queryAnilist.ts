import { QueryAnilist } from '../../../../types'

export async function queryAnilistForTitle(searchForTitle: string): Promise<QueryAnilist> {
  const query = `
  query($search: String){
    Media(search: $search, type: ANIME) {
      id
      episodes
      coverImage {
        large
        medium
        color
      }
      title {
        romaji
        english
        native
        userPreferred
      }
    }
  }`
  const url = 'https://graphql.anilist.co'
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query: query,
      variables: {
        search: searchForTitle,
      },
    }),
  }
  return await fetch(url, options)
    .then((response) => response.json())
    .catch((err) => console.log(err))
}