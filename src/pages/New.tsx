import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'

const CREATE_BLOG = gql`
  mutation createBlog($title: String!, $description: String!) {
    createBlog(data: { title: $title, description: $description }) {
      id
    }
  }
`

export default function New() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const navigate = useNavigate()

  const [createBlog, { loading, error }] = useMutation(CREATE_BLOG, {
    onCompleted: () => {
      navigate('/')
    }
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!title || !description) {
      alert('すべての項目を入力してください')
      return
    }
    await createBlog({
      variables: {
        title,
        description,
      }
    })
  }

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold mb-5">新規投稿</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
            タイトル
          </label>
          <input
            type="text"
            id="title"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
            説明
          </label>
          <textarea
            id="description"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={loading}
        >
          投稿する
        </button>
      </form>
      {error && <p className="text-red-500 mt-3">{error.message}</p>}
    </div>
  )
}
