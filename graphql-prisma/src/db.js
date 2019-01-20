let users = [
    { id: '1', name: 'Hector', email: 'hect.valdivia@gmail.com', age: 29 },
    { id: '2', name: 'Caguamo', email: 'caguamo@example.com' },
    { id: '3', name: 'Mike', email: 'mike@example.com', age: 28 }
]

let posts = [
    { id: '1', title: 'Titulo 1',  body: 'Un pinche contenido', published: true , author: '1'},
    { id: '2', title: 'Titulo 2',  body: 'Un pinche contenido', published: true , author: '1'},
    { id: '3', title: 'Titulo 3',  body: 'Un pinche contenido', published: false , author: '3'},
    { id: '4', title: 'Titulo 4',  body: 'Un pinche contenido', published: true , author: '1'},
    { id: '5', title: 'Titulo 5',  body: 'Un pinche contenido', published: false , author: '2'},
    { id: '6', title: 'Titulo 6',  body: 'Un pinche contenido', published: true , author: '2'},
    { id: '7', title: 'Titulo 7',  body: 'Un pinche contenido', published: true, author: '2' }
]

let comments = [
    { id: '1', text: 'El comentario', author: '1', post: '1' },
    { id: '2', text: 'Yo tambien participo', author: '2', post: '1' },
    { id: '3', text: 'Completando la cosas', author: '3', post: '1' },
    { id: '4', text: 'El comentario', author: '1', post: '2' },
    { id: '5', text: 'El comentario', author: '1', post: '3' },
    { id: '6', text: 'El comentario', author: '1', post: '4' },
    { id: '7', text: 'El comentario', author: '1', post: '5' },
    { id: '8', text: 'El comentario', author: '1', post: '6' }
]

const db = { users, posts, comments }

export { db as default }