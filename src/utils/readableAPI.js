const url = 'http://localhost:3001'

export const authString = 'whatever-you-want'

const headers = {
  'Accept': 'application/json',
  'Authorization': authString
}



export const fetchAllCategories = () =>
  fetch(`${url}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)
    

export const fetchCategoryPosts = (category) =>
  fetch(`${url}/${category}/posts`, { headers })
    .then(res => res.json())


export const fetchPosts = () =>
  fetch(`${url}/posts`, { headers })
    .then(res => res.json())

export const createPost = (body) =>
  fetch(`${url}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())


export const fetchPostDetail = (postId) =>
  fetch(`${url}/posts/${postId}`, { headers })
    .then(res => res.json())
    .then(data => data)

export const votePost = (postId, isUp) => {
  const body = {option: isUp ? 'upVote':'downVote'}
  return fetch(`${url}/posts/${postId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())
}


export const updatePost = (post) => {
  return fetch(`${url}/posts/${post.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  }).then(res => res.json())
}


export const deletePost = (postId) =>{
  return fetch(`${url}/posts/${postId}`, {
    method: 'DELETE',
    headers
  })
}

export const fetchComments = (postId) =>{
  return fetch(`${url}/posts/${postId}/comments`, { headers })
    .then(res => res.json())
}


export const createComment = (body) =>{
  
  console.log(body)
  return fetch(`${url}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res =>  res.json())
}

export const fetchCommentDetail = (commentId) =>{
  return fetch(`${url}/comments/${commentId}`, { headers })
    .then(res => res.json())
    .then(data => data)
}

export const updateComment = (commentId, timestamp, detail) =>{
  const requestBody = {'timestamp' : timestamp, 'body' : detail}
  return fetch(`${url}/comments/${commentId}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  }).then(res => res.json())
}

export const voteComment = (commentId, isUp) =>{
  const body = {option: isUp ? 'upVote':'downVote'}
  return fetch(`${url}/comments/${commentId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())
}

export const deleteComment = (commentId) =>{
  return fetch(`${url}/comments/${commentId}`, {
    method: 'DELETE',
    headers
  })
}