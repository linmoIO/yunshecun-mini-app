$ErrorActionPreference = 'Stop'

$workspace = 'D:/Linmo/Documents/日常/云舍村小程序/workspace'
$imagesRoot = Join-Path $workspace 'materials/images'
$previousMap = Import-Csv -LiteralPath (Join-Path $workspace 'materials/审计记录/rename-map.csv')
$mapPath = Join-Path $workspace 'materials/审计记录/rename-map-chinese.csv'

$terms = @{
    'accommodation' = '住宿'; 'architecture' = '建筑'; 'archive' = '归档'; 'arrival' = '到访'; 'aerial' = '航拍'; 'ancient' = '古青石';
    'bamboo' = '竹林'; 'banquet' = '宴席'; 'basket' = '竹篮'; 'bathroom' = '洗漱间'; 'bathtub' = '浴缸'; 'bedroom' = '卧室'; 'best' = '最佳';
    'bird' = '鸟'; 'birds' = '鸟群'; 'boardwalk' = '栈道'; 'boat' = '泛舟'; 'brick' = '砖墙'; 'buffalo' = '耕牛';
    'car' = '车内'; 'carrier' = '提行李者'; 'carved' = '雕花'; 'carving' = '雕刻'; 'ceremony' = '茶事'; 'cha' = '茶'; 'characters' = '人物';
    'chicken' = '鸡'; 'chickens' = '鸡群'; 'cloud' = '云舍村'; 'communal' = '公共'; 'corn' = '玉米'; 'cottage' = '小屋'; 'courtyard' = '合院';
    'culture' = '文化体验'; 'covered' = '覆盖'; 'day' = '日景'; 'detail' = '细节'; 'dining' = '餐饮'; 'dish' = '菜品'; 'dried' = '晒干';
    'drying' = '晾晒'; 'drone' = '无人机'; 'ducks' = '鸭群'; 'eaves' = '屋檐'; 'embroidery' = '刺绣'; 'entrance' = '入口'; 'exterior' = '外观';
    'experience' = '体验活动'; 'farmer' = '农人'; 'farming' = '农事'; 'featured' = '精选'; 'field' = '田野'; 'flower' = '花卉'; 'flowers' = '花卉';
    'foliage' = '绿叶'; 'food' = '食材制作'; 'forest' = '森林'; 'fruit' = '果树'; 'garden' = '园林'; 'gate' = '门'; 'glass' = '玻璃';
    'golden' = '金色'; 'graphics' = '图形'; 'grove' = '竹林'; 'harvest' = '收获'; 'hedge' = '绿篱'; 'heritage' = '博物苑'; 'house' = '房屋';
    'ingredients' = '食材'; 'in' = '在'; 'inside' = '室内'; 'interior' = '室内'; 'illustration' = '插画'; 'illustrations' = '插画';
    'lake' = '湖泊'; 'lantern' = '灯笼'; 'lanterns' = '灯笼'; 'lane' = '小路'; 'lawn' = '草坪'; 'legacy' = '历史'; 'lei' = '擂';
    'library' = '书屋'; 'life' = '村居生活'; 'local' = '地方'; 'lounge' = '休息厅'; 'luggage' = '行李'; 'main' = '主';
    'maple' = '枫叶'; 'meditation' = '冥想'; 'meeting' = '会议'; 'moss' = '苔藓'; 'mountain' = '茶山'; 'museum' = '博物苑'; 'nature' = '自然风光';
    'night' = '夜景'; 'number' = '数字'; 'old' = '古'; 'orchard' = '果园'; 'outdoor' = '户外'; 'overview' = '全景'; 'path' = '小径';
    'pavilion' = '亭'; 'people' = '人物'; 'pond' = '池塘'; 'porch' = '廊前'; 'portraits' = '人像'; 'preparation' = '制作'; 'private' = '私宴';
    'property' = '园区'; 'reading' = '阅读'; 'reception' = '接待'; 'red' = '红叶'; 'reflection' = '倒影'; 'reservoir' = '水库'; 'rice' = '稻田';
    'road' = '石板路'; 'roof' = '屋顶'; 'roofs' = '屋顶'; 'rose' = '月季'; 'round' = '圆桌'; 'screen' = '隔断'; 'seat' = '座位';
    'services' = '服务空间'; 'six' = '六'; 'spa' = '水疗'; 'spider' = '蜘蛛'; 'spread' = '菜品'; 'star' = '星'; 'steps' = '台阶';
    'stone' = '石'; 'stream' = '溪流'; 'student' = '学生'; 'stew' = '炖菜'; 'table' = '桌'; 'tea' = '茶'; 'terrace' = '露台';
    'terraces' = '梯田'; 'theater' = '戏楼'; 'tiled' = '瓦'; 'tile' = '瓦片'; 'title' = '标题'; 'tree' = '树'; 'uploads' = '上传素材';
    'veranda' = '廊道'; 'vegetable' = '菜园'; 'view' = '景观'; 'village' = '云舍村'; 'walkers' = '游客'; 'wall' = '墙'; 'water' = '水';
    'waterfall' = '瀑布'; 'waterside' = '临水'; 'web' = '网'; 'white' = '白色'; 'wildlife' = '动物'; 'window' = '窗边'; 'woman' = '女子';
    'autumn' = '秋景'; 'book' = '书本'; 'bridge' = '石桥'; 'canopy' = '帷幔'; 'class' = '班'; 'deck' = '露台'; 'facade' = '立面'; 'front' = '正面';
    'hall' = '大厅'; 'hour' = '时刻'; 'paving' = '铺地'; 'plots' = '菜畦'; 'room' = '房间'; 'taoyuan' = '桃源'; 'welcome' = '欢迎';
    'wood' = '木'; 'wooden' = '木制'; 'workshop' = '工坊'; 'wisteria' = '紫藤'; 'yellow' = '黄墙'
}

function Convert-Text([string]$text) {
    $tokens = $text -split '-'
    $converted = foreach ($token in $tokens) {
        if ($terms.ContainsKey($token)) { $terms[$token] }
        elseif ($token -match '^\d+$') { $token }
        else { throw "存在未翻译英文词：$token（来自 $text）" }
    }
    return ($converted -join '-')
}

function Convert-RelativePath([string]$relativePath) {
    $parts = $relativePath -split '[\\/]'
    $converted = for ($index = 0; $index -lt $parts.Count; $index++) {
        if ($index -eq $parts.Count - 1) {
            $extension = [IO.Path]::GetExtension($parts[$index])
            "$(Convert-Text ([IO.Path]::GetFileNameWithoutExtension($parts[$index])))$extension"
        } else {
            Convert-Text $parts[$index]
        }
    }
    return ($converted -join [IO.Path]::DirectorySeparatorChar)
}

$mappings = foreach ($row in $previousMap) {
    $current = $row.Target
    if (-not (Test-Path -LiteralPath $current)) { throw "当前文件不存在：$current" }

    $relativeCurrent = $current.Substring($imagesRoot.Length).TrimStart('\', '/')
    $directory = Split-Path -Parent $relativeCurrent
    if ($row.Source -match '[\\/]locations[\\/]') {
        $originalName = [IO.Path]::GetFileName($row.Source)
        if ($originalName -eq 'SPA房.jpg') { $originalName = '水疗房.jpg' }
        $relativeTarget = Join-Path (Convert-RelativePath $directory) $originalName
    } else {
        $relativeTarget = Convert-RelativePath $relativeCurrent
    }

    [PSCustomObject]@{
        Source = $current
        Target = Join-Path $imagesRoot $relativeTarget
        OriginalSource = $row.Source
    }
}

if (($mappings.Target | Group-Object | Where-Object Count -gt 1).Count -gt 0) { throw '中文映射中存在重复目标路径。' }
$englishTargets = @($mappings | Where-Object {
    $relative = $_.Target.Substring($imagesRoot.Length).TrimStart('\', '/')
    $pathWithoutExtension = Join-Path (Split-Path -Parent $relative) ([IO.Path]::GetFileNameWithoutExtension($relative))
    $pathWithoutExtension -match '[A-Za-z]'
})
if ($englishTargets.Count -gt 0) {
    throw '目标路径仍含英文字符。'
}

$mappings | Export-Csv -LiteralPath $mapPath -NoTypeInformation -Encoding utf8
foreach ($mapping in $mappings) {
    New-Item -ItemType Directory -Force -Path (Split-Path -Parent $mapping.Target) | Out-Null
    Move-Item -LiteralPath $mapping.Source -Destination $mapping.Target
}

"已移动 $($mappings.Count) 张图片。中文映射表：$mapPath"
