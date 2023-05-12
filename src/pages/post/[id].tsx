import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import { GetServerSideProps, NextPage } from 'next'
import { gql, useQuery } from '@apollo/client'
import { getClientSSR } from '@/utils/client'
import { comments, post, User } from '@/types'

const inter = Inter({ subsets: ['latin'] })

const query = gql`
query Query{
  comments {
    body

  }
}
`

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context.params?.id
  const query = gql`
  query Query{
    post(id:"${id}"){ 
      title
      body
      imageUrl
      createdAt
      updatedAt
      comments {
        body
      }
    }
  }
  `
  const client = getClientSSR();
  const {data} = await client.query<post>({
  query
  })
  
  return {
  props: { data }
  }
  }
//   const getComments = () => {
//     const { data, error } = useQuery<comments>(query);
//     if (error) return `Error! ${error.message}`;
//     return data?.comments;
//   }
  
const post:NextPage<{data:post}> = ({data}) => { 
    
    
  return (
    <>    
     <div>{data.post.title}</div>
     <img src={data.post.imageUrl} />
     <form action="/send-data-here" method="post">
  <label>Body</label>
  <input type="text"/>
  <label>User Email</label>
  <input type="text"/>
  <label>postId</label>
  <input type="text"/>
  <button type="submit">Submit new comment</button>
</form>
<div>
    
</div>
    </>
  )
}
export default post;