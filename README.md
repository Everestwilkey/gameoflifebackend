# Overview

208Trader is a project that I'm hoping to work on that is the Craigslist for Idaho. I'm hoping to learn a lot about front end and back end development from my efforts. I split up this project into very small simple steps 1 putting the back end together then I'm going to choose a front end after I'm done choosing a front end I'm going to be able to put both of them together  and release a full stack product.

The software that I wrote for the back end on this website was to enable users to be created and deleted to do proper permissions such as admin and a basic user as well as being able to update any element. And allow users to connect up to my database and save all that information so when they log back in that they can access all their user info as well as any posts that they had made. This integrates with MongoDB and it allows users to sign up that will send us a JSON file with the user's ID password so on and so forth as well as that password is protected by a hash so that way no one can take their password as well as taking proper precautions to not let certain things like passwords get returned to the website on a request

The reason why I wrote this is I wanted to understand how backends work as well as I wanted to be able to create and develop my own back end so that way when I push this product to production I know what I'm doing and I know what the back end is actually doing so that way I can make changes and adjustments to either increase performance or increased security rather than just letting another back end as a service be used this allows me flexibility in what I want it to do.




[208Trader Backend Demo](https://youtu.be/rrxxNUaAvWw)

# Cloud Database

The cloud database I'm using is called mongo DB and in conjunction with a package called uh Mongoose it enables me to do a lot of database creation easily and quickly as well as there's a lot of built-in features that are really nice to have like IDs that our auto built and being able to create user schemas within your back end and then the database to update really quickly and make a new table.

Mongo DB is a JSON oriented file database where you can have tables that are related to each other in a hierarchical manner so for instance you could have your website name and then you could have posts and users linked to the website name as well as underneath that you could have other tables linked to that but it's very hierarchical structure when it comes to this database
# Development Environment

The tools I used for this are VS code and postman. VS code is a integrated development environment being able to run a terminal and all your code within one environment. Postman is a way to do request so send and receive update delete to test your back end.

The programming language I chose was JavaScript because that was the most popular and the stack that I'm using the mern stack uses express as the server that communicates to your database and all the files were typed in JavaScript.

Some of the libraries they used one was called express this just allows me to create a server the next one I used is Mongoose is a object data modeling library for mongo DB which allows me to create my user schemas really quickly and easily and have a way to manage relationships and provide ways for schema validation. The next one I used was called JWT this create a token that then we can use for cookies so that way the user doesn't have to always constantly keep logging in. The last one that is most notable that I used is called Bcrypt this allows us to hash our passwords and check those hash passwords to make sure that they are valid to whatever user that is signing in and that just enables us to add another layer of security so that way when we're sending requests and receiving data back that data if it could potentially be accessed that it's still being protected from any malicious user.


# Useful Websites

{Make a list of websites that you found helpful in this project}

- [Udemy tutorial on how to make MERN stack Backend and front end](https://www.udemy.com/course/mern-stack-course-mongodb-express-react-and-nodejs/learn/lecture/38853806#questions)
- [Mongo DB](https://www.mongodb.com/)
- [Post Man download](https://www.postman.com/downloads/)
- [Npm Bcrypt.js ](https://www.npmjs.com/package/bcryptjs)

# Packages I installed
    "bcryptjs": "^2.4.3",
    "cloudinary": "^2.0.1",
    "concurrently": "^8.2.2",
    "cookie-parser": "^1.4.6",
    "dayjs": "^1.11.10",
    "dotenv": "^16.4.1",
    "express": "^4.18.2",
    "express-async-errors": "^3.1.1",
    "express-mongo-sanitize": "^2.2.0",
    "express-rate-limit": "^7.1.5",
    "express-validator": "^7.0.1",
    "helmet": "^7.1.0",
    "http-status-codes": "^2.3.0",
    "jsonwebtoken": "^9.0.2",
    "mongodb": "^6.3.0",
    "mongoose": "^8.1.1",
    "morgan": "^1.10.0",
    "multer": "^1.4.5-lts.1",
    "nanoid": "^5.0.5",
    "nodemon": "^3.0.3"0


# Future Work


Things I hope to improve 
- My organization I hope to improve the file structure
- Create the rest of a schema database in order to accept images
- Build out the crud for accepting images for posts
- Creating a search method in order to search for posts within a certain genre.

