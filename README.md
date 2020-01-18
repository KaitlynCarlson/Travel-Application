# Choose Your Own Adventure

An application in which users can enter travel parameters that specify the adventure they would like to receive information on, and returns information on flights, hotels, and activities that meet those parameters.

## Purpose / User Story

As a user who wants to travel, I want to minimize planning so that I can adventure more easily.

## Functionality

On load, this application prompts users to create an account. This is not secure, and merely an accent to the application to create a more complete feel for the experience. Upon entering the site, the user may enter their adventure criteria. When the user enters their adventure criteria, and clicks the "Let's Go" button three actions are performed.

Three query calls are created for two apis, Skyscanner and TripAdvisor. Each of these query calls is built using the user's entered adventure criteria. The query call then returns data that matches the user's entered parameters. This data is then rendered into the approprate card (flights, hotels, activities). Each item is rendering with a button called "Mark Your Spot."

The "mark your spot" button enables users to build their custom adventure in the right hand card. Once they have completed their customized adventures, users are able to save the adventure. When saved, their adventures can be viewed in the adventure book modal.

![Adventure (1)](https://user-images.githubusercontent.com/56744605/72667729-e5880200-39d3-11ea-8d2e-cd7bac57257b.png)



## APIs

- Skyscanner
- TripAdvisor

## Project GitHub Participants

Remy Guts @remyguts
Kaitlyn Carlson @KaitlynCarlson
Marie Lenac @malicemarie
