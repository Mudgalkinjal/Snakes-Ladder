# Snakes and Ladders Game

## Overview
This is a Snakes and Ladders game built with Next.js, TypeScript, and React. The project requires a MongoDB connection to a replica set to run successfully.

## Prerequisites
- Node.js (v20.9.0 or higher)
- Yarn (v1.22.22 or higher)
- MongoDB (with replica set configuration)

## Getting Started

### 1. Clone the Repository
Clone this repository to your local machine:

```bash
git clone https://github.com/yourusername/proj-snl.git
cd proj-snl
```

### 2. Install Dependencies
Use Yarn to install the project dependencies:

```bash
yarn install
```

### 3. Set Up MongoDB
Ensure you have a MongoDB instance running with a replica set. You can start a MongoDB replica set locally with the following command:

```bash
mongod --replSet rs0 --port 27017 --dbpath /path/to/your/data/db
```

Make sure to replace `/path/to/your/data/db` with the actual path where you want to store the MongoDB data.

### 4. Configure Environment Variables
Create a `.env.local` file in the root of the project and add the following variables:

```plaintext
MONGODB_URI=mongodb://localhost:27017/snl_db
```

### 5. Run the Development Server
Start the development server using Yarn:

```bash
yarn next dev
```

The application should now be running at [http://localhost:3000](http://localhost:3000).

### 6. Access the Application
Open your web browser and go to [http://localhost:3000](http://localhost:3000) to access the Snakes and Ladders game.

## Additional Notes
- Ensure your MongoDB instance is running before starting the application.
- For production deployment, consider configuring environment variables and connection settings as needed.

