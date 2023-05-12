
import { Inter } from 'next/font/google'

import Link from 'next/link'
import { GetServerSideProps, NextPage } from 'next'
import { gql } from '@apollo/client'
import { getClientSSR } from '@/utils/client'
import { post, posts } from '@/types'

const inter = Inter({ subsets: ['latin'] })

export const getServerSideProps: GetServerSideProps = async () => {
const query = gql`
query Query{
  posts{
    title
    id
  }
}
`
const client = getClientSSR();
const {data} = await client.query<posts>({
query
})

return {
props: { data }
}
}

const Home:NextPage<{data:posts}> = ({data}) => { 
    console.log(data.posts[2])
  return (
    <>
    <div>
      hola
      {data.posts.map((po) => 
        <Link href={`post/${po.id}`}> <div className='post'>{po.title}</div></Link>
        )}
    
    </div>
      
    </>
  )
}
export default Home;