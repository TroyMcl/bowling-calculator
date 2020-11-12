## Bowling Score Calculator

> Full Stack Bowling Calculator built with React Hooks and a Node/Express server

### General Infomation

Created a kind of sliding window approach for score calculator. The frame being rolled is not always the next frame to score. So the front pointer tracks the current frame being rolled and records rolls. The back pointer is the next frame to be scored. All of this is stored in state and passed to the server the end of each frame. The server calculates as many frames as it can depending on the rolls and returns an updated score array and back pointer which are then updated in state.

### Technologies
* Javascript
* Nodejs
* Express
* React
* React Hooks
* Webpack

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 10.16.3

### Development

>Things to add later
* Fix display bug with extra roll in frame 10. Score calculates correctly but doesn't render the last roll
* Add a database to track highest scores
* Create random roll generator option

### Instalation and Setup

```
npm install
npm run build
npm run start
```

go to [http://localhost:3000](http://localhost:3000)