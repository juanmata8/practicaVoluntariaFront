export type Comment = {
    id: string,
    body:string,
    createdAt:string,
    updatesAt:string,
    user: User,
    replies: Comment[]
}
export type Post = {
    
        id: string,
    title:string,
    body:string,
    imageUrl:string,
    createdAt:string,
    updatedAt:string,
    comments:Comment[]
}
export type post = {
    post: Post
}

export type posts = {
    posts: Post[];
  }
export type comments = {
    comments: Comment[]
}
export type User = {
    id:string,
    name:string,
    email:string,
    createdAt:string,
    updatesAt:string
}