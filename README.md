# Assignment - "Gridpainter"

In this assignment we were split in to teams and asked to create an application in real time were the users can chat, paint and play together.

### Technical demands

- Chat and paint should be in real time
- Each player should be assigned a color
- The coloring grid should be at least 15 rows and columns
- A picture can be saved and opened again
- Deployment to Heroku

#### Extra demands

- Play mode should be in real time
- Have at least 5 facit pictures to compare with painted picture
- Have a function that compares pictures and returns a percentage
- Have a timer for play mode

### Structure

Our project is built with the monolith principles. We took this desition based on our experience with socket.io.

In our public folder is the "frontend" part of the project.

### Installation

Get started:

- First, clone repository, then in cli

```bash
 npm install
 npm start
```

In root folder, create file allDrawnPics.json containing: []

### Launch-demo

We have launched the server with Heroku. Follow the link too see it live -> [Heroku app](https://gridpainter-josefinelofgren.herokuapp.com/).
