import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import { gql, useMutation } from '@apollo/client';
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

const CREATEPOST = gql`
mutation createPost($title:String!, $body:String!, $imageUrl:String!) {
    createPost(
      input: {
        title: $title,
        body: $body,
        imageUrl: $imageUrl
      }     
    ){
      title
    }
  }
`;
export default function createpost() {
    const [title1, setTitle] = useState<string>("")
    const [body1, setBody] = useState<string>("")
    const [imageUrl1, setImageUrl] = useState<string>("")
    const [createpost, { loading, error }] = useMutation(CREATEPOST);

    if (loading) return 'Creating...';

    if (error) return `Creation error! ${error.message}`;

    
  return (
    <>
    
        <div>
        <input type="text" placeholder="Enter title" onChange={(i) => {
          setTitle(i.target.value);         
          }}/>
        </div>
        <div>
        <input type="text" placeholder="Enter body" onChange={(i) => {
          setBody(i.target.value);         
          }}/>
        </div>
        <div>
        <input type="text" placeholder="Enter image url" onChange={(i) => {
          setImageUrl(i.target.value);         
          }}/>
        </div>
    
    
    
    <button onClick={() => createpost({ variables: { title: title1, body: body1, imageUrl: imageUrl1 } })} >Create</button>
    
      
    </>
  )
}