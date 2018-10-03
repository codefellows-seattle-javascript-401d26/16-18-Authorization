# 16: Basic Auth - app.js
##### restful HTTP server built with express, mongodb, mongoose, and basic auth
[![Build Status](https://travis-ci.com/bgwest/16-18-Authorization.svg?branch=master)](https://travis-ci.com/bgwest/16-18-Authorization)
## Current Features

These methods currently exist for creating, changing, deleting, and getting user data. This latest release includes the ability to singup and login using basic auth http/jsonwebtokens.

Updates to this API will continue to stream in as this project moves forward. Currently I am part 16 of 18.

##### Note: 
Using a database (mongodb) and ORM (mongoose) to perform the data processing, a new 'many' resource (schema) has been added called blog-post-schema.

Each user can now manage their user account and also create, update, get, and delete blog posts.

A user can now signup for a new account and receive a webtoken to be re-issued each login.
##### Also note: 
new npm scripts have been added including a bash script to easily manage the devDb: devDbOff, dbDevOn (see package.json)

##### working routes & their methods:
user-router.js,
blog-post-router.js,
auth-router.js
* PUT
* DELETE
* POST
* GET

*and all of their wonderful variations...*

##### Utilizing:
* express
* middleware e.g. body-parser
* mongodb
* mongoose
* jwt

## How To

#### Example testing with just jest:

```
npm run devDbOn
npm run justJest
npm run devDbOff
```

#### Example testing manually via cli:

```
npm run devDbOn
npm run start-server
````

## User Auth Account manual testing

[x] signup

```
[0]Benjamins-MBP:16-18-Authorization bwest$ echo '{"username":"bgwest88","password":"testing","email":"bgwest88@gmail.com"}' | http localhost:3000/user/signup
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 479
Content-Type: application/json; charset=utf-8
Date: Wed, 03 Oct 2018 19:53:36 GMT
ETag: W/"1df-UJ6S/YNotpGafsvYA23YFYjP2wc"
X-Powered-By: Express

{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlblNlZWQiOiJmZTIzNDJiOTg0ZmFjYTg0OTBmYzRkMWI5NTkyZmI2ZTY5MzBiY2FhZmNmN2Q3ZWZjYTA3ODZiOWEwZjM2ZmY4MTM0MWI1NWJhNWYzYTMyYTNlNDNkMjU4MWM5YmRmZTE0MWFkYjA2Y2Y2MjRkNjhmMmRlZDlhOWYwYmY4YTk5NWYzY2I1ZmUyZjc4YzM5NmZjYjY3NzlkZjVjMmNmMWI0YWM3NWM4ZDJiZTEzOGIyZjQwYzRhMjdhNGIzMjhiMWRmNmU5ZDg0OGQ2ZGI0NDZmMjg0YTQxYWUxMGRmMTZlMmEzNDRjZjY2NWIyODY2YjBiNDI4ZjRkOGFmNzA3M2RhIiwiaWF0IjoxNTM4NTk2NDE2fQ.Yh777pTKYRTcjpfMUQLxv0wYsHAWpzXcJiwvfuKBk9I"
}

[0]Benjamins-MBP:16-18-Authorization bwest$
```

[x] After signing up, login again using GET / HTTP Basic Auth

```
[0]Benjamins-MBP:16-18-Authorization bwest$ http -a bgwest88:testing localhost:3000/user/auth/login
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 479
Content-Type: application/json; charset=utf-8
Date: Wed, 03 Oct 2018 20:36:50 GMT
ETag: W/"1df-kdElK1XhmQrDGOlRA3DNy6pyras"
X-Powered-By: Express

{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlblNlZWQiOiI1Nzk5YzliYjU5NDA0NTE2YTFiNDM0MTkzMzcxMTIxNmQwNmMwZjM5MmQ3NmE2ZWZiMzM1N2YxZGVlZmMyZDY5OTU0Y2RiZjkxODQ1NTc5MjNmYjU1YmIwNDc5ZGM1NTEwYWU1MGIyMmUxZjBhZDViNzc3NjUwZGI1NTI0YmIwNjAxM2NmMGQ1MWQyYTA0MmYyZjQ5OWU2NzA2ZWM5NDBmMjViY2Y5ODM5OGUzN2EyNmZiY2EzNTk2NjNlYmUxMDc2NmI0Nzg2NDRjODE1MDhiZTllNmIwZGIxY2EzZjhjZmY0NjU1NDFiNzZiZTAzM2VlNTU5YzMzZjY4ZGQ2MzU5IiwiaWF0IjoxNTM4NTk5MDEwfQ.A1fl9AXFLWx60XWkp8RMEY77zjJ4lBsn5lHkH_IWUoE"
}

[0]Benjamins-MBP:16-18-Authorization bwest$
```

## Blogpost manual testing

*please note...*

*a user must be created first in order to create a blog relationship. please keep this in mind when testing.*

[x] adding a blog post to a set user:

```
[0]Benjamins-MacBook-Pro:11-14-express-api bwest$ echo '{"title":"My new blog post #1!","user":"5bb447525459ef3fbf11cecf"}' | http :3000/user/blog-posts
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 146
Content-Type: application/json; charset=utf-8
Date: Wed, 03 Oct 2018 04:37:46 GMT
ETag: W/"92-7+jlelY76eIRGCn0tUCrBNV265s"
X-Powered-By: Express

{
    "__v": 0,
    "_id": "5bb4479a5459ef3fbf11ced0",
    "timestamp": "2018-10-03T04:37:46.830Z",
    "title": "My new blog post #1!",
    "user": "5bb447525459ef3fbf11cecf"
}

[0]Benjamins-MacBook-Pro:11-14-express-api bwest$
```
*blog POST note... do not try and add content field on initial blog post creation.. only add content when doing a PUT (update)*

[x] updating a blog post from a set user:

```
[0]Benjamins-MacBook-Pro:11-14-express-api bwest$ echo '{"title":"blog#5","content":"testing content input"}' | http PUT :3000/user/blog-posts/5bb4479a5459ef3fbf11ced0
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 166
Content-Type: application/json; charset=utf-8
Date: Wed, 03 Oct 2018 04:43:46 GMT
ETag: W/"a6-RoeyFewAgY9BwqiAiPbjPXPMvec"
X-Powered-By: Express

{
    "__v": 0,
    "_id": "5bb4479a5459ef3fbf11ced0",
    "content": "testing content input",
    "timestamp": "2018-10-03T04:37:46.830Z",
    "title": "blog#5",
    "user": "5bb447525459ef3fbf11cecf"
}

[0]Benjamins-MacBook-Pro:11-14-express-api bwest$
```

[x] getting a blog post from a set user:

```
[0]Benjamins-MacBook-Pro:11-14-express-api bwest$ http :3000/user/blog-posts/5bb4479a5459ef3fbf11ced0
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 166
Content-Type: application/json; charset=utf-8
Date: Wed, 03 Oct 2018 04:44:22 GMT
ETag: W/"a6-RoeyFewAgY9BwqiAiPbjPXPMvec"
X-Powered-By: Express

{
    "__v": 0,
    "_id": "5bb4479a5459ef3fbf11ced0",
    "content": "testing content input",
    "timestamp": "2018-10-03T04:37:46.830Z",
    "title": "blog#5",
    "user": "5bb447525459ef3fbf11cecf"
}

[0]Benjamins-MacBook-Pro:11-14-express-api bwest$
```

[x] deleting a blog post from a set user:

```
[0]Benjamins-MacBook-Pro:11-14-express-api bwest$ http DELETE :3000/user/blog-posts/5bb4479a5459ef3fbf11ced0
HTTP/1.1 201 Created
Connection: keep-alive
Content-Length: 63
Content-Type: application/json; charset=utf-8
Date: Wed, 03 Oct 2018 04:44:44 GMT
ETag: W/"3f-JyF6HTapnZbTVLWrOWeTSGSVWBs"
X-Powered-By: Express

{
    "id": "5bb4479a5459ef3fbf11ced0",
    "message": "Blog Post deleted"
}

[0]Benjamins-MacBook-Pro:11-14-express-api bwest$
```

## User manual testing

[x] adding a new user:

```
[0]Benjamins-MacBook-Pro:11-14-express-api bwest$ echo '{"username":"bgwest88","title":"Sysadmin / Junior Developer"}' | http :4000/new/user
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 144
Content-Type: application/json; charset=utf-8
Date: Tue, 25 Sep 2018 06:54:34 GMT
ETag: W/"90-LLpHzRldFPFhSRrXm3vrZQTYo1A"
X-Powered-By: Express

{
    "id": "dc490770-c08f-11e8-b135-53ec14e4e3ad",
    "timestamp": "2018-09-25T06:54:34.343Z",
    "title": "Sysadmin / Junior Developer",
    "username": "bgwest88"
}

[0]Benjamins-MacBook-Pro:11-14-express-api bwest$ 

```

[x] Get (login) as user:

```

[0]Benjamins-MacBook-Pro:11-14-express-api bwest$ http :4000/login/dc490770-c08f-11e8-b135-53ec14e4e3ad
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 144
Content-Type: application/json; charset=utf-8
Date: Tue, 25 Sep 2018 06:54:50 GMT
ETag: W/"90-LLpHzRldFPFhSRrXm3vrZQTYo1A"
X-Powered-By: Express

{
    "id": "dc490770-c08f-11e8-b135-53ec14e4e3ad",
    "timestamp": "2018-09-25T06:54:34.343Z",
    "title": "Sysadmin / Junior Developer",
    "username": "bgwest88"
}

[0]Benjamins-MacBook-Pro:11-14-express-api bwest$ 

```

[x] DELETE user(s)

```

[0]Benjamins-MacBook-Pro:11-14-express-api bwest$ 
[0]Benjamins-MacBook-Pro:11-14-express-api bwest$ http DELETE :4000/login/dc490770-c08f-11e8-b135-53ec14e4e3ad
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 16
Content-Type: application/json; charset=utf-8
Date: Tue, 25 Sep 2018 06:54:59 GMT
ETag: W/"10-NvZpOWfE+ZpvRWHKpNnxdbE9my4"
X-Powered-By: Express

{
    "level": "info"
}

[0]Benjamins-MacBook-Pro:11-14-express-api bwest$ http DELETE :4000/login/dc490770-c08f-11e8-b135-53ec14e4e3ad
HTTP/1.1 404 Not Found
Connection: keep-alive
Content-Length: 16
Content-Type: application/json; charset=utf-8
Date: Tue, 25 Sep 2018 06:55:03 GMT
ETag: W/"10-NvZpOWfE+ZpvRWHKpNnxdbE9my4"
X-Powered-By: Express

{
    "level": "info"
}

[0]Benjamins-MacBook-Pro:11-14-express-api bwest$

```

note the second time level: info was returned again because user was deleted.

output from server log:

```

info: DELETE - /login/([$id])
info: Attempting delete on: dc490770-c08f-11e8-b135-53ec14e4e3ad
info: current user list:
{ 'dc490770-c08f-11e8-b135-53ec14e4e3ad':
   User {
     id: 'dc490770-c08f-11e8-b135-53ec14e4e3ad',
     timestamp: 2018-09-25T06:54:34.343Z,
     username: 'bgwest88',
     title: 'Sysadmin / Junior Developer' },
  level: 'info',
  [Symbol(level)]: 'info',
  [Symbol(message)]:
   '{"dc490770-c08f-11e8-b135-53ec14e4e3ad":{"id":"dc490770-c08f-11e8-b135-53ec14e4e3ad","timestamp":"2018-09-25T06:54:34.343Z","username":"bgwest88","title":"Sysadmin / Junior Developer"},"level":"info"}' }
info: 200 - user removed.
info: DELETE - /login/([$id])
info: Attempting delete on: dc490770-c08f-11e8-b135-53ec14e4e3ad
info: 404 - User was not found.

```

[x] PUT (update) user

```

[0]Benjamins-MacBook-Pro:Repositories bwest$ 
[0]Benjamins-MacBook-Pro:Repositories bwest$ echo '{"username":"ello"}' | http PUT :4000/login/0a390800-c159-11e8-b994-67f2fbd1d839
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 140
Content-Type: application/json; charset=utf-8
Date: Wed, 26 Sep 2018 06:54:59 GMT
ETag: W/"8c-aiPTqI4hIIvWjj2c6jUB1A3fRNk"
X-Powered-By: Express

{
    "id": "0a390800-c159-11e8-b994-67f2fbd1d839",
    "timestamp": "2018-09-26T06:54:40.257Z",
    "title": "Sysadmin / Junior Developer",
    "username": "ello"
}

[0]Benjamins-MacBook-Pro:Repositories bwest$

```

### Tests Performed with Jest

###### testing app.js routes and responses.

##### user-router.test.js

* 1: create user - should respond 200 and return a new user in json

* 2: attempt POST with no content to send - should receive 400

* 3: send GET for matching id - should respond with 200 && json a note

* 4: attempt 'valid' GET request with an invalid id - should receive 404

* 5: test PUT method - should return updated body && 200 status

* 6: test PUT method in the case where no body content is provided - should return 400

* 7: attempt user creation and then deletion - successful delete should return 201

* 8: attempt to delete with bad ID - should return 404

##### blog-post-router.test.js

* 9: creating mock blogPost with mock user, using super agent for PUT update, and response should be 200 status

* 10: create a mock blog post and try to get that post be sending it's id

* 11: create a mock user and send it a blog post

* 12: creating mock blog post / user and then deleting it

#### auth-router.js

* 13: 

* 14: 

* 15: 

* 16: 

### Installing

To use this in your code:

- git clone repo 
- npm install 
- require('../src/app.js')

## Built With

* es6
* NodeJS (fs, dotenv, express, http-errors)
* body-parser
* winston
* Eslint
* jest
* faker
* superagent
* uuid
* bcrypt
* jsonwebtoken
* crypto

See package.json for dependency details.

## Contributing

Please feel free to contribute. Master branch auto merge locked for approval for non-contributors.

## Versioning

*n/a*

## Authors

![CF](http://i.imgur.com/7v5ASc8.png) **Benjamin West** 

## License

*none*
