# QuickSent Deployment Script
Write-Host "🚀 Starting QuickSent deployment to GitHub Pages..." -ForegroundColor Green

# Check if git is available
try {
    git --version | Out-Null
    Write-Host "✅ Git is available" -ForegroundColor Green
} catch {
    Write-Host "❌ Git is not available. Please install Git first." -ForegroundColor Red
    exit 1
}

# Initialize git repository if not already done
if (-not (Test-Path ".git")) {
    Write-Host "📁 Initializing Git repository..." -ForegroundColor Yellow
    git init
}

# Add all files
Write-Host "📦 Adding files to Git..." -ForegroundColor Yellow
git add .

# Commit changes
Write-Host "💾 Committing changes..." -ForegroundColor Yellow
git commit -m "Deploy QuickSent application"

# Check if remote exists
$remoteExists = git remote get-url origin 2>$null
if (-not $remoteExists) {
    Write-Host "🔗 Please add your GitHub repository as remote origin:" -ForegroundColor Yellow
    Write-Host "   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "📋 Then run: git push -u origin main" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "🌐 After pushing, enable GitHub Pages in your repository settings:" -ForegroundColor Yellow
    Write-Host "   1. Go to Settings > Pages" -ForegroundColor Cyan
    Write-Host "   2. Select 'GitHub Actions' as source" -ForegroundColor Cyan
    Write-Host "   3. The workflow will automatically deploy your app" -ForegroundColor Cyan
} else {
    Write-Host "🚀 Pushing to GitHub..." -ForegroundColor Yellow
    git push origin main
}

Write-Host "✅ Deployment script completed!" -ForegroundColor Green
Write-Host "📝 Next steps:" -ForegroundColor Yellow
Write-Host "   1. Create a GitHub repository" -ForegroundColor Cyan
Write-Host "   2. Add it as remote: git remote add origin YOUR_REPO_URL" -ForegroundColor Cyan
Write-Host "   3. Push: git push -u origin main" -ForegroundColor Cyan
Write-Host "   4. Enable GitHub Pages in repository settings" -ForegroundColor Cyan
} 