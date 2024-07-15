import { gql, useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'

const BLOG = gql`
  query Blog($id: ID!) {
    blog(where: { id: $id }) {
      id
      title
      description
      thumbnail {
        url
      }
    }
  }
`

export default function Article() {
  const { id } = useParams()
  
  if (!id) return <p>記事が見つかりませんでした。</p>

  const { loading, data, error } = useQuery(BLOG, {
    variables: { id }
  })

  if (loading) return <p>ローディング中...</p>
  if (error) return <p>エラーが発生しました: {error.message}</p>

  if (data && data.blog) {
    return (
      <div>
        <h1>{data.blog.title}</h1>
        <img src={data.blog.thumbnail.url} alt={data.blog.title} />
        <p>{data.blog.description}</p>
      </div>
    )
  }
  return <p>データが見つかりませんでした。</p>
}
