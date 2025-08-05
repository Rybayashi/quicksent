# QuickSent Deployment Guide

## 🚀 Deploy to GitHub Pages

### Prerequisites
- Git installed on your system
- GitHub account
- Node.js and npm

### Step 1: Create GitHub Repository
1. Go to [GitHub](https://github.com) and create a new repository
2. Name it `quicksent` or any name you prefer
3. Make it public (required for GitHub Pages)
4. Don't initialize with README, .gitignore, or license

### Step 2: Initialize Git and Push
```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: QuickSent application"

# Add remote origin (replace with your repository URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click on "Settings" tab
3. Scroll down to "Pages" section
4. Under "Source", select "GitHub Actions"
5. The workflow will automatically deploy your app

### Step 4: Access Your Application
- Your app will be available at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME`
- The first deployment may take a few minutes

### Automated Deployment
The repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that will:
- Build the application
- Deploy to GitHub Pages
- Run automatically on every push to main branch

### Manual Deployment Script
You can also run the deployment script:
```powershell
.\deploy.ps1
```

### Troubleshooting
- If Git is not recognized, restart your terminal after installing Git
- Make sure your repository is public for GitHub Pages
- Check the Actions tab in your repository for deployment status
- If deployment fails, check the build logs in the Actions tab

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🎉 Success!
Once deployed, your QuickSent application will be live on GitHub Pages with all the features:
- User and Company Management
- Core SENT System
- Data Management
- External Integrations
- Reports and Analytics
- Artificial Intelligence
- Security Management 