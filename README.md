🍽️ PlateShare — Surplus Food Sharing Platform

A MERN + Firebase-based platform where people can donate extra food, request food, and help the community reduce waste.

🚀 Live Demo & Repo

🔗 Client: (add link)
🔗 Server: (add link)
🔗 Live Site: (add link)

📦 Tech Stack
Frontend

React + React Router

Firebase Authentication

Tailwind CSS

DaisyUI

Axios / Fetch

AOS / Framer Motion

Backend

Node.js + Express

MongoDB Atlas

dotenv

Nodemon

📌 Main Features
🔐 Authentication (Firebase)

Email + Password login

Register with validation

Social login (Google)

Dynamic navbar based on login status

Redirect user after login

Stores user info in MongoDB

🏠 Home Page

Hero/Banner section

Animated sections (AOS/Framer Motion)

Featured Foods (Top 6 by quantity)

Cards with image, name, donor info

“Show All” → Available Foods page

Two static sections:

⭐ How It Works

🎯 Mission / Community Stats

🍛 Add Food (Create – Private Route)

Allows logged-in users to add food:
✔ Food Name
✔ Food Image (via imgbb upload)
✔ Quantity
✔ Pickup Location
✔ Expire Date
✔ Notes
✔ Auto-filled Donor Info (Firebase user)
✔ Default status = Available

🥗 Available Foods (Read – Public)

Shows only foods with food_status = "Available"

2/3 column grid layout

Shows complete basic details

“View Details” → login required

🍽️ Food Details (Read – Private)

Full food information

Donator details

Status

“Request Food” button

Food Request Table (only for food owner)

📝 Manage My Foods (Update & Delete – Private)

Shows only the foods added by logged-in user

Update Food (prefilled form)

Delete Food (SweetAlert confirmation)

Skeleton/Loader while fetching

🥡 Food Request System (Challenge Feature)
Request Food

User fills a form:

Pickup Location

Reason

Contact Number

Saved in MongoDB as:

status: "pending"

Food Owner Controls

For each request:

✔ Accept → status = "accepted", food_status = "donated"

✔ Reject → status = "rejected"

❌ 404 Error Page

Sad illustration

“Back to Home” button
