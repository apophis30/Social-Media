# Aries Project

This Project is a social media application built using the MERN stack (MongoDB, Express.js, React, Node.js). This application allows users to register, customize their profiles, search for other users, follow/unfollow users, create posts, interact with posts, and chat in real-time.

## Project Structure
```sh
/Aries-Project
├── /client
│   ├── /components
│   ├── /pages
│   ├── /services
│   ├── /styles
│   └── /utils
├── /docs
├── /scripts
├── /server
│   ├── /config
│   ├── /controllers
│   ├── /models
│   ├── /routes
│   └── /utils
├── .gitignore
├── package.json
└── README.md
```

## Features

- User registration and authentication
- Profile customization
- User search functionality
- Follow/unfollow users
- Create, edit, delete posts
- Like and comment on posts
- Real-time chat functionality

## Prerequisites

- Node.js
- MongoDB

## Installation

1. Clone the repository:
```sh
   git clone https://github.com/apophis30/Social-Media.git
```
2.Install dependencies:

For the server:
```sh
    cd Aries-Project/server
    npm install
```
For the client:
```sh
    cd ../client
    npm install
```
3.Create a '.env' file in the server directory with the following content:
```sh
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
## Running the Application
1. Start the server:
```sh
   cd server
   npm start
```
2.Start the Client
```sh
  cd ../client
  npm start
```

## Folder Structure Details

## Table of Contents
- [Overview](#overview)
- [Folder Structure](#folder-structure)
  - [Client](#client)
  - [Server](#server)
  - [Docs](#docs)
  - [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Overview
Aries Reorganized is a project that is organized into a client and server structure. The client side is built using React and contains reusable components, pages, services, styles, and utilities. The server side is built with Node.js and Express, containing configuration files, controllers, models, routes, and utilities. The project also includes documentation and scripts for setup and automation.

## Folder Structure
```plaintext
Aries Reorganized/
│
├── client/
│   ├── components/        # Contains reusable React components
│   ├── pages/             # Contains React components for different pages
│   ├── services/          # Contains services for API calls
│   ├── styles/            # Contains CSS and styling files
│   └── utils/             # Contains utility functions and helpers
│
├── server/
│   ├── config/            # Contains configuration files
│   ├── controllers/       # Contains functions that handle requests and responses
│   ├── models/            # Contains Mongoose models
│   ├── routes/            # Contains route definitions
│   └── utils/             # Contains utility functions and helpers
│
├── docs/                  # Contains project documentation
│
├── scripts/               # Contains setup and automation scripts
│
└── README.md              # Project overview and setup instructions
```
## Contributing
Feel free to contribute by submitting issues or pull requests.

## License
No License yet!

## Acknowledgements
Acknowledgements or credits, if any.


