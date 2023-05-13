
import { Inter } from 'next/font/google'

import Link from 'next/link'
import { GetServerSideProps, NextPage } from 'next'
import { gql, useQuery } from '@apollo/client'
import { getClientSSR } from '@/utils/client'
import { post, posts } from '@/types'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

const Postsbis = () => {
    const query = gql`
    query posts($limit:Int, $page:Int){
    posts(limit:$limit, page: $page){
        title
        id
    }
    }
    `
    const [limit, setLimit] = useState<number>();
    const [page, setPage] = useState<number>();
    const [inputLimit, setinputLimit] = useState<number>();
    const [inputPage, setInputPage] = useState<number>();

const {data} = useQuery<posts>(
query, {
    variables: { limit, page  }
}
) 

const handleClick = () => {
    setLimit(inputLimit);
    setPage(inputPage);
}
if(data)
  return (
    <>
    <div>
        <input type="text"  placeholder="Enter limit" onChange={(i) => {
          setinputLimit(parseInt(i.target.value));         
          }}/>
        </div>
        <div>
        <input type="text"  placeholder="Enter page" onChange={(i) => {
          setInputPage(parseInt(i.target.value));         
          }}/>
        </div>
        <button onClick={() => handleClick()} >Search</button>
    <div>
      
      {data.posts.map((po) => 
        <Link href={`post/${po.id}`}> <div className='post'>{po.title}</div></Link>
        )}
    
    </div>
      
    </>
  )
}
export default Postsbis;