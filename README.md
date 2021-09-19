# URL Shortener Backend

Backend for a simple URL Shortener in Node.js and MongoDB

# Getting Started

## Environment Variables

The variables used by the project are in the *.env.example* file, please rename it to *.env* and overwrite the values as desired.

## Installation

### With Docker Compose

The easiest way to set-up and start the project is to use Docker Compose. Just run the following command inside the repository directory:

```
docker compose up
```

The Node.js application will start running at *localhost:$PORT*.

### Local Installation

### Software Requirements

This project requires [Node.js](https://nodejs.org/en/) and [MongoDB](https://www.mongodb.com/pt-br).

### Importing the External Variables into the Working Shell

Run the following command to export all the variables inside the *.env* file to your current Shell session:

```
export $(xargs < .env)
```

### Database Setup

After installing MongoDB, run the following command to create the application database:

```
sh database/scripts/setup-db.sh
```

### Application Setup

To install the libraries and requirements for Node.js, run:

```
npm install
```

### Running the Application

To run the application in development mode, use:

```
npm dev
```

To run the application in production mode, use:

```
npm start
```

Both commands will start the app at *localhost:$PORT*