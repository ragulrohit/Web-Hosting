Add-Type -AssemblyName System.Drawing

$base = "C:\Users\WELCOME\Company Project\Web Hosting\images"
$blue   = [System.Drawing.Color]::FromArgb(37, 99, 235)
$dblue  = [System.Drawing.Color]::FromArgb(29, 78, 216)
$lgray  = [System.Drawing.Color]::FromArgb(239, 246, 255)
$white  = [System.Drawing.Color]::White
$green  = [System.Drawing.Color]::FromArgb(34, 197, 94)

function New-Png($name, $size, [scriptblock]$draw) {
    $img = New-Object System.Drawing.Bitmap($size, $size)
    $g = [System.Drawing.Graphics]::FromImage($img)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.Clear([System.Drawing.Color]::Transparent)
    & $draw $g $size
    $img.Save("$base\$name.png", [System.Drawing.Imaging.ImageFormat]::Png)
    $img.Dispose()
    $g.Dispose()
    Write-Host "  $name.png"
}

$sbLight  = { New-Object System.Drawing.SolidBrush($lgray) }.GetNewClosure()
$sbBlue   = { New-Object System.Drawing.SolidBrush($blue) }.GetNewClosure()
$sbGreen  = { New-Object System.Drawing.SolidBrush($green) }.GetNewClosure()

function LightBrush { New-Object System.Drawing.SolidBrush($lgray) }
function BlueBrush  { New-Object System.Drawing.SolidBrush($blue) }
function GreenBrush { New-Object System.Drawing.SolidBrush($green) }

# Logo
New-Png "logo" 128 {
    param($g, $s)
    $r = [System.Drawing.Rectangle]::new(4,4,120,120)
    $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($r, $blue, $dblue, 45.0)
    $g.FillEllipse($brush, $r)
    $pen = New-Object System.Drawing.Pen($white, 6)
    $pen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $pen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $g.DrawLine($pen, 30, 72, 48, 42)
    $g.DrawLine($pen, 48, 42, 66, 58)
    $g.DrawLine($pen, 66, 58, 98, 36)
    $pen2 = New-Object System.Drawing.Pen($white, 4)
    $g.DrawLine($pen2, 30, 72, 98, 72)
    $pen.Dispose(); $pen2.Dispose(); $brush.Dispose()
}

# Shield
New-Png "shield" 128 {
    param($g, $s)
    $pts = @((64,12),(20,34),(20,56),(64,116),(108,56),(108,34))
    $fpts = $pts | ForEach-Object { [System.Drawing.PointF]::new($_[0], $_[1]) }
    $lb = LightBrush
    $g.FillPolygon($lb, $fpts)
    $lb.Dispose()
    $g.DrawPolygon([System.Drawing.Pen]::new($blue, 3), $fpts)
    $pen = New-Object System.Drawing.Pen($blue, 5)
    $pen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $pen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $g.DrawLine($pen, 48, 60, 62, 74)
    $g.DrawLine($pen, 62, 74, 84, 52)
    $pen.Dispose()
}

# Speed
New-Png "speed" 128 {
    param($g, $s)
    $lb = LightBrush; $bb = BlueBrush
    $g.FillEllipse($lb, 14,14,100,100); $lb.Dispose()
    $g.DrawEllipse([System.Drawing.Pen]::new($blue, 3), 22,22,84,84)
    $g.DrawEllipse([System.Drawing.Pen]::new($blue, 2), 38,38,52,52)
    $g.FillEllipse($bb, 51,51,26,26); $bb.Dispose()
    $pen = New-Object System.Drawing.Pen($blue, 4)
    $pen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $pen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $g.DrawLine($pen, 64,64,86,34)
    $bb2 = BlueBrush; $g.FillEllipse($bb2, 56,16,16,16); $bb2.Dispose()
    $pen.Dispose()
}

# Support
New-Png "support" 128 {
    param($g, $s)
    $lb = LightBrush; $g.FillEllipse($lb, 14,14,100,100); $lb.Dispose()
    $g.DrawEllipse([System.Drawing.Pen]::new($blue, 3), 22,22,84,84)
    $g.DrawEllipse([System.Drawing.Pen]::new($blue, 2), 38,38,52,52)
    $pen = New-Object System.Drawing.Pen($blue, 4)
    $pen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $pen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $g.DrawLine($pen, 60,48,68,56)
    $g.DrawLine($pen, 68,56,84,40)
    $pen.Dispose()
}

# Uptime
New-Png "uptime" 128 {
    param($g, $s)
    $lb = LightBrush; $g.FillEllipse($lb, 14,14,100,100); $lb.Dispose()
    $g.DrawEllipse([System.Drawing.Pen]::new($blue, 3), 22,22,84,84)
    $pen = New-Object System.Drawing.Pen($blue, 4)
    $pen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $pen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $g.DrawLine($pen, 32,62,50,42)
    $g.DrawLine($pen, 50,42,66,58)
    $g.DrawLine($pen, 66,58,82,44)
    $g.DrawLine($pen, 82,44,96,58)
    $pen.Dispose()
    $pen2 = New-Object System.Drawing.Pen($green, 3)
    $g.DrawLine($pen2, 76,30,96,30)
    $g.DrawLine($pen2, 96,30,96,50)
    $pen2.Dispose()
}

# Backup
New-Png "backup" 128 {
    param($g, $s)
    $lb = LightBrush; $g.FillEllipse($lb, 14,14,100,100); $lb.Dispose()
    $g.DrawEllipse([System.Drawing.Pen]::new($blue, 3), 22,22,84,84)
    $pen = New-Object System.Drawing.Pen($blue, 4)
    $pen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $pen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $g.DrawArc($pen, 32,32,64,64, 0, 300)
    $g.DrawLine($pen, 58,62,70,50)
    $g.DrawLine($pen, 70,50,80,60)
    $pen.Dispose()
}

# Install
New-Png "install" 128 {
    param($g, $s)
    $lb = LightBrush; $g.FillEllipse($lb, 14,14,100,100); $lb.Dispose()
    $g.DrawRectangle([System.Drawing.Pen]::new($blue, 3), 30,34,68,56)
    $g.DrawLine([System.Drawing.Pen]::new($blue, 3), 30,50,98,50)
    $bb1 = BlueBrush; $g.FillEllipse($bb1, 43,66,12,12); $bb1.Dispose()
    $bb2 = BlueBrush; $g.FillEllipse($bb2, 63,66,12,12); $bb2.Dispose()
    $bb3 = BlueBrush; $g.FillEllipse($bb3, 83,66,12,12); $bb3.Dispose()
}

# Cloud
New-Png "cloud" 128 {
    param($g, $s)
    $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
        [System.Drawing.Rectangle]::new(0,0,$s,$s), $blue, $dblue, 45.0)
    $g.FillEllipse($brush, 32, 40, 28, 28)
    $g.FillEllipse($brush, 48, 30, 40, 38)
    $g.FillEllipse($brush, 78, 38, 26, 26)
    $g.FillRectangle($brush, 44, 52, 52, 20)
    $pen = New-Object System.Drawing.Pen($white, 4)
    $pen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $pen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $g.DrawLine($pen, 52, 64, 44, 56)
    $g.DrawLine($pen, 44, 56, 52, 48)
    $g.DrawLine($pen, 82, 64, 90, 56)
    $g.DrawLine($pen, 90, 56, 82, 48)
    $pen.Dispose(); $brush.Dispose()
}

Write-Host "`nAll PNG images generated in: $base"
