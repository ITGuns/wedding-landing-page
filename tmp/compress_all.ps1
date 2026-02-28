
$videos = @(
    "public/gallery/ceres-hans.mp4",
    "public/gallery/zarah-pj.mp4",
    "public/gallery/justin-ariana.mp4",
    "public/gallery/vironica-chad.mp4",
    "public/videos/hero-1.mp4",
    "public/videos/hero-2.mp4"
)

foreach ($vid in $videos) {
    $out = $vid.Replace(".mp4", "-small.mp4")
    Write-Host "Compressing $vid to $out..."
    ffmpeg -i "$vid" -vcodec libx264 -crf 28 -preset fast -acodec aac -b:a 128k "$out" -y
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Success! Replacing $vid with $out"
        Move-Item -Force "$out" "$vid"
    } else {
        Write-Host "Failed to compress $vid"
    }
}
