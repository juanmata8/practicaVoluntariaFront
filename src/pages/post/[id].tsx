import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import { GetServerSideProps, NextPage } from 'next'
import { gql, useMutation, useQuery } from '@apollo/client'
import { getClientSSR } from '@/utils/client'
import { comments, post, User } from '@/types'

import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

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
        user {
          email
        }
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
  
const post:NextPage<{data:post}> = ({data}) => {   
  const CREATECOMMENT = gql`
  mutation createComment($body:String!, $userEmail:String!, $postId:String!){
    createComment(
        input: {
          body:$body
          userEmail:$userEmail
          postId:$postId
        }
      ){
        body
      }
    } 
  `;

    const [body1, setBody] = useState<string>("");
    const [userEmail1, setUserEmail] = useState<string>("");
    const [postId1, setPostId] = useState<string>("");
    const [newComments, setnewComments] = useState<{body:string, userEmail:string}[]>([])
    const oldComments = data.post.comments.map(c => c.body)

    const [createComment, {error}] = useMutation(CREATECOMMENT , {
        onCompleted: (data) => {
          // setnewComments([...newComments, {body:body1, userEmail: userEmail1}])
          console.log(data) // the response
        },
        onError: (error) => {
          console.log(error); // the error if that is the case
        },
        
    });
    
    const handleClick = () => {
      createComment({ variables: { body: body1, userEmail: userEmail1, postId: postId1 } })
      setnewComments([...newComments, {body:body1, userEmail: userEmail1}])
    }
    
  return (
    <>    
     <div>{data.post.title}</div>
     <img src={data.post.imageUrl} />
     <div dangerouslySetInnerHTML={{__html:data.post.body}}></div> 
     <div>
        <input type="text" placeholder="Enter title" onChange={(i) => {
          setBody(i.target.value);         
          }}/>
        </div>
        <div>
        <input type="text" placeholder="Enter user email" onChange={(i) => {
          setUserEmail(i.target.value);         
          }}/>
        </div>
        <div>
        <input type="text" placeholder="Enter post Id" onChange={(i) => {
          setPostId(i.target.value);         
          }}/>
        </div>
        <button onClick={() => handleClick()}>Submit new comment</button>      
      <div>
        {data.post.comments.map(c => <div className='post'>
          <div>{c.body}</div>
          <div>By user: {c.user.email}</div>
          </div>)}
      </div>
      <div>
      {
      newComments.map((c) => 
              
        <div className='post'>
        <div>{c.body}</div>
        <div>By user: {c.userEmail}</div>
     </div>
      )}
      </div>      
    </>
  )
}
export default post;