# voilasnap-api

## some api ideas

`GET /auth/signup` create account
`GET /auth/login` token
`GET /me` my infos (id, username)

`GET /friends` get my friends list
`PUT /friends/:id` add a friend/accept friend request
`DELETE /friends/:id` delete a friend/ignore friend request

`POST /messages` send a message to 1 or more
`GET /messages` get messages
`GET /messages/:id` read one-time message

### for later maybe if we want multiple people conversations

`POST /conversations` create convo with people `{participants:[xxx,yyy], participantsHash: 'xxxyyy'}`
`GET /conversations` get convo list
`POST /conversations/:id/messages` post message in convo
`GET /conversations/:id/messages` get messages in convo
`GET /conversations/:id/messages/:id` get message in convo
