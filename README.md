# Problem
1. Customer wants to see their monthly balance and cumulative balance
2. There is an API that is developed by another team. The API provides bank transactions which include amount transferred and date
3. Things to consider
* In this task there is no need to develop the API developed by another team
* How to design your application so that it is testable?
* If the application must be deployed to a server in remote location, how would you do it?


# Solution
1. Assumptions:
   1. I have added an authentication layer that logs a fixed user in, if the correct credential is provided. User demo as both username and password.
   2. The login will return a jwt and that will be used with the balance rest api.
2. Frontend: Developed in React using Vite.
   1. Single page with a date selector to select Month and year.
      1. On date select, call api to get and display monthly and cumulative total.
   2. API: Get ( /balance?date=<the date to show balance>)
      1. Returns an object json {
            monthlyTotal: <MonthlyTotal here>
            cumulativeTotal: <Cumulative Total here>
        }
3. Backend: Developed in Nestjs
   1. api(/balance?date=<>) implemented.
      1. This api will talk to a mock api ( thirdpartyapi ) to get amount transferred and date.( Used jsonserver.io as mockserver to simulate the same.)
      2. Calculates the monthly and cumulative amount and returns the same.

4. Thirdpartyapi:
   1. This will be developed as a mock meaning, a simple function that retuns the fixed result as json .( Used jsonserver.io for the same.)

5. Tests:
   1. Server Unit and intigration Tests
      1. The api is tested using Jest and multiple test cases are written
      2. The thirdpartyapi is mocked and tested.
      3. All the test files have extention ".spec.ts".
      4. To run the tests:
         1. cd server
         2. npm run test
   2. Client Unit Tests
      1. All tests have extension ".test.tsx" or ".test.ts"
      2. To run the test:
         1. cd client
         2. npm run test


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
      3. Start the db server
         1. npm run start:dev:db
      4. npm run start:dev
      5. The server is accessable at: http://localhost:3000/

2. Remote deployment:
   1. Remote deployment for testing(dev/staging/qa)
      1. git clone the repository in the remote linux box.
      2. Then run below command to setup the server( assuming you have docker-compose installed)
         1. docker-compose up -d
      3. This will set up two different images
         1. First it will setup the database
         2. Second it will setup the backend which will also serve the front end files.
      4. Now find out your public url/ip address
      5. The website should be accessible at 
         1. http://<ip_address>:3000
   2. Remote deployment for production:
      1. First build the backed image to be deployed
         1. docker build . -t server01:tag01
      2. Now we send the image to an image repository like docker hub. Below commands help
         1. docker tag server01:tag01 myRegistry.com/server01:tag01
         2. docker push myRegistry.com/server01:tag01
      3. Next in the linux box where the production is to be done:
         1. We will pull the backend image that pushed to image repository.
            1.  docker pull myRegistry.com/server01:tag01
         2. Copy the docker-compose.prod.yml to the remote box and run below command
            1.  docker-compose -f docker-compose.prod.yml up -d
         3. Now the box's ip address. Now you should be able to access the application at below url:
            1.  http://<ip_address>:3000