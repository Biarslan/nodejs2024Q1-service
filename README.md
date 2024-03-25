# Home Library Service

This is Home Library Service! Users can create, read, update, delete data about Artists, Tracks and Albums, add them to Favorites in their own Home Library!

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://docs.docker.com/engine/install/)

## Technical requirements

Use 20 LTS version of Node.js

## Downloading

```
git clone https://github.com/Biarslan/nodejs2024Q1-service
```

## Switch to development branch

```
git checkout development-part-2
```

## Running application
:warning: Rename .env.example into .env
```
npm run compose
```

## Check for vulnerabilities

```
npm run check
```

Server running on `http://localhost:{PORT}`
Default port is 4000. You can change PORT in `.env` file. There is `.env.example` file, rename and use it.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

# API Endpoints

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## User

- `/user`

  - `GET` - Get all users
  - `POST` - Creates a new user with payload:

    ```
    {
        "login": string,
        "password": string
    }
    ```

- `/user/{id}`
  - `GET` - Get single user by id
  - `PUT` - Updates a user's password by ID with payload:
    ```
    {
        "oldPassword": string,
        "newPassword": string
    }
    ```
  - `DELETE` - Deletes user by ID.

## Track

- `/track`

  - `GET` - Gets all library tracks list
  - `POST` - Add new track information with payload:

    ```
    {
        "name": string,
        "artistId": string,
        "albumId": string,
        "duration": number
    }
    ```

- `/track/{id}`
  - `GET` - Gets single track by id
  - `PUT` - Update library track information by UUID with payload:
    ```
    {
        "name": string,
        "artistId": string,
        "albumId": string,
        "duration": number
    }
    ```
  - `DELETE` - Delete track from library by ID.

## Album

- `/album`

  - `GET` - Gets all library albums list
  - `POST` - Add new album information with payload:

    ```
    {
        "name": string,
        "year": number,
        "artistId": string
    }
    ```

- `/album/{id}`
  - `GET` - Gets single album by id
  - `PUT` - Update library album information by UUID with payload:
    ```
    {
        "name": string,
        "year": number,
        "artistId": string
    }
    ```
  - `DELETE` - Delete album from library by ID.

## Artist

- `/artist`

  - `GET` - Gets all artists list
  - `POST` - Add new artist information with payload:

    ```
    {
        "name": string,
        "grammy": boolean
    }
    ```

- `/artist/{id}`
  - `GET` - Gets single artist by id
  - `PUT` - Update library artist information by UUID with payload:
    ```
    {
        "name": string,
        "grammy": boolean
    }
    ```
  - `DELETE` - Delete artist from library by ID.

## Favorites

- `/favs`
  - `GET` - Gets all favorites artists, tracks and albums
- `/favs/track/{id}`
  - `POST` - Add track with id to the favorites
  - `DELETE` - Delete track with id from favorites
- `/favs/album/{id}`
  - `POST` - Add album with id to the favorites
  - `DELETE` - Delete album with id from favorites
- `/favs/artist/{id}`
  - `POST` - Add artist with id to the favorites
  - `DELETE` - Delete artist with id from favorites

## Useful information

- When you delete Artist, Album or Track, it's id deletes from favorites (if was there) and references to it in other entities becoming null. For example: Artist is deleted => this artistId in corresponding Albums's and Track's become null + this artist's id is deleted from favorites, same logic for Album and Track.
- Non-existing entity can't be added to Favorites.
- User's password excluded from server response.
