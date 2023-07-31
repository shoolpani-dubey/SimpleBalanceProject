# Problem
1. Customer wants to see their monthly balance and cumulative balance
2. There is an API that is developed by another team. The API provides bank transactions which include amount transferred and date
3. Things to consider
* In this task there is no need to develop the API developed by another team
* How to design your application so that it is testable?
* If the application must be deployed to a server in remote location, how would you do it?


# Solution
1. Frontend: Developed in React using Vite.
   1. Single page with a date selector to select Month and year.
      1. On date select, call api to get and display monthly and cumulative total.
   2. API: Get ( /balance?date=<the date to show balance>)
      1. Returns an object json {
            monthlyTotal: <MonthlyTotal here>
            cumulativeTotal: <Cumulative Total here>
        }
2. Backend: Developed in Nestjs
   1. api(/balance?date=<>) implemented.
      1. This api will talk to a mock api ( thirdpartyapi ) to get amoount transferred and date.
      2. Calculates the monthly and cumulative amount and returns the same.

3. Thirdpartyapi:
   1. This will be developed as a mock meaning, a simple function that retuns the fixed result based on month.

4. Tests:
   1. The api is tested using Jest and multiple test cases are written
   2. The thirdpartyapi is mocked and tested.


# How to compile and build the application:
1. Local Dev:
   1. Client:
      1. cd client
      2. npm i
      3. npm run dev
      4. The client can be accessed at : http://127.0.0.1:5173
   2. Server:
      1. cd server
      2. npm i
      3. npm run start:dev
      4. The server is accessable at: http://localhost:3000/

2. Remote deployment:
   1. The deployment is done using docker.
   2. Build the image with command: 
      1. docker build . -t server01:tag01
      2. tag01 is the tag for the build.
   3. To send the image to remote you need to push the built and tagged image to an image registory. This can be done with below command: ( Assuming that myRegistry is your private registry.)
      1. docker tag server01:tag01 myRegistry.com/server01:tag01
      2. docker push myRegistry.com/server01:tag01
   4. Now you can pull the docker image in your remote box uisng command:
      1. docker pull myRegistry.com/server01:tag01
   5. And you can run the image using the command
      1. docker run -dp 127.0.0.1:3000:3000 server01:tag01
   6. Now you should be able to access the image using public ip of the box with port 3000.