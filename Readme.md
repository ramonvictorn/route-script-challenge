# route-script-challenge
  This is a project to help the route planning. For example deliveries, and you can save the routes and see after 

![Login Page](src/web/public/assets/images/LoginPagePrint.png)

![Route Example](src/web/public/assets/images/DirectionPage.png)

# Setting up
Go to **src/config/settings.js** and set the file **with you configuration**.

# To run:

In project directory run the followings commands to install the dependencies: 
`npm install -D`
`npm install `

And this to run the app:
`npm start`

  

And see on **localhost:4545**



# Creating the user
After see the page, you need create the first user, for this, user the route **api/user** with the params:
email
name
password
key  <-This is the private key put on setting file


# Requirements

Nodejs 8.10 or >

**
### Warns
If you run in docker container, not is recommended to database in containers**