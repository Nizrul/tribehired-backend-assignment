# TribeHired Backend Assignment

## Setup

1. Run `npm install` to install all the packages
2. Setup .env based on the .env.example
3. Either run `npm run start` or `npm run dev` to start the program

## Endpoints

- `GET /comments` to get a list of all comments
- `GET /comments/search?key=value` to search comments based on key and value
  - Keys are fields contained in comments, which are: postId, id, name, email, body
  - 'type' can also be passed as a query parameter, value can be either 'some' (or filter) or 'every' (and filter)
- `GET /posts` to gete a list of all posts
