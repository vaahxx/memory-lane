## Application Overview - Memory Lane

This web app's primary purpose is to create and share memories.
For this project, I utilized the following technologies:

- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Flowbite](https://flowbite.com/)
- [Jest](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/)
- [SQLite](https://www.sqlite.org/)

While it's true that employing Next.js may be perceived as overengineering, the main point here is not only to provide a better development experience — it serves as a showcase of my skills. In addition to that, these are the technologies I would choose for a personal project, with the exception of the SQLite database.

## Features

- Create user with name and biography
- Create memory with title, description and image
- List memories by user
- Sort memories ASC or DESC
- Update biography
- Copy the user's memory lane to the clipboard

## Screenshots

### Mobile

<img width="427" alt="image" src="https://github.com/vaahxx/memory-lane/assets/39314687/8df3edea-316a-48b2-98a7-8f057f2b5b69">

<img width="427" alt="image" src="https://github.com/vaahxx/memory-lane/assets/39314687/4bfae8de-4c77-4062-86a4-d96bf04586c7">

### Desktop

<img width="1673" alt="image" src="https://github.com/vaahxx/memory-lane/assets/39314687/2575a1a0-c846-4ca9-9f82-840ed04f5837">
<img width="1675" alt="image" src="https://github.com/vaahxx/memory-lane/assets/39314687/3f0048fe-8f9e-46b0-86bf-43a268873c17">
<img width="1670" alt="image" src="https://github.com/vaahxx/memory-lane/assets/39314687/953cc665-62b4-400a-ae92-917e49f43187">
<img width="1673" alt="image" src="https://github.com/vaahxx/memory-lane/assets/39314687/8750058b-fb2d-42eb-abb7-dfc0e6fd5dc9">

## Demo

[Demo Video](https://youtu.be/NvwmKMTMJUI)

## Structure

The project follows the following structure:

```bash
app
├── actions
│   ├── create-memory.ts
│   ├── create-user.ts
│   └── update-biography.ts
├── components
│   ├── button
│   ├── dropdown
│   ├── forms
│   │   ├── biography-form.tsx
│   │   ├── new-memory-form.tsx
│   │   └── user-form.tsx
│   ├── modal
│   └── title
├── dto
├── memories
│   ├── [id]
│   │   ├── components
│   │   ├── page.tsx
│   └── components
│       ├── biography
│       ├── heading
│       ├── memories-list
│       ├── memory-card
│       └── new-memory-form-modal.tsx
├── models
│   ├── memory.model.ts
│   └── user.model.ts
└── page.tsx
```

## Setup

In order to run the project, start by installing the dependencies:

```bash
npm install
```

## Run

To run the project:

```bash
npm run dev
```

To run the API:

```bash
npm run serve:api
```

Access it by navigating to:

```bash
http://localhost:3000/
```

## Database and Endpoints

I utilized the provided API with an SQLite database. In addition to the already created Memories table, I established a Users table to store user information, along with these four new endpoints:

Retrieves the memories given a user id:

```bash
GET /user-memories/:id
```

Creates a new user:

```bash
POST /users
```

Retrieves a user:

```bash
GET /users/:id
```

Updates the user's biography:

```bash
PATCH /users/:id
```

### (Some) Technical Details

- The sorting mechanism is implemented directly in SQL for optimal performance. I am aware that in real production applications, the query would involve indexing and optimization, making it slightly more complex than what I've implemented. However, for the purpose of this project, I opted for simplicity.

- I chose to use the `server actions` feature of Next.js to handle my API calls. This decision was driven by the desire to maximize the benefits of Server-Side Rendering (SSR). It was my first time working with this feature, and it proved to be a valuable learning experience

## Some things I'd implement if I had more time

1. Authentication

For the authentication I could use something like Auth0 or Firebase.

2. Utilize Next's /api directory to create a BFF

If I would use something like Auth0 or Firebase, I would use a BFF since I would have to have the API key in a .env file and I wouldn't like to expose critical data to the Frontend. So, to avoid that, I would create some middlewares in the API directory.

3. Tests for every component

Some components are more complex to be tested, like forms. To determine all the possible state variations and behaviors, it would take some more time and I needed to prioritize the features to deliver in this test.

**4. More features:**

#### Snackbar Feedback for Clipboard Copy:

Implement a snackbar component to provide user feedback after copying the page link to the clipboard. This can offer a more visually appealing and user-friendly experience compared to the standard browser alert.

#### Delete and Update Memory functionality:

Add a delete and update functionality to each memory card.

#### Memory Pinning (Highlighting):

Introduce a "pin" feature for memories that allows users to highlight or mark certain memories as favorites. This can be achieved with a "pin" button on each memory card, similar to Instagram's story pinning.

#### Share Specific Memory:

Add a share button to each memory card, allowing users to share specific memories on other social media platforms. This can involve generating a shareable link or embedding the memory content for seamless sharing.

#### Friends/Followers System:

Implement a friends/followers system similar to other social media platforms. Users can connect with each other, view each other's memories, and interact with shared content.

#### Dark Mode with TailwindCSS:

Integrate a dark mode feature using TailwindCSS. Allow users to toggle between light and dark themes for a personalized and comfortable viewing experience.

Last but not least, I would like to express my gratitude for the opportunity to work on this project. It has been a valuable learning experience, allowing me to enhance my skills in Next.js.
