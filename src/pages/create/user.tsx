import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import { gql, useMutation } from '@apollo/client';
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

const CREATEUSER = gql`
mutation createUser($name:String!, $email:String!, $password:String!){
    createUser(
      input: {
        name:$name
        email:$email
        password:$password
      }
    ){
      name
    }
  } 
`;
export default function createuser() {
    const [name1, setName] = useState<string>("")
    const [email1, setEmail] = useState<string>("")
    const [password1, setPassword] = useState<string>("")
    const [createUser, { loading, error }] = useMutation(CREATEUSER);

    if (loading) return 'Creating...';
    if(error) return `Creation error! ${error.message}`;

  return (
    <>
    
        <div>
        <input type="text"  placeholder="Enter name" onChange={(i) => {
          setName(i.target.value);         
          }}/>
        </div>
        <div>
        <input type="text"  placeholder="Enter email" onChange={(i) => {
          setEmail(i.target.value);         
          }}/>
        </div>
        <div>
        <input type="text"  placeholder="Enter password" onChange={(i) => {
          setPassword(i.target.value);         
          }}/>
        </div>
    
    
    
    <button onClick={() => createUser({ variables: { name: name1, email: email1, password: password1 } })} >Create user</button>
    
      
    </>
  )
}