# Challenge: Build a User Management CRUD Application with React.js & Tailwind CSS

## Objective

*Develop a web application for user management, allowing users to add, view, edit, and delete user information. Data is stored locally and displayed in an interactive data table.*

---

## Application Pages (Suggested Development Order)

- **Home Page**: The main interface of the application, displaying the user list and management functionalities.

---

## Core Functionalities

1. **Add New User**
   - When the "**+ Add New User**" button is clicked, display a form (e.g., in a modal or popup) to input user information.
   - Required fields: **Name**, **Email**, **Role**, and **Status**.
   - The form should support basic input validation:
     - Valid email format.
     - All required fields must be filled.
   - The UI should be styled with Ant Design (e.g., buttons, rounded modal).

2. **View User List**
   - Display all user records in a data table.
   - Table columns must include: **NAME**, **EMAIL**, **ROLE**, **STATUS**, and **ACTIONS**.
   - Display **Role** and **Status** using distinct, color-coded “badges”.

3. **Edit User**
   - When the "**Edit**" button on a row is clicked, display a form (similar to the add new user form) pre-filled with the user’s current information.
   - On submit, update the corresponding record in localStorage.

4. **Delete User**
   - When the "**Delete**" button is clicked, display a confirmation dialog before proceeding.
   - After confirming, remove the user from the localStorage.

5. **Search Users**
   - Add a search bar (like "**Search users...**") to filter the user list based on name or email.
   - Search results should update instantly as the user types.

---

## Technologies & Architecture

- **Component-Based Architecture**: Structure the application using modular React components for reusability.
- **Pages & Components**:
  - **UserTable**, **UserForm**, **SearchBar**, **UserRow**
- **State & Props**: Use `useState` and `useEffect` hooks to handle state and data flow between components.
- **Form Handling**: Controlled components for all forms with event handlers such as `onChange`, `onSubmit`, and `onClick`.
- **CRUD Operations**: Implement full Create, Read, Update, and Delete operations.
- **Local Storage**: Store and retrieve all user data from the browser's `localStorage`.
- **Conditional Rendering**: Use conditional rendering to show or hide modals, dialogs, and other UI elements.
- **Styling & UI**:
  - Tailwind CSS for custom layout and responsiveness.
  - Ant Design (Antd) for consistent, professional UI components.
- **Responsive Design**: Ensure full compatibility on desktop, tablet, and mobile devices.

---

## Link Design

[https://i.ibb.co/zHGgNDRp/Screenshot-1.png](https://i.ibb.co/zHGgNDRp/Screenshot-1.png)
