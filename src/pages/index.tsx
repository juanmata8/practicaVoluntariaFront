
import { Inter } from 'next/font/google'

import Link from 'next/link'
import { GetServerSideProps, NextPage } from 'next'
import { gql } from '@apollo/client'
import { getClientSSR } from '@/utils/client'
import { Post, post } from '@/types'

const inter = Inter({ subsets: ['latin'] })

type posts = {
  posts: Post[];
}
export const getServerSideProps: GetServerSideProps = async () => {
const query = gql`
query Query{
  posts(limit:3){
    title
    id
    imageUrl
  }
}
`
const client = getClientSSR();
const {data} = await client.query<posts>({
query
})
console.log(data.posts)
return {
props: { data }
}
}

const Home:NextPage<{data:posts}> = ({data}) => { 
  return (
    <>
    <div className='contenedorPosts'>
    <div>
      <div>{data.posts[0].title}</div>
      <img src={data.posts[0].imageUrl} />
      <Link href={`post/${data.posts[0].id}`}><div>Ver mas</div></Link>
      </div>
      
      <div>
      <div>{data.posts[1].title}</div>
      <img src={data.posts[1].imageUrl} />
      <Link href={`post/${data.posts[1].id}`}><div>Ver mas</div></Link>
      </div>
      
      <div>
      <div>{data.posts[2].title}</div>
      <img src={data.posts[2].imageUrl} />
      <Link href={`post/${data.posts[2].id}`}><div>Ver mas</div></Link>
      </div>
    </div>
      
    </>
  )
}
export default Home;