import uuidv4 from 'uuid/v4'

const Mutation = {
    createUser(parent,args,{db},info){
        const emailTaken = db.users.some((user) => user.email === args.data.email )
        
        if (emailTaken) {
            throw new Error('Email taken.')
        }

        const user = { id: uuidv4(), ...args.data }

        db.users.push(user)

        return user
    },
    deleteUser(parent,args,{db},info){
        const userIndex = db.users.findIndex(user => user.id === args.id)
        if (!userIndex === -1){ throw new Error('El usuario no existe') }
        
        const deletedUsers = users.splice(userIndex, 1)

        db.posts = db.posts.filter((post) => {
            const match = post.author === args.id
            if (match){
                comments = comments.filter((comment) => comment.post != post.id)
            }
            return !match
        })

        db.comments = db.comments.filter((comment) => comment.author !== args.id)

        return deletedUsers[0]
    },
    updateUser(parent,args,{db},info){
        const { id, data } = args
        const user = db.users.find((user) => user.id === id)
        if (!user){ throw new Error ('Usuario no existe') }

        if (typeof data.email === 'string'){
            const emailTaken = db.users.some((user) => user.email === data.email)
            if (emailTaken){ throw new Error('Email ya esta ocupado') }
            user.email = data.email
        }
        if (typeof data.name === 'string'){ user.name = data.name }
        if (typeof data.age !== 'undefined'){ user.age = data.age }

        return user
    },
    createPost(parent,args,{db},info){
        const userExist = db.users.some(user => user.id === args.data.author)
        if (!userExist){ throw new Error('El usuario no existe') }

        const post = { id: uuidv4(), ...args.data }

        db.posts.push(post)

        return post
    },
    deletePost(parent,args,{db},info){
        const postIndex = db.posts.findIndex((post) => post.id === args.id)
        if (postIndex === -1){ throw new Error('No existe el post') }

        const postDeleted = db.posts.splice(postIndex, 1)

        comments = db.comments.filter((comment) => comment.post !== args.id )

        return postDeleted[0]
    },
    createComment(parent,args,{db},info){
        const userExist = db.users.some(user => user.id === args.data.author)
        if (!userExist){ throw new Error('El usuario no existe') }

        const postExist = db.posts.some(post => post.id === args.data.post && post.published === true)
        if (!postExist){ throw new Error('El post no existe') }

        const comment = { id: uuidv4(), ...args.data }

        db.comments.push(comment)

        return comment
    },
    deleteComment(parent,args,{db},info){
        const commentIndex = db.comments.findIndex((comment) => comment.id === args.id)
        if (commentIndex === -1){ throw new Error('No existe el comentario') }

        const commentsDelated = db.comments.splice(commentIndex, 1)

        return commentsDelated[0]
    }
}

export {Mutation as default}