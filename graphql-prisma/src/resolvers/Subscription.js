const Subscription = {
    comment: {
        subscribe(parent,args,{db,pubsub},info){
            const post = db.posts.find((post) => post.id === args.postID )
            if (!post){ throw new Error('No existe el post') }
            
            return pubsub.asyncIterator(`comment ${args.postID}`)
        }
    },
    post: {
        subscribe(parent,args,{pubsub},info){
            return pubsub.asyncIterator('post')
        }
    }
}

export { Subscription as default }