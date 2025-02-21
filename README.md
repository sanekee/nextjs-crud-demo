# NextJS CRUD Demo

This is a CRUD demo project using Next.js.

## Features

* ✅ NextJS
* ✅ MongoDB
* ✅ Responsive (Tailwind CSS / Shadcn / TanStack)
* ✅ CRUD
* ✅ REST API

## Screenshots

| Desktop                    | Mobile                    |
|----------------------------|---------------------------|
|![](docs/images/desktop.png)|![](docs/images/mobile.png)|

## Video Demo

![](docs/images/demo.mp4)

## Sequence Diagram

```mermaid
sequenceDiagram
    participant Frontend
    participant Backend
    participant MongoDB

    %% List Users
    
    Frontend->>+Backend: GET /api/users
    Note left of Frontend: List Users
    Backend->>+MongoDB: Query users
    MongoDB-->>-Backend: Return user list
    Backend-->>-Frontend: Send user list

    %% Add New User

    Frontend->>+Backend: POST /api/users (user data)
    Note left of Frontend: Create User
    Backend->>+MongoDB: Insert new user
    MongoDB-->>-Backend: Acknowledgment
    Backend-->>-Frontend: User added success response
    
    %% View User

    Frontend->>+Backend: GET /api/users/[id]
    Note left of Frontend: View User
    Backend->>+MongoDB: Get user by ID
    MongoDB-->>-Backend: User detail
    Backend-->>-Frontend: User detail response

    %% Edit User
    
    Frontend->>+Backend: PUT /api/users/[id] (updated data)
    Note left of Frontend: Update User
    Backend->>+MongoDB: Update user by ID
    MongoDB-->>-Backend: Acknowledgment
    Backend-->>-Frontend: User updated success response
    

    %% Delete User

    Frontend->>+Backend: DELETE /api/users/[id]
    Note left of Frontend: Delete User
    Backend->>+MongoDB: Delete user by ID
    MongoDB-->>-Backend: Acknowledgment
    Backend-->>-Frontend: User deleted success response
```

## Running

**Prerequisites**
* ☑️[Docker](https://www.docker.com/)
* ☑️Docker Compose

Current demo is setup to run on *docker compose* environment. With built docker image and containerized Mongo DB.

To run:

```shell
docker compose up -d
```

Then browse to [http://localhost:3000](http://localhost:3000) to test the demo.

## Development

1. Devcontainer (Preferred)

A VSCode [devcontainer](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) is setup with a nodejs ready development environment. 

```shell
code .
```

If devcontainer extension is installed VSCode will prompt to open the project with devcontainer.

After devcontainer is started, we can continue to install shadcn

2. NodeJS Environment

Current development is run on NodeJS v22. Either installing manually or maintain nodejs version with NVM.

## Installing Shadcn

[Shadcn](https://github.com/shadcn-ui/ui) is a collection of reusable and customizable UI components library.

To install

```shell
## installing the command line
npx shadcn@latest init

## installing components used in the project
shadcn add button dropdown-menu input popover skeleton table
```


## Seeding DB

To seed the DB

```shell
# update app/scripts/seed.ts and change number of records
yarn seed
```
