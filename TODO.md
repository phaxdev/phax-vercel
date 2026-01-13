# Deploy to Railway.app

## Steps to Deploy

1. **Push code to GitHub**: Commit all changes and push to a GitHub repository.

2. **Create Railway Project**:
   - Go to [Railway.app](https://railway.app) and sign in.
   - Click "New Project" > "Deploy from GitHub repo".
   - Connect your GitHub account and select the repository.

3. **Configure Deployment**:
   - Railway will detect the `railway.json` and `Dockerfile` in `backend/portfolio/`.
   - It will use Docker to build the image, which installs Node, builds the frontend, runs migrations, and collects static files.

4. **Set Environment Variables** in Railway Dashboard (Variables tab):
   - `SECRET_KEY`: Generate a secure key (e.g., use `openssl rand -base64 32`).
   - `DEBUG`: `False`
   - `SITE_URL`: Your Railway app URL (e.g., `https://your-app.up.railway.app`)
   - `REACT_APP_API_URL`: Same as `SITE_URL` (for the frontend to call the API).
   - `ADMIN_EMAIL`: Your email.
   - `DEFAULT_FROM_EMAIL`: Your email.

5. **Deploy**: Click Deploy. Railway will build the Docker image and deploy the app.

6. **Access the Site**: Once deployed, visit the provided URL.

## Notes
- The app serves the React frontend and Django API in one service using Docker.
- Database is SQLite, included in the repo.
- For production email, update `EMAIL_BACKEND` in settings.py if needed.
