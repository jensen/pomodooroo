## Purpose

This project was completed as part of a group learning exercise.

## Demo

[https://gallant-pasteur-653b2f.netlify.app/](https://gallant-pasteur-653b2f.netlify.app/)

## Project Features

### User Stories

1. User can see a timer for 25 minutes - the working session
2. After the working session is over, the User can see a timer for 5 minutes - the break session
3. User can start / pause, stop and reset the timers

There are a few other features, including some feedback for the cycle the user is on. The fourth break will be 10 minutes instead of 5.

After a session is created, any user can view the details of the session. These details describe the length of the session, and the number of pauses used.

## Technical Specifications

Using [supabase](https://supabase.io) for the database. The pomodoro timer is implementing using [xstate](https://xstate.js.org/).

### Dependencies

- react@next
- react-router-dom@6
- xstate
- supabase/js
- react-query
- tailwindcss
- postgres

### Incomplete

- Would like to users to be able to join sessions
