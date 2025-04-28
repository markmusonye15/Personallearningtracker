## personal learning skills/tracker...
SkillLog – Personal Learning Tracker
SkillLog is a web app that helps users track, manage, and update their skill-learning journey. It offers features like adding new skills, updating progress, filtering by category or status, and securing user views with basic login authentication.

# Project Goals

Apply full CRUD (Create, Read, Update, Delete) functionality using React and json-server.
Manage state with useState and useContext.
Use React Router for navigation.
Protect pages with basic authentication.
Build a clean, accessible UI with good user experience.

# Features

Add a Skill: Input name, category, status (Not Started, Learning, Mastered), and notes.
View Skills: See all added skills, filterable by category or status.
Edit Skill: Update progress (status) or notes.
Delete Skill: Remove a skill permanently.
Routing: Navigate between pages easily (All Skills, Filtered Skills, Login).
Authentication: Simple login/logout to protect views.
Context API: Centralized management for skills and authentication.

# Project Structure

/src
/components –Reusable UI components (SkillCard, FilterBar, etc.)
/pages –Pages (AllSkillsPage, LoginPage, etc.)
/context _ Contexts for skills and authentication
/services _ API calls (skills API, auth service)
App.jsx
main.jsx
db.json \_ json-server database

# Project Overview

Login Page: Basic username/password (stored locally or hardcoded for simplicity).
All Skills Page: Displays all skills fetched from json-server.
Filter View: Filter skills by category (e.g., Web Development) or status (Learning, Mastered, etc.).
Skill Actions: Add, Edit, Delete skills.
Protected Routes: Only logged-in users can view or modify skills.
Global State: Authentication and skill data managed with React Context.

# Technologies Used

React (with Vite)
React Router Dom
Context API
json-server
CSS (or Tailwind / simple styling)
Axios (optional, for API calls)

# Authentication

Basic username/password system.
Stores login status in Context API and localStorage.

# Important Notes

Make sure json-server and your React app are running at the same time but on different ports (5000 for API and 5173 for app).
Skills are saved in db.json, so any changes will be persistent unless you reset the file.
Focus on clean code and component reusability.

# Link to slides 
:https://docs.google.com/presentation/d/1wtUwKNm5UICExU6aFVKqx8GZbKSUeWLcU1BKQFgkgiA/edit?usp=sharing
