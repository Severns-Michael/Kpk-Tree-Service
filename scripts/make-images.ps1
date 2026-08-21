# Generates public/og-image.jpg (1200x630) and public/apple-touch-icon.png (180x180)
# from the source logo. Run: powershell -ExecutionPolicy Bypass -File scripts/make-images.ps1
Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$logoPath = Join-Path $root "src\assets\logo.jpg"
$logo = [System.Drawing.Image]::FromFile($logoPath)

function New-Canvas($w, $h) {
    $bmp = New-Object System.Drawing.Bitmap($w, $h)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.Clear([System.Drawing.Color]::White)
    return $bmp, $g
}

function Draw-Fitted($g, $img, $w, $h, $pad) {
    $maxW = $w - 2 * $pad
    $maxH = $h - 2 * $pad
    $scale = [Math]::Min($maxW / $img.Width, $maxH / $img.Height)
    $dw = [int]($img.Width * $scale)
    $dh = [int]($img.Height * $scale)
    $x = [int](($w - $dw) / 2)
    $y = [int](($h - $dh) / 2)
    $g.DrawImage($img, $x, $y, $dw, $dh)
}

# --- OG image: 1200x630 JPEG ---
$bmp, $g = New-Canvas 1200 630
Draw-Fitted $g $logo 1200 630 40
$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
$encParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 85L)
$bmp.Save((Join-Path $root "public\og-image.jpg"), $jpegCodec, $encParams)
$g.Dispose(); $bmp.Dispose()

# --- Apple touch icon: 180x180 PNG ---
$bmp, $g = New-Canvas 180 180
Draw-Fitted $g $logo 180 180 8
$bmp.Save((Join-Path $root "public\apple-touch-icon.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $bmp.Dispose()

$logo.Dispose()
Write-Host "Done. Generated og-image.jpg and apple-touch-icon.png"
