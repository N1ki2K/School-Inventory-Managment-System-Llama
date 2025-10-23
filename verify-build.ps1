# Build Verification Script for Windows PowerShell
# This script tests all builds to ensure everything works

Write-Host "🔍 School Inventory System - Build Verification" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host ""

$ErrorCount = 0

# Test Frontend Build
Write-Host "📦 Testing Frontend Build..." -ForegroundColor Yellow
Set-Location "Development\FE"
$FrontendBuild = pnpm build 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Frontend Build: SUCCESS" -ForegroundColor Green
} else {
    Write-Host "❌ Frontend Build: FAILED" -ForegroundColor Red
    $ErrorCount++
}

# Test Backend Build
Write-Host ""
Write-Host "📦 Testing Backend Build..." -ForegroundColor Yellow
Set-Location "..\BE"
$BackendBuild = pnpm build 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Backend Build: SUCCESS" -ForegroundColor Green
} else {
    Write-Host "❌ Backend Build: FAILED" -ForegroundColor Red
    $ErrorCount++
}

# Return to root
Set-Location "..\.."

# Summary
Write-Host ""
Write-Host "=================================================" -ForegroundColor Cyan
if ($ErrorCount -eq 0) {
    Write-Host "🎉 All Builds Successful!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "  1. Run: docker compose up -d" -ForegroundColor White
    Write-Host "  2. Open: http://localhost:3000" -ForegroundColor White
    Write-Host ""
    exit 0
} else {
    Write-Host "⚠️  $ErrorCount build(s) failed" -ForegroundColor Red
    Write-Host "Check the error messages above" -ForegroundColor Yellow
    exit 1
}

