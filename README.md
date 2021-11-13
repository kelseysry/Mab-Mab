# Mab Mab 

![Home Page of Mab Mab](https://res.cloudinary.com/mabmab/image/upload/v1636833234/khmer_food/home_piicjk.png)

[Mab Mab](https://yelp-clone-kelsey-sry.herokuapp.com/)

## Summary 

[Mab Mab](https://yelp-clone-kelsey-sry.herokuapp.com/) 
is a website build off the idea of yelp.com but focuses solely on restaurants in Phnom Penh. Mab Mab was created by using React, Redux, Express, and PostgreSQL. Anyone who uses Mab Mab can do the following: 

- Sign up 
- Login and Log out
- Login as a demo user 
- View, add, delete, and edit restaurants. 
- View and add a review for a restaurant. 
- View the location of the restaurant on Google maps 


## Instructions on How to Install Mab Mab app 
1. run git clone 
2. run npm install in the root directory 
3. cd frontend, run npm install
4. cd backend, run npm install 
5. in the backend directory create a .env file. There is a .env.example that you can follow to structure the .env file. 
  - To generate a MAPS_API_KEY you must use your google account
    1. Create a Google developers project
    2. Enable Maps ....

6. in your backend directory, run the following commands:  
  -  npx dotenv sequelize-cli db:create
  -  npx dotenv sequelize-cli db:migrate
  -  npx dotenv sequelize-cli db:seed:all
