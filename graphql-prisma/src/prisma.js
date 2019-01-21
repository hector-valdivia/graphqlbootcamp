import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://192.168.99.100:4466'
})

const createPostForUser = async (authorID, data) => {
    const userExist = prisma.exists.User({ id: authorID })
    if (!userExist){ throw new Error('No existe el usuario') }

    const post = await prisma.mutation.createPost({
        data: { 
            ...data,
            author: {
                connect: { id: authorID }
            }
        }
    }, '{ id title published author { name email } }')

    return post.author
}

const updatePostForUser = async (postID, data) => {
    const postExist = await prisma.exists.Post({ id: postID })
    if ( !postExist ){ throw new Error('El post no existe') }
    const post = await prisma.mutation.updatePost({
        data,
        where: { id: postID }
    }, '{ id title published author { id name } }')

    return post
}

/*
createPostForUser('cjr58z9sa001n0889jzorulwg', {
    title: "My new GraphQL post is",
    body: "You can find the new course here",
    published: true
}).then((user) => {
    console.log(JSON.stringify(user, undefined, 2))
})

updatePostForUser('cjr5p6gox004s0889rbstnjvq', { 
    title: 'My tittle of GraphQL', 
    published: true 
}).then((data) => {
    console.log(JSON.stringify(data, undefined, 2))
}).catch((error) => {
    console.log(error.message)
})
*/


/*
prisma.query.users(null, '{ id name posts { id title } }').then((data) => {
    console.log(JSON.stringify(data, undefined, 2))
})

prisma.query.comments(null, '{ text, author { name email } }').then((data) => {
    console.log(JSON.stringify(data, undefined, 2))
})

prisma.mutation.createPost({
    data: {
        title: "My new GraphQL post is",
        body: "You can find the new course here",
        published: true,
        author: {
            connect: { email: "hect.valdivia@gmail.com" }
        }
    }
}, '{ id title published author { id name } }').then((data) => {
    console.log(JSON.stringify(data, undefined, 2))
    return prisma.query.users(null, '{ id name posts { id title } }')
}).then((data) => {
    console.log(JSON.stringify(data, undefined, 2))
})
*/

/*
prisma.mutation.updatePost({
    data: { published: true },
    where: { id: "cjr59ap5600250889fq61dclu" }
}, '{ id title body published }')
.then((data) => {
    console.log(JSON.stringify(data, undefined, 2))
    return prisma.query.posts(null, '{ id title published }')
})
.then((data) => {
    console.log(JSON.stringify(data, undefined, 2))
})
*/