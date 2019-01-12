import {GraphQLServer} from 'graphql-yoga'
import uuidv4 from 'uuid/v4' 

// Scalar types - String, Boolean, Int, Float, ID

const users = [
    { id: '1', name: 'Hector', email: 'hect.valdivia@gmail.com', age: 29 },
    { id: '2', name: 'Caguamo', email: 'caguamo@example.com' },
    { id: '3', name: 'Mike', email: 'mike@example.com', age: 28 }
]

const posts = [
    { id: '1', title: 'Titulo 1',  body: 'Un pinche contenido', published: true , author: '1'},
    { id: '2', title: 'Titulo 2',  body: 'Un pinche contenido', published: true , author: '1'},
    { id: '3', title: 'Titulo 3',  body: 'Un pinche contenido', published: false , author: '3'},
    { id: '4', title: 'Titulo 4',  body: 'Un pinche contenido', published: true , author: '1'},
    { id: '5', title: 'Titulo 5',  body: 'Un pinche contenido', published: false , author: '2'},
    { id: '6', title: 'Titulo 6',  body: 'Un pinche contenido', published: true , author: '2'},
    { id: '7', title: 'Titulo 7',  body: 'Un pinche contenido', published: true, author: '2' }
]

const comments = [
    { id: '1', text: 'El comentario', author: '1', post: '1' },
    { id: '2', text: 'Yo tambien participo', author: '2', post: '1' },
    { id: '3', text: 'Completando la cosas', author: '3', post: '1' },
    { id: '4', text: 'El comentario', author: '1', post: '2' },
    { id: '5', text: 'El comentario', author: '1', post: '3' },
    { id: '6', text: 'El comentario', author: '1', post: '4' },
    { id: '7', text: 'El comentario', author: '1', post: '5' },
    { id: '8', text: 'El comentario', author: '1', post: '6' }
]

//Type definitions (schema)
const typeDefs = `
    type Query {
        add(numbers:[Float!]!): Float!,
        users(query: String): [User!]!,
        posts(query: String): [Post!]!,
        me: User!,
        post: Post!
        comments(post: String, user: String): [Comment!]!
    }

    type Mutation {
        createUser(data: CreateUserInput): User!,
        createPost(data: CreatePostInput): Post!
        createComment(data: CreateCommentInput): Comment!
    }

    input CreateUserInput {
        name: String!
        email: String!
        age: Int
    }

    input CreatePostInput {
        title: String!, 
        body: String!, 
        published: Boolean!, 
        author: ID!
    }

    input CreateCommentInput {
        text: String!, 
        author: ID!, 
        post: ID!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String
        published: Boolean!
        author: User!
        comments: [Comment!]!
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
    }
`
//Resolvers
const resolvers = {
    Query: {
        users(parent, args, ctx, info){
            if (!args.query){
                return users
            }

            return users.filter((user) => {
                return user.name.toLowerCase().includes(args.query.toLowerCase())
            })
        },
        me(){
            return users[0]
        },
        posts(parent, args, ctx, info){
            if(!args.query){
                return posts
            }

            return posts.filter((post) => {
                let title = post.title.toLocaleLowerCase().includes(args.query.toLocaleLowerCase())
                let body = post.body.toLocaleLowerCase().includes(args.query.toLocaleLowerCase())

                return title || body
            })
        },
        post(){
            return {
                id: '12345',
                title: 'Titulo',
                body: null,
                published: false
            }
        },
        comments(parent, args, ctx, info){
            if (!args.post && !args.user){
                return comments
            }

            return comments.filter((comment) => {
                let post = comment.post === args.post
                let user = comment.author === user.id
                return post || user
            })
        },
        add(parent, args, ctx, info){
            if (args.numbers.length == 0){ return 0 }
            return args.numbers.reduce((acc, cc) => acc + cc)
        }
    },
    Mutation: {
        createUser(parent,args,ctx,info){
            const emailTaken = users.some((user) => user.email === args.data.email )
            
            if (emailTaken) {
                throw new Error('Email taken.')
            }

            const user = { id: uuidv4(), ...args.data }

            users.push(user)

            return user
        },
        createPost(parent,args,ctx,info){
            const userExist = users.some(user => user.id === args.data.author)
            if (!userExist){ throw new Error('El usuario no existe') }

            const post = { id: uuidv4(), ...args.data }

            posts.push(post)

            return post
        },
        createComment(parent,args,ctx,info){
            const userExist = users.some(user => user.id === args.data.author)
            if (!userExist){ throw new Error('El usuario no existe') }

            const postExist = posts.some(post => post.id === args.data.post && post.published === true)
            if (!postExist){ throw new Error('El post no existe') }

            const comment = { id: uuidv4(), ...args.data }

            comments.push(comment)

            return comment
        }
    },
    Post: {
        author(parent,args,ctx,info){
            return users.find((user) => user.id === parent.author )
        },
        comments(parent, args, ctx, info){
            return comments.filter((comment) => {
                return comment.post === parent.id
            })
        }
    },
    User: {
        posts(parent, args, ctx, info){
            return posts.filter((post) => {
                return parent.id === post.author
            })
        },
        comments(parent, args, ctx, info){
            return comments.filter((comment) => {
                return comment.author === parent.id
            })
        }
    },
    Comment: {
        author(parent, args, ctx, info){
            return users.find((user) => {
                return user.id === parent.author
            })
        },
        post(parent, args, ctx, info){
            return posts.find((post) => post.id === parent.post )
        }
    }
    
}

const server = new GraphQLServer({ typeDefs, resolvers })

server.start(() => {
    console.log('the server is running!!')
})