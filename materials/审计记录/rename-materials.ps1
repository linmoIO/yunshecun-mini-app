$ErrorActionPreference = 'Stop'

$imagesRoot = 'D:/Linmo/Documents/日常/云舍村小程序/workspace/materials/images'
$mapPath = Join-Path $PSScriptRoot 'rename-map.csv'

function Add-Set {
    param([string]$SourceDirectory, [string[]]$Targets, [string]$SortProperty = 'Name')

    $sources = Get-ChildItem -LiteralPath $SourceDirectory -File -Recurse | Sort-Object $SortProperty
    if ($sources.Count -ne $Targets.Count) {
        throw "素材数量与映射数量不一致：$SourceDirectory（$($sources.Count) / $($Targets.Count)）"
    }

    for ($index = 0; $index -lt $sources.Count; $index++) {
        $script:mappings.Add([PSCustomObject]@{
            Source = $sources[$index].FullName
            Target = Join-Path $imagesRoot $Targets[$index]
        })
    }
}

$mappings = [System.Collections.Generic.List[object]]::new()

Add-Set "$imagesRoot/general" @(
    'nature/garden/moss-covered-tree-01.jpg', 'nature/bamboo/bamboo-grove-lantern-01.jpg', 'nature/path/garden-path-walkers-01.jpg', 'architecture/exterior/courtyard-autumn-01.jpg',
    'architecture/detail/courtyard-gate-01.jpg', 'nature/garden/foliage-reflection-01.jpg', 'nature/path/garden-path-walkers-02.jpg', 'architecture/night/courtyard-entrance-01.jpg',
    'accommodation/interior/tea-table-room-01.jpg', 'architecture/detail/stone-wall-gate-01.jpg', 'nature/night/garden-lawn-01.jpg', 'nature/night/garden-path-01.jpg',
    'nature/flowers/wisteria-01.jpg', 'nature/lake/ducks-01.jpg', 'nature/lake/ducks-02.jpg', 'architecture/detail/stone-steps-flower-01.jpg',
    'nature/lake/ducks-03.jpg', 'architecture/exterior/cottage-flower-01.jpg', 'life/arrival/luggage-carrier-01.jpg', 'architecture/exterior/yellow-courtyard-01.jpg',
    'architecture/detail/brick-wall-window-01.jpg', 'nature/garden/courtyard-garden-01.jpg', 'nature/garden/courtyard-garden-02.jpg', 'architecture/pavilion/garden-pavilion-01.jpg',
    'architecture/pavilion/garden-pavilion-02.jpg', 'farming/vegetable-garden/harvest-01.jpg', 'architecture/gate/garden-gate-01.jpg', 'farming/vegetable-garden/farmer-01.jpg',
    'farming/rice-field/rice-field-01.jpg', 'nature/path/stone-path-01.jpg', 'food/drying-basket/ingredients-01.jpg', 'food/drying-basket/ingredients-02.jpg',
    'nature/path/stone-steps-01.jpg', 'nature/lake/lake-reflection-01.jpg', 'experience/boat/lake-boat-01.jpg', 'farming/pond/farmer-01.jpg',
    'wildlife/bird/roof-bird-01.jpg', 'food/dried-corn/dried-corn-01.jpg', 'life/harvest/tree-harvest-01.jpg', 'nature/garden/tree-lawn-01.jpg',
    'farming/pond/farmer-02.jpg', 'wildlife/chicken/chicken-01.jpg', 'accommodation/bedroom/canopy-bedroom-01.jpg', 'architecture/exterior/cottage-path-01.jpg',
    'experience/boat/lake-boat-02.jpg', 'architecture/gate/garden-entrance-01.jpg', 'nature/forest/forest-01.jpg', 'dining/terrace/outdoor-table-01.jpg',
    'architecture/exterior/hedge-courtyard-01.jpg', 'nature/lake/pond-01.jpg', 'architecture/roof/tiled-roof-01.jpg', 'nature/night/garden-path-02.jpg',
    'nature/flowers/rose-01.jpg', 'nature/garden/fruit-tree-01.jpg', 'architecture/gate/courtyard-gate-02.jpg', 'nature/path/garden-path-01.jpg',
    'nature/path/garden-path-02.jpg', 'nature/path/garden-path-03.jpg', 'architecture/gate/courtyard-gate-03.jpg', 'architecture/gate/courtyard-gate-04.jpg',
    'culture/tea/tea-room-interior-01.jpg', 'culture/embroidery/embroidery-workshop-01.jpg', 'architecture/exterior/heritage-house-01.jpg', 'architecture/exterior/cottage-01.jpg',
    'architecture/exterior/courtyard-overview-01.jpg', 'architecture/exterior/red-maple-courtyard-01.jpg', 'architecture/detail/lanterns-01.jpg', 'culture/tea/bamboo-view-tea-room-01.jpg',
    'accommodation/bedroom/canopy-bedroom-02.jpg', 'architecture/gate/courtyard-entrance-02.jpg', 'wildlife/chicken/chickens-02.jpg', 'accommodation/interior/lounge-01.jpg',
    'dining/dish/local-dish-01.jpg', 'dining/interior/window-table-01.jpg', 'dining/interior/window-table-02.jpg', 'nature/detail/spider-web-01.jpg',
    'architecture/exterior/moss-roof-cottage-01.jpg', 'architecture/exterior/courtyard-stone-paving-01.jpg', 'nature/path/courtyard-path-01.jpg', 'architecture/exterior/courtyard-facade-01.jpg',
    'architecture/exterior/courtyard-facade-02.jpg', 'nature/path/garden-path-04.jpg', 'architecture/detail/carved-screen-01.jpg', 'culture/tea/tea-pavilion-01.jpg',
    'culture/tea/tea-pavilion-02.jpg', 'wildlife/bird/white-birds-01.jpg', 'architecture/roof/tile-detail-01.jpg', 'architecture/detail/wood-carving-01.jpg',
    'culture/tea/tea-pavilion-03.jpg', 'architecture/roof/moss-roof-01.jpg', 'architecture/roof/eaves-01.jpg', 'culture/tea/lei-cha-preparation-01.jpg',
    'culture/tea/lei-cha-preparation-02.jpg', 'culture/tea/lei-cha-preparation-03.jpg', 'dining/banquet/food-spread-01.jpg', 'dining/banquet/food-spread-02.jpg',
    'dining/dish/stew-01.jpg', 'dining/interior/round-table-01.jpg', 'dining/interior/round-table-02.jpg', 'dining/interior/round-table-03.jpg',
    'dining/interior/round-table-04.jpg', 'architecture/exterior/stone-steps-courtyard-01.jpg', 'architecture/gate/courtyard-entrance-03.jpg', 'architecture/night/courtyard-facade-01.jpg',
    'nature/path/forest-stone-path-01.jpg', 'architecture/pavilion/moss-roof-pavilion-01.jpg', 'architecture/exterior/village-lane-01.jpg', 'architecture/roof/courtyard-roofs-01.jpg',
    'architecture/exterior/stone-steps-house-01.jpg', 'nature/bamboo/bamboo-house-01.jpg', 'architecture/exterior/heritage-courtyard-01.jpg', 'nature/waterfall/waterfall-01.jpg',
    'architecture/exterior/porch-01.jpg', 'architecture/exterior/veranda-01.jpg', 'culture/tea/tea-ceremony-01.jpg', 'culture/tea/tea-ceremony-02.jpg',
    'nature/bamboo/bamboo-path-01.jpg', 'nature/path/garden-boardwalk-01.jpg', 'architecture/gate/stone-steps-gate-01.jpg', 'architecture/gate/garden-gate-02.jpg',
    'accommodation/interior/communal-room-01.jpg', 'architecture/exterior/brick-house-01.jpg', 'accommodation/interior/communal-room-02.jpg', 'architecture/night/cottage-01.jpg',
    'architecture/exterior/brick-house-02.jpg', 'architecture/exterior/brick-house-03.jpg', 'architecture/roof/forest-roofs-01.jpg', 'nature/stream/stone-bridge-stream-01.jpg',
    'farming/vegetable-garden/plots-01.jpg', 'farming/vegetable-garden/plots-02.jpg', 'life/arrival/luggage-carrier-02.jpg'
)

Add-Set "$imagesRoot/legacy-backend-uploads" @(
    'archive/legacy-uploads/architecture/pavilion-exterior-01.jpg', 'archive/legacy-uploads/nature/moss-covered-tree-01.jpg', 'archive/legacy-uploads/architecture/museum-gate-01.jpg', 'archive/legacy-uploads/graphics/cloud-village-title-01.jpg',
    'archive/legacy-uploads/portraits/woman-in-car-01.png', 'archive/legacy-uploads/interior/communal-room-01.jpg', 'archive/legacy-uploads/farming/tea-farmer-01.jpg', 'archive/legacy-uploads/graphics/welcome-class-01.png',
    'archive/legacy-uploads/aerial/village-property-01.jpg', 'archive/legacy-uploads/portraits/woman-in-car-02.png', 'archive/legacy-uploads/farming/water-buffalo-01.jpg', 'archive/legacy-uploads/graphics/six-number-01.jpg',
    'archive/legacy-uploads/aerial/forest-village-01.jpg', 'archive/legacy-uploads/culture/embroidery-workshop-01.jpg', 'archive/legacy-uploads/portraits/woman-in-car-03.png', 'archive/legacy-uploads/architecture/night-entrance-01.jpg',
    'archive/legacy-uploads/portraits/woman-in-car-04.png', 'archive/legacy-uploads/graphics/best-six-01.png', 'archive/legacy-uploads/architecture/yellow-courtyard-01.jpg', 'archive/legacy-uploads/culture/tea-room-01.jpg',
    'archive/legacy-uploads/nature/forest-path-01.jpg', 'archive/legacy-uploads/portraits/woman-in-car-05.png', 'archive/legacy-uploads/architecture/stone-wall-gate-01.jpg', 'archive/legacy-uploads/graphics/cloud-village-title-02.jpg',
    'archive/legacy-uploads/graphics/drone-illustration-01.png', 'archive/legacy-uploads/architecture/night-entrance-02.jpg', 'archive/legacy-uploads/illustrations/student-characters-01.jpg', 'archive/legacy-uploads/dining/banquet-table-01.jpg',
    'archive/legacy-uploads/culture/embroidery-workshop-02.jpg', 'archive/legacy-uploads/graphics/six-star-01.png', 'archive/legacy-uploads/experience/night-lake-boat-01.jpg', 'archive/legacy-uploads/graphics/six-star-02.png',
    'archive/legacy-uploads/portraits/woman-in-car-06.png', 'archive/legacy-uploads/farming/tea-farmer-02.jpg', 'archive/legacy-uploads/portraits/woman-in-car-07.png', 'archive/legacy-uploads/nature/tea-mountain-01.jpg',
    'archive/legacy-uploads/portraits/woman-in-car-08.png', 'archive/legacy-uploads/graphics/cloud-village-title-03.jpg', 'archive/legacy-uploads/graphics/six-star-03.png', 'archive/legacy-uploads/nature/bamboo-path-01.jpg',
    'archive/legacy-uploads/graphics/cloud-village-title-04.jpg', 'archive/legacy-uploads/farming/vegetable-farmer-01.jpg', 'archive/legacy-uploads/architecture/courtyard-01.jpg', 'archive/legacy-uploads/graphics/book-illustration-01.png',
    'archive/legacy-uploads/culture/glass-pavilion-01.jpg', 'archive/legacy-uploads/farming/water-buffalo-02.jpg', 'archive/legacy-uploads/dining/window-table-01.jpg', 'archive/legacy-uploads/graphics/welcome-class-02.jpg',
    'archive/legacy-uploads/architecture/cottage-exterior-01.jpg', 'archive/legacy-uploads/graphics/welcome-class-03.png', 'archive/legacy-uploads/graphics/six-star-04.png', 'archive/legacy-uploads/accommodation/bathroom-01.jpg',
    'archive/legacy-uploads/nature/lake-reflection-01.jpg', 'archive/legacy-uploads/dining/banquet-table-02.jpg', 'archive/legacy-uploads/graphics/six-star-05.png', 'archive/legacy-uploads/graphics/welcome-class-04.png',
    'archive/legacy-uploads/nature/tea-mountain-02.jpg', 'archive/legacy-uploads/farming/tea-farmer-03.jpg', 'archive/legacy-uploads/culture/waterside-reading-deck-01.jpg', 'archive/legacy-uploads/graphics/six-star-06.png',
    'archive/legacy-uploads/portraits/woman-in-car-09.png', 'archive/legacy-uploads/architecture/museum-hall-01.jpg', 'archive/legacy-uploads/graphics/six-number-02.jpg'
)

Add-Set "$imagesRoot/locations" @(
    'architecture/museum/heritage-museum-entrance-01.jpg', 'architecture/museum/heritage-museum-wall-01.jpg', 'architecture/museum/heritage-museum-hall-01.jpg', 'farming/vegetable-garden/farmer-02.jpg',
    'dining/interior/private-dining-room-01.jpg', 'nature/tea-mountain/tea-terraces-day-01.jpg', 'architecture/night/tea-pavilion-01.jpg', 'farming/tea-field/tea-farmer-01.jpg',
    'experience/boat/night-lake-boat-01.jpg', 'culture/embroidery/taoyuan-embroidery-01.jpg', 'nature/aerial/village-aerial-01.jpg', 'farming/tea-field/water-buffalo-01.jpg',
    'nature/path/ancient-stone-road-01.jpg', 'accommodation/courtyard-01/exterior-01.jpg', 'accommodation/courtyard-01/bathroom-01.jpg', 'accommodation/courtyard-01/bathtub-01.jpg',
    'accommodation/courtyard-02/exterior-golden-hour-01.jpg', 'accommodation/courtyard-02/exterior-front-01.jpg', 'accommodation/courtyard-02/bedroom-01.jpg', 'accommodation/courtyard-03/exterior-01.jpg',
    'accommodation/courtyard-05/bedroom-01.jpg', 'accommodation/courtyard-05/bedroom-02.jpg', 'accommodation/courtyard-05/bedroom-03.jpg', 'accommodation/courtyard-05/bathroom-01.jpg',
    'accommodation/courtyard-05/bathroom-02.jpg', 'accommodation/courtyard-05/bathroom-03.jpg', 'accommodation/courtyard-05/bathroom-04.jpg', 'accommodation/courtyard-05/bathtub-01.jpg',
    'accommodation/courtyard-05/bathtub-02.jpg', 'services/reception/main-lounge-01.jpg', 'services/reception/window-seat-01.jpg', 'services/reception/tea-lounge-01.jpg',
    'dining/banquet/lei-cha-banquet-01.jpg', 'farming/orchard/fruit-harvest-01.jpg', 'culture/library/reading-room-01.jpg', 'culture/library/waterside-reading-deck-01.jpg',
    'nature/lake/reservoir-reflection-01.jpg', 'architecture/theater/wooden-theater-01.jpg', 'services/meeting/meeting-hall-aerial-01.jpg', 'nature/bamboo/bamboo-path-02.jpg',
    'culture/bamboo/bamboo-meditation-room-01.jpg', 'services/spa/courtyard-spa-01.jpg'
) 'FullName'

Add-Set "$imagesRoot/featured" @(
    'accommodation/courtyard-02/exterior-featured-01.jpg', 'experience/boat/night-lake-boat-featured-01.jpg', 'culture/embroidery/taoyuan-embroidery-featured-01.jpg', 'nature/tea-mountain/tea-mountain-featured-01.jpg',
    'nature/aerial/village-aerial-featured-01.jpg'
)

if (($mappings.Target | Group-Object | Where-Object Count -gt 1).Count -gt 0) {
    throw '映射中存在重复目标路径。'
}
if (($mappings.Source | Group-Object | Where-Object Count -gt 1).Count -gt 0) {
    throw '映射中存在重复源路径。'
}

$mappings | Select-Object Source, Target | Export-Csv -LiteralPath $mapPath -NoTypeInformation -Encoding utf8
foreach ($mapping in $mappings) {
    $targetDirectory = Split-Path -Parent $mapping.Target
    New-Item -ItemType Directory -Force -Path $targetDirectory | Out-Null
    Move-Item -LiteralPath $mapping.Source -Destination $mapping.Target
}

"已移动 $($mappings.Count) 张图片。映射表：$mapPath"
