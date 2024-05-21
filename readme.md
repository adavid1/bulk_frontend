# Bulk Frontend

Bulk Frontend is the client-side component of the Bulk game, developed using Ionic, a framework based on Angular. Bulk is a party game that functions similarly to Jackbox.TV games, where players interact with a common screen and use their phones to submit answers. The objective of the game is to provide the same answer as most of the other players to earn points. The more people who give the same answer, the more points you earn!

This project was developed as a student project at the UTBM engineering school, completed with [Sakalypse](https://github.com/sakalypse).

## Prerequisites

Make sure you have the following installed on your system:

- Node.js
- npm (Node Package Manager)

## Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/adavid1/bulk_frontend.git
   cd bulk_frontend
   ```
2. Install Dependencies
   ```bash
   npm install
   ```
3. Run the Application
   ```bash
   npm run start
   ```
   
## Building and Deployment

### Build and Push to GitHub Pages

1. **Modify `homepage` in `angular.json`**
   - Update the `homepage` property in the `angular.json` file with your GitHub Pages URL.

2. **Build the Application**
   ```bash
   ng build --prod --base-href "URL"
   ```

3. **Deploy to GitHub Pages**
   ```bash
   npx angular-cli-ghpages --dir=www
   ```

## Project Structure

bulk_frontend/
├── src/
│   ├── app/
│   ├── assets/
│   ├── environments/
│   └── theme/
├── resources/
├── e2e/
├── .gitignore
├── angular.json
├── package.json
└── README.md

## Usage

1. **Start the Development Server**
   - Launch the development server using `npm run start`.

2. **Access the Application**
   - Navigate to the provided URL in your web browser.

3. **Interact with the Game**
   - Join the game using your phone and follow the on-screen instructions to play.

## Acknowledgements

- [Sakalypse](https://github.com/sakalypse) for collaborating on this project.
