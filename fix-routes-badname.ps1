# ==== FIX ROUTE‑GROUP CONFLICT (PowerShell) ====
# Run this from the project root:
#   F:\Mike d drive\Mike Webs\PDC YES\pdcyes-new-website 20jul26\pdcyes-github

# -----------------------------------------------------------------
# 1️⃣  Go to the project folder
# -----------------------------------------------------------------
Set-Location -LiteralPath "F:\Mike d drive\Mike Webs\PDC YES\pdcyes-new-website 20jul26\pdcyes-github"

# -----------------------------------------------------------------
# 2️⃣  Stop any hanging node processes and clear .next cache
# -----------------------------------------------------------------
taskkill /IM node.exe /F 2>$null | Out-Null
Remove-Item -Recurse -Force .next 2>$null | Out-Null

# -----------------------------------------------------------------
# 3️⃣  Move SITE files from app/(site) → app/
# -----------------------------------------------------------------
$siteSrc = "app/(site)"
if (Test-Path $siteSrc) {
    # Remove the duplicate layout (we already have a root layout)
    Remove-Item -Force "$siteSrc/layout.tsx"
    Get-ChildItem -Path $siteSrc -Recurse -Include *.tsx,*.ts | ForEach-Object {
        $src = $_.FullName
        $rel = $_.FullName.Substring($siteSrc.Length+1)
        $dst = Join-Path -Path "app" -ChildPath $rel
        $dstDir = Split-Path $dst -Parent
        if (-not (Test-Path $dstDir)) { New-Item -ItemType Directory -Path $dstDir -Force | Out-Null }
        Move-Item -Path $src -Destination $dst -Force
    }
    Remove-Item -Recurse -Force $siteSrc
}

# -----------------------------------------------------------------
# 4️⃣  Move ADMIN files from app/(admin) → app/admin/
# -----------------------------------------------------------------
$adminSrc = "app/(admin)"
if (Test-Path $adminSrc) {
    Get-ChildItem -Path $adminSrc -Recurse -Include *.tsx,*.ts | ForEach-Object {
        $src = $_.FullName
        $rel = $_.FullName.Substring($adminSrc.Length+1)
        $dst = Join-Path -Path "app\admin" -ChildPath $rel
        $dstDir = Split-Path $dst -Parent
        if (-not (Test-Path $dstDir)) { New-Item -ItemType Directory -Path $dstDir -Force | Out-Null }
        Move-Item -Path $src -Destination $dst -Force
    }
    Remove-Item -Recurse -Force $adminSrc
}

# -----------------------------------------------------------------
# 5️⃣  Function to replace strings in all .ts/.tsx files
# -----------------------------------------------------------------
function Replace-InFiles {
    param([string]$Pattern, [string]$Replacement)
    Get-ChildItem -Recurse -Include *.ts,*.tsx | Where-Object { !$_.PSIsContainer } |
        ForEach-Object {
            # Read the whole file as a single string (works in PS 2.0+)
            $content = Get-Content $_.FullName | Out-String
            if ($content -match $pattern) {
                $new = $content -replace $pattern, $replacement
                Set-Content -Path $_.FullName -Value $new -Encoding UTF8
            }
        }
}
# Update the imports
Replace-InFiles -Pattern '@/app\(/admin\)/:' -Replacement '@/app/admin/:/'
Replace-InFiles -Pattern '@/app\(/site\)/:' -Replacement '@/app/:/'
Replace-InFiles -Pattern '\.\./\(admin\)/:' -Replacement '../admin/:/'
Replace-InFiles -Pattern '\.\./\(site\)/:' -Replacement '..//:/'

# -----------------------------------------------------------------
# 6️⃣  Summary
# -----------------------------------------------------------------
Write-Host "`n✅ Route‑group conflict fixed.`n" -ForegroundColor Green
Write-Host "New top‑level folders under app:" -ForegroundColor Cyan
Get-ChildItem -Path "app" -Directory | Sort-Object Name | ForEach-Object { Write-Host "  $($_.Name)" }

Write-Host "`nNext steps:`n" -ForegroundColor Yellow
Write-Host "  npm install   (if you haven’t already)" -ForegroundColor Yellow
Write-Host "  npm run dev   → http://localhost:3001" -ForegroundColor Yellow
