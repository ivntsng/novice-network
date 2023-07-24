# Journal

## June 27, 2023

Today, I worked on:

* Planning api for posts

I'm responsible for Posts api. The user stories I come up with include "as a
user, I can create a post," "as a owner of a post, I can edit my post," "as a owner of a post, I can delete my post," and "as a user, I can see all the posts"

## June 29, 2023

Today, I worked on:

* Create posts endpoint

The thing that's blocking me is how to add user data to my posts. I watch Curtis' video about FastAPI - Complex Models, I kinda understand that I can create a class that has user models in it then use it as a type of data in my posts base model. Then I have to also think of how two databases connect to each other in order to get user as foreign key

## July 10, 2023

Today, I finished

* posts endpoints (create, get one, get all, update, and delete posts)

I finished the endpoints for posts. THe only thing that I need to figure out is getting the user information into a post they create right now I have owner_id as a placeholder. I started working on the front end for post. I got the post list running. Not what's I hope for but I'll look into bootstrap more after I got the create post form done. I also look into authentication and I will bring it up to the team tomorrow.

## July 14, 2023

I've made a good progress on my part of the project. I finished front end for create post, post detail, and post list. In the past 3 days. Yesterday I was working on backend Auth and was able to figure it out. I handed over to other group members to handle frontend auth

## July 17, 2023

I added delete and edit buttons for post. I got the front end done for both so I finished CRUD for posts.
I also helped edit the backend endpoint for comments which connect to the posts.

## July 20, 2023

After helped the team figure out the frontend auth and handleUserData using useContext, I edited by code to be able to bring in username instead of user_id from UserData from token. I also finished coding unit test for get post and create post
