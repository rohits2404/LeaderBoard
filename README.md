# MERN Stack Leaderboard Application

A full-featured leaderboard application built with MongoDB, Express.js, React, and Node.js. Users can claim random points, view real-time rankings, and track their progress through a beautiful, responsive interface.

## 🚀 Features

### Backend Features
- **MongoDB Database**: Stores users and points history
- **RESTful API**: Clean API endpoints for all operations
- **Real-time Rankings**: Automatic rank calculation and updates
- **Points History**: Complete audit trail of all point claims
- **User Management**: Add new users dynamically

### Frontend Features
- **Modern UI**: Beautiful glass-morphism design with gradients
- **Real-time Updates**: Live leaderboard updates without page refresh
- **Responsive Design**: Works perfectly on all devices
- **Interactive Components**: Smooth animations and hover effects
- **Statistics Dashboard**: Overview of total users, points, and claims

## 🛠️ Tech Stack

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB

### Frontend
- **React** - UI library
- **Tailwind CSS** - Styling framework
- **Lucide React** - Icon library
- **Axios** - HTTP client

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/leaderboard
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. In the root directory, install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

## 🎯 Usage

1. **Select a User**: Choose from the dropdown or add a new user
2. **Claim Points**: Click the claim button to award random points (1-10)
3. **View Rankings**: See real-time leaderboard updates
4. **Track History**: Monitor all point claims in the history panel
5. **View Statistics**: Check overall stats and current leader

## 🔧 API Endpoints

### Users
- `GET /api/users` - Get all users with rankings
- `POST /api/users` - Add a new user
- `GET /api/users/:id` - Get user by ID

### Points
- `POST /api/points/claim` - Claim points for a user
- `GET /api/points/history` - Get complete points history
- `GET /api/points/history/:userId` - Get user-specific history

## 🎨 Design Features

- **Glass-morphism UI**: Modern translucent design elements
- **Gradient Backgrounds**: Beautiful color transitions
- **Responsive Layout**: Mobile-first design approach
- **Custom Animations**: Smooth transitions and hover effects
- **Color-coded Rankings**: Visual distinction for top performers

## 🔄 Real-time Features

- Live leaderboard updates after each point claim
- Instant notifications for successful actions
- Auto-refreshing statistics
- Dynamic ranking calculations

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:
- Mobile devices (320px and up)
- Tablets (768px and up)
- Desktop computers (1024px and up)

## 🚀 Production Deployment

### Backend Deployment
1. Set up MongoDB Atlas or your preferred cloud database
2. Update the `MONGODB_URI` in your environment variables
3. Deploy to platforms like Heroku, Railway, or DigitalOcean

### Frontend Deployment
1. Update the API base URL in `src/services/api.js`
2. Build the production version: `npm run build`
3. Deploy to platforms like Netlify, Vercel, or AWS S3

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎉 Acknowledgments

- Built with modern web technologies
- Inspired by competitive gaming leaderboards
- Designed for scalability and performance