# Free Lunch App
App developed with microservices based back-end and NextJS front-end.

**Test a live version of the App at [HERE](https://free-lunch.vercel.app)**


## Technology Stack
- [Node.js (Express)](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [RabbitMQ](https://www.rabbitmq.com/)
- [Nginx](https://www.nginx.com/)
- [NextJS](https://nextjs.org/)
- [Docker](https://www.docker.com/)

## Get Started
> Docker and Docker Compose are required.
- Clone the project
- Run :
  ```bash
  $ docker-compose build && docker-compose up
  ```
- Wait for all the services to start.
    > The process of connecting to **rabbitMQ** service may cause the other services to restart a couple of times.
- The app is available at [`http://localhost/`](http://localhost/)
    > Nginx uses the port 80 (TCP) make sure to have the port free

## App Services

### Kitchen

The kitchen service is in charge of recieving orders and assigning random dishes to it based on the number requested by the user, finally the order is passed to the inventory service. The kitchen service is connected to its own MongoDB Database (kitchen) with two collections: Orders and Recipes. 

### Inventory

The inventory service is in charge of checking the availability of the products specified in the order passed by the kitchen, reducing the required quantity and buying products if needed. The inventory service registers all the purchases and finally updates the state of the order from "received" to "dispatched". The inventory service is connected to its own MongoDB Database (inventory) with two collections: Products and Purchases.

### Services Communication
The communication between the servies is done through message broker, this allow to handle the unavailability of a service. In this project RabbitMQ is used as the message broker.
## Testing the Endpoints
To test all the available endpoints import the folder `postman-collection&environment` to Postman. It includes the base routes for both services as environment variables and the endpoints.

## Deployment Details

The services were deployed to Azure App Service using docker-compose with images allocated on Docker Hub to use a continuous deployment approach. The front-end were deployed on Vercel through its own repository.

## e2e Testing

To run the test on the services run:
```bash
$ npm run test:e2e
```
This will start the docker containers needed (MongoDB and RabbitMQ) and run the tests, after the test both containers will be stoped. The test are individual for each service, but the command is the same.

# Additional Information

To access to the RabbitMQ manager follow the link [`http://localhost:15672/`](http://localhost:15672/)

- Username: guest
- Passwork: guest

The connection URL to MongoDB is `mongodb://localhost:27017`

## Known Problems

> The Nginx server may not start correctly (502 badway responses), to solve reload the container.






