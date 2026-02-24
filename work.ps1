# Скрипт управления разработкой GrippaNN-3
# Запуск: в терминале PowerShell .\work.ps1

function Show-Header {
    Clear-Host
    Write-Host "=== ПАНЕЛЬ УПРАВЛЕНИЯ GrippaNN-3 (Team Lead: Никита) ===" -ForegroundColor Cyan
}

$team = @(
    [PSCustomObject]@{ id="1"; name="Masha";   role="backend-1-kamilla"; branch="feature/masha-org-dept" },
    [PSCustomObject]@{ id="2"; name="Kamilla"; role="backend-2";         branch="feature/kamilla-emp-files" },
    [PSCustomObject]@{ id="3"; name="Vanya_I"; role="backend-3";         branch="feature/vanya-hr-ops" },
    [PSCustomObject]@{ id="4"; name="Danya";   role="frontend-1";        branch="feature/danya-ui-base" },
    [PSCustomObject]@{ id="5"; name="Seryozha";role="frontend-2";        branch="feature/seryozha-ui-full" },
    [PSCustomObject]@{ id="6"; name="Vanya_B"; role="devops-tester";     branch="feature/vanya-devops" }
)

# 1. Выбор участника
Show-Header
Write-Host "KTO TY SEGODNYA? (Who are you?)" -ForegroundColor Yellow
$team | ForEach-Object { Write-Host "$($_.id) - $($_.name) ($($_.role))" }
$choice = Read-Host "Select number"
$user = $team | Where-Object { $_.id -eq $choice }
if (-not $user) { Write-Host "Error!"; pause; exit }

# 2. Выбор даты
Show-Header
Write-Host "HELLO, $($user.name)!" -ForegroundColor Green
Write-Host "VVEDI DATU (Date): 25.02, 26.02, 27.02"
$date = Read-Host "Enter date"

# 3. ВЫБОР РЕПОЗИТОРИЯ (КУДА ПУШИМ)
Show-Header
Write-Host "KUDA OTPRAVLYAEM KOD? (Where to push?)" -ForegroundColor Magenta
Write-Host "1 - DRAFT (Chernovik/Practice) - ТРЕНИРОВКА"
Write-Host "2 - STABLE (Organization/Final) - НИКИТЕ НА ПРОВЕРКУ"
$repoChoice = Read-Host "Select (1/2)"

# АВТО-НАСТРОЙКА АДРЕСОВ (чтобы у ребят всё работало само)
$draftUrl = "https://github.com/k4dzuma/GrippaNN-Draft.git"
$stableUrl = "https://github.com/Bread7Team/GrippaNN-3.git"

# Проверяем и добавляем remotes если их нет
if (!(git remote | Select-String "draft")) { git remote add draft $draftUrl }
if (!(git remote | Select-String "stable")) { git remote add stable $stableUrl }

$remoteName = if ($repoChoice -eq "1") { "draft" } else { "stable" }
$targetUrl = if ($repoChoice -eq "1") { $draftUrl } else { $stableUrl }

$confirm = Read-Host "Start AUTO-PUSH to $remoteName? (y/n)"
if ($confirm -ne "y") { exit }

# 4. Процесс Git
Write-Host "`n1/4 Syncing with $remoteName..."
git checkout -f main
git pull $remoteName main
git checkout -b $user.branch 2>$null
git checkout $user.branch
git merge main --no-edit 2>$null

# 5. Копирование файлов из individual-parts
Write-Host "2/4 Copying code from individual-parts..."
$srcBase = "individual-parts/$($user.role)/ready-code"
$destBase = if ($user.role -match "backend") { "api/core" } else { "app/src" }
if ($user.role -match "devops") { 
    $srcBase = "individual-parts/devops-tester/ready-code"; $destBase = "."; 
    Copy-Item -Path "$srcBase/*" -Destination "." -Recurse -Force
} else {
    Copy-Item -Path "$srcBase/*" -Destination $destBase -Recurse -Force
}

# 6. Отправка
Write-Host "3/4 Creating commit and Pushing to $remoteName..."
git add .
$commitMsg = "feat($($user.role)): update for $date"
git commit -m $commitMsg
git push $remoteName $($user.branch) --force

Show-Header
Write-Host "=== SUCCESS! ===" -ForegroundColor Green
Write-Host "Your code is on GitHub ($remoteName). Branch: $($user.branch)"
pause
