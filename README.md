## Purpose

This project was completed as part of a group learning exercise.

## Demo

[https://gallant-pasteur-653b2f.netlify.app/](https://gallant-pasteur-653b2f.netlify.app/)

## Project Features

### User Stories

1. User can see a timer for 25 minutes - the working session
2. After the working session is over, the User can see a timer for 5 minutes - the break session
3. User can start / pause, stop and reset the timers

The user can view all the existing sessions in a list and choose to create one themselves.

<img src="https://user-images.githubusercontent.com/14803/142367795-d98f8080-8c66-4dc5-89c2-48c2d71b1533.png" width="512" alt="Session List" />

There are a few other features, including some feedback for the cycle the user is on. The image shows that we are in the break period of the third cycle.

<img src="https://user-images.githubusercontent.com/14803/142382913-50820ed3-0088-46ed-a5d7-babf03ae59da.png" width="512" alt="Timer View" />

The fourth break will be 10 minutes instead of 5.

After a session is created, any user can view the details of the session. These details describe the length of the session, and the number of pauses used.

<img src="https://user-images.githubusercontent.com/14803/142368198-3569c5a3-4f64-478d-9305-75336f333a41.png" width="512" alt="Timer View" />

## Technical Specifications

Using [supabase](https://supabase.io) for the database. The pomodoro timer is implemented using [xstate](https://xstate.js.org/).

### Dependencies

- react@next
- react-router-dom@6
- xstate
- supabase/js
- react-query
- tailwindcss
- postgres

### xstate

State charts are used to describe the timer functionality.

![image](https://user-images.githubusercontent.com/14803/142367637-29abc862-3ce3-4fa3-adf0-2d562e98be10.png)

In this example we can see that there are two main states `active` and `break`. Within those states are `running` and `paused` child states. These allow us to manage the timer. The current implementation will continue to transition between working and break sessions indefinitely.

### Incomplete

- Would like users to be able to join existing sessions
