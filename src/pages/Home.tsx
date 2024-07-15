import { gql, useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'

const BLOGS = gql`
query{
  blogs{
    id
    title
    description
    thumbnail{
      url
    }
  }
}
`

type Blog = {
    id: string
    title: string
    description: string
    thumbnail: {
        url: string
    }
}

function Home() {

    const { data, loading, error } = useQuery(BLOGS)

    if (loading) return "ロード中・・・"
    if (error) return "エラー"

    return (
        <>
            <div className='bg-[#eee] py-[100px]'>
                <div className='container mx-auto'>
                    <div className='grid grid-cols-3 gap-3'>
                        {data.blogs.map((blog: Blog) => (
                            <Link to={`/blog/${blog.id}`} className='border p-5 bg-white' key={blog.title}>
                                <div>
                                    <div className='mb-[10px]'>
                                        <img src={blog.thumbnail.url} alt="" className='w-[120px] h-[120px] mx-auto' />
                                    </div>
                                    <h2 className='font-bold text-[20px]'>{blog.title}</h2>
                                    <p>{blog.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
