$node = "C:\Program Files\nodejs\node.exe"
Write-Host "Running TypeScript compiler..."
& $node "node_modules\typescript\bin\tsc" -b
Write-Host "Running Vite build..."
& $node "node_modules\vite\bin\vite.js" build
Write-Host "Build done."
