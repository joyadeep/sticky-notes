# Sticky Notes

## Overview
This web application allows users to create notes. User can drag notes around as per their needs.

## Table of Contents
- [Installation](#installation)
- [Technologies Used](#technologies-used)


## Installation
### Prerequisites
- Node.js >= 16.x
- npm or yarn
### Steps to Install
1. Clone the repository:
    ```bash
    git clone https://github.com/joyadeep/sticky-notes.git
    ```
2. Navigate to the project directory:
    ```bash
    cd sticky-notes
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```
    or
    ```bash
    yarn install
    ```
4. Set up the environment variables:
   - Create a `.env` file in the root of your project.
   - Add your environment variables : DATABASE_URL, NEXT_PUBLIC_JWT_SECRET

5. Run the development server:
    ```bash
    npm run dev
    ```
    or
    ```bash
    yarn dev
    ```

6. Open `http://localhost:5173` in your browser to view the app.

## Technologies Used
- **Framework**: [Next.js](https://nextjs.org/)
- **Database**:[MongoDb](https://www.mongodb.com/products/platform/atlas-database)
- **ORM**: [Prisma](https://www.prisma.io/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
