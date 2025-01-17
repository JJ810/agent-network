# Agent Management App

Network of Agents(Home Assessment)

## Features

### Core Features:

- **List of Agents**: Displays a list of agents with their details:
  - Name
  - Email
  - Status (Active/Inactive)
  - Last Seen Date
- **Add Agent**: A form to add a new agent.
  - Name (Text input)
  - Email (Validated email input)
  - Status (Active/Inactive dropdown)
- **Edit Agent**: Allows editing an agent's details.
- **Delete Agent**: An option to delete an agent with a confirmation popup.
- **State Management**: Uses React Context to manage state across the application.
- **Persistent Storage**: Agent data is saved in `localStorage` so it persists across page reloads.
- **Form Validation**: Basic validation for required fields (e.g., email validation).

### Optional Features (Implemented):

- **Responsive Design**: Make the UI responsive and mobile-friendly.
- **Unit Tests**: Basic unit tests for components using Jest and React Testing Library.

## Technologies Used

- **Next.js (v15)**: A React framework for building server-side rendered applications.
  - **_Why:_** This app is to handle the list of agents and Nextjs is useful for Incremental Static Regeneration (ISR)
- **TypeScript**: Adds type safety and modern JavaScript features.
- **Tailwind CSS**: A utility-first CSS framework for styling the app.
- **Jest & React Testing Library**: For unit testing React components.

## Instructions to Run the Application

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/jj810/agent-network.git
   cd agent-network
   ```

2. **Install Dependencies**:
   Ensure you have Node.js installed. Then, run:

   ```bash
   npm install
   ```

3. **Run the Application**:
   To start the application locally, use the following command:

   ```bash
   npm run dev
   ```

4. **Access the Application**:
   Open your browser and go to [http://localhost:3000](http://localhost:3000). You should see the agent management dashboard.

5. **Run Unit Tests**:
   To run the unit tests, use:
   ```bash
   npm run test
   ```

![No Agent](https://github.com/jj810/agent-network/blob/main/public/screenshots/1.png?raw=true)
![Agents List](https://github.com/jj810/agent-network/blob/main/public/screenshots/2.png?raw=true)
![Add Agent Page](https://github.com/jj810/agent-network/blob/main/public/screenshots/3.png?raw=true)
![Confirm to delete](https://github.com/jj810/agent-network/blob/main/public/screenshots/4.png?raw=true)
![Unite testing coverage](https://github.com/jj810/agent-network/blob/main/public/screenshots/5.png?raw=true)
