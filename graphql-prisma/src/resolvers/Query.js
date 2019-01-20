const Query = {
    users(parent, args, {db}, info){
        if (!args.query){
            return db.users
        }

        return db.users.filter((user) => {
            return user.name.toLowerCase().includes(args.query.toLowerCase())
        })
    },
    me(){
        return users[0]
    },
    posts(parent, args, {db}, info){
        if(!args.query){
            return db.posts
        }

        return db.posts.filter((post) => {
            let title = post.title.toLocaleLowerCase().includes(args.query.toLocaleLowerCase())
            let body = post.body.toLocaleLowerCase().includes(args.query.toLocaleLowerCase())

            return title || body
        })
    },
    comments(parent, args, {db}, info){
        if (!args.post && !args.user){
            return db.comments
        }

        return db.comments.filter((comment) => {
            let post = comment.post === args.post
            let user = comment.author === user.id
            return post || user
        })
    }
}

export {Query as default}