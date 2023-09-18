```markdown
# Contact Management Frontend

This is a React application that interacts with the Contact Management API, allowing users to manage their contacts, including adding, editing, deleting, updating, and searching for contacts.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed (https://nodejs.org/)
- Git installed (https://git-scm.com/downloads)

## Getting Started

1. Clone this repository:

   ```bash
   git clone https://github.com/yourusername/contact-management-frontend.git
   ```

2. Install dependencies:

   ```bash
   cd contact-management-frontend
   npm install
   ```

3. Create a `.env` file in the root directory with the following content:

   ```plaintext
   REACT_APP_API_URL=http://localhost:3000/api
   ```

   Update the `REACT_APP_API_URL` value with the base URL of your Contact Management API.

4. Start the development server:

   ```bash
   npm start
   ```

   The React application will be accessible at `http://localhost:3001`.

## Features

- Display a list of contacts with their names, phone numbers, and email addresses.
- Provide a form to add new contacts, including fields for name, phone number, and email address.
- Implement the ability to edit, delete, update, and download contacts.
- Add search functionality to allow users to search for contacts by name.
- Implement sorting options to sort contacts by name or other relevant criteria.

## State Management

This application uses React's `useContext` and `useReducer` for state management, allowing for efficient management of global application state.

## API Calls

Axios is used to make API calls to the Contact Management API. The base URL for API calls is defined in the `.env` file.

## Contributing

Feel free to contribute to this project by submitting issues or pull requests.


## Acknowledgments

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://radix-ui.com/)
- [Axios](https://axios-http.com/)
```

