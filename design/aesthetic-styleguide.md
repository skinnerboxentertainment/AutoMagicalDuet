# Sub Shooter Aesthetic Styleguide

Target reference: Irem's **In the Hunt** arcade look, filtered through the same visual lineage that later produced **Metal Slug**. This is not a request to copy those games' assets, characters, logos, or exact compositions. Use the principles below to generate original Sub Shooter art with the same kind of dense, hand-authored arcade craft.

## Research Notes

Sources reviewed:

- Hardcore Gaming 101, ["In the Hunt"](https://www.hardcoregaming101.net/in-the-hunt/) - notes the shared developer lineage with Nazca/Metal Slug, "overwhelmingly-detailed graphics," "superbly-animated sprites," detailed backdrops, and vibrant colors.
- Museum of the Game, ["In The Hunt - Videogame by Irem"](https://www.arcade-museum.com/Videogame/in-the-hunt) - describes a mostly horizontal scrolling game with large, colorful enemies and heavy cannon/vehicle presence.
- Wikipedia, ["In the Hunt"](https://en.wikipedia.org/wiki/In_the_Hunt) - identifies the 1993 Irem M-92 arcade release, Kazuma Kujo's design role, Akio Oyabu as graphic designer, and the future Nazca/Metal Slug team connection.
- 6th Division's Den, ["Metal Slug Spriting Tutorial"](https://6th-divisions-den.com/ms_tutorial.html) - breaks the related Metal Slug sprite style into shaping, coloring, and shading/details, emphasizing exaggerated proportions and strong reference use.
- GamesRadar, ["30 years on, Metal Slug's arcade action and stylish visuals owe Studio Ghibli a debt"](https://www.gamesradar.com/games/action/30-years-on-metal-slugs-arcade-action-and-stylish-visuals-owe-studio-ghibli-a-debt-we-were-very-much-inspired-by-hayao-miyazakis-book-daydream-note/) - confirms the Irem/Nazca lineage, the In the Hunt to Metal Slug connection, detailed animation, submarine origins, and Miyazaki/Daydream Note influence on the later vehicle design sensibility.

## Visual Diagnosis

### Color Palette Tendencies

The In the Hunt look is not a limited flat-palette indie style. It is arcade-rich: many close-value ramps, strong hue contrast, and dirty mechanical neutrals against saturated water, fire, and warning colors.

Dominant families:

- Deep aquatic blues, blue-greens, and blackened teal for water, depth, and shadow.
- Cold grays and steel blues for submarines, ships, turrets, wreckage, and industrial props.
- Rust, brass, olive, and military green for worn machinery.
- Warm explosive oranges, yellows, and white-hot cores for impact effects.
- Coral reds and hazard yellows for readable enemy weak points, powerups, UI alerts, and projectile identity.
- Icy cyan and desaturated polar blues for stage atmospherics.

The key is value control: backgrounds are detailed but usually lower contrast than active sprites. Enemies and bullets get sharper highlights, warmer accents, and stronger outlines.

### Sprite Size And Detail Level

Use medium-large arcade sprites with enough pixel area for readable mechanics and personality.

- Player submarine: 48x24 to 72x36 source pixels.
- Small enemies: 24x16 to 48x32 source pixels.
- Medium enemies and turrets: 48x32 to 96x64 source pixels.
- Boss parts: modular chunks from 64x64 to 160x96 source pixels.
- Projectiles: 4x4 to 16x16 source pixels.
- Explosions: 32x32, 48x48, 64x64, and 96x96 source-pixel variants.
- UI icons: 16x16 or 24x24 source pixels.

Detail density should be high but clustered. Put dense rivets, vents, panel seams, bolts, hatches, pipes, decals, and chipped paint around silhouette-defining areas. Leave small resting zones inside large hull panels so sprites do not become unreadable noise.

### Background Style

Backgrounds should feel like hand-painted pixel dioramas, not tiled wallpaper.

- Use multi-layer parallax: far water gradients, mid silhouettes, near ruins/ice/industrial debris, foreground bubbles or drifting silt.
- Include environmental storytelling: broken pipes, sunken signage, drowned buildings, mine chains, damaged bulkheads, polar ice shelves, wrecked ships.
- Keep backgrounds lower saturation and lower contrast than gameplay sprites.
- Use atmospheric depth: distant layers shift toward blue-green or cold cyan, with reduced contrast.
- Foreground decorative elements can be high detail, but keep the gameplay lane clear.

### Character And Enemy Design Philosophy

The Irem/Nazca lineage gives machines personality through exaggerated proportion, readable function, and overbuilt mechanical detail.

- Silhouettes come first: squat submarines, chunky turrets, bulbous mines, oversized cannons, compact helicopters, awkward heavy machinery.
- Designs should look engineered but slightly caricatured.
- Enemy craft should telegraph attack roles through shape: long barrels for snipers, swollen bomb bays for droppers, exposed engines for fast movers, plated fronts for chargers.
- Add asymmetry and damage: patched plates, offset periscopes, dangling cables, bent fins, scratched paint.
- Avoid sleek sci-fi minimalism. Favor dieselpunk, late-industrial military hardware, and handmade mechanical clutter.

### Explosions And Effects

Effects should be physical, chunky, and frame-readable.

- Explosions use a white/yellow core, orange body, red-brown outer smoke, and dark gray debris.
- Underwater blasts should add ring bubbles, radial shock ripples, and pale cyan displaced water around the hot core.
- Use stepped clusters, not soft gradients.
- Animate with strong expansion, debris ejection, secondary puffs, and dissipating smoke.
- Projectile trails can use 2-4 frame flicker, alternating hot pixels and smoke/bubble particles.
- Impacts should throw small metal shards and bubbles in directional arcs.

### UI And Typography

The UI should feel like early-1990s arcade hardware: compact, functional, and high contrast.

- Use blocky bitmap text or a pixel font with square counters and tight spacing.
- Prefer white, pale yellow, cyan, and red on dark navy/black translucent plates.
- Use labels like `SCORE`, `DEPTH`, `TIME`, `ARM`, `P1`, and compact numeric counters.
- Avoid modern rounded cards, soft shadows, and large clean vector typography.
- HUD panels should be 1-2 px outlines, dark fills, and small hazard-color accents.

### What Makes It Feel Like Irem

The Irem quality is the combination of disciplined shooter readability and excessive craft.

- Dense mechanical surfaces, but with exact gameplay silhouettes.
- Large, colorful enemies that feel like boss parts even when small.
- R-Type-like pressure: enemy design appears purpose-built around attack angles and spatial control.
- Strong animation personality: machines recoil, bob, rattle, flash, smoke, flood, and fall apart.
- Stages feel authored, not procedural: every prop looks placed to support a specific underwater military fantasy.
- The mood is darker and more oppressive than many run-and-gun pixel games, but still colorful and theatrical.

## Recommended Palette

Use these as anchor colors, then create 4-7 step ramps per material.

### Water And Depth

| Use | Hex |
| --- | --- |
| Abyss shadow | `#07141F` |
| Deep navy | `#0B2235` |
| Cold deep blue | `#123B57` |
| Blue teal | `#17606A` |
| Murky teal | `#2B7A78` |
| Polar cyan | `#7FC6D6` |
| Foam highlight | `#D3F3F2` |

### Steel And Machinery

| Use | Hex |
| --- | --- |
| Ink outline | `#101018` |
| Dark gunmetal | `#242B34` |
| Blue steel | `#3C5262` |
| Mid steel | `#667783` |
| Worn light steel | `#9DA7A8` |
| Edge highlight | `#D6D8CF` |

### Military And Worn Paint

| Use | Hex |
| --- | --- |
| Dark olive | `#2F3B2C` |
| Submarine green | `#4D6445` |
| Faded olive | `#7C8650` |
| Brass | `#A78942` |
| Rust shadow | `#6D3829` |
| Rust orange | `#B25A32` |
| Paint chip beige | `#C7B579` |

### Hazards, Weapons, And Pickups

| Use | Hex |
| --- | --- |
| Alarm red | `#C7362F` |
| Coral red | `#E05A47` |
| Hot orange | `#F07924` |
| Blast yellow | `#F6C94A` |
| White-hot core | `#FFF1B8` |
| Powerup cyan | `#44D5E6` |
| Signal green | `#7DD66A` |

### Smoke, Silt, And Debris

| Use | Hex |
| --- | --- |
| Smoke black | `#18191C` |
| Charcoal | `#35363A` |
| Brown smoke | `#5D4B42` |
| Silt tan | `#8C7A5C` |
| Pale silt | `#B8AA83` |

## Sprite Construction Rules

- Build every sprite from a readable silhouette at 1x before adding details.
- Use a dark outline on active sprites, usually 1 px at source resolution.
- Use hue-shifted ramps: shadows move toward navy/purple or green; highlights move toward pale yellow/cyan.
- Prefer hand-placed dithering only in broad materials like water, smoke, metal gradients, and background stone.
- Use clusters of 2-6 pixels for rivets, vents, chips, and panel seams.
- Exaggerate functional parts: guns, propellers, torpedo tubes, periscopes, engines, claws, drill noses.
- Add small idle animation affordances: exhaust bubbles, slight bobbing, periscope wobble, rotating prop, blinking lamp.
- Keep bullets and pickups cleaner and brighter than the art around them.

## PixiJS Rendering Techniques

Use PixiJS to preserve pixel-art sharpness and add arcade presentation treatment.

- Render pixel art with nearest-neighbor scaling. Avoid texture smoothing for sprites.
- Keep source art at 1x and scale by integer multiples when practical.
- Use layered containers for parallax: far background, mid terrain, gameplay, foreground particles, HUD.
- Add a subtle scanline overlay at final compositing scale: 1 dark line every 2-3 screen pixels at 8-14% opacity.
- Add very light CRT curvature only if it does not distort gameplay precision.
- Use palette-consistent particle sprites for bubbles, smoke, sparks, debris, and shock rings.
- Use additive blending sparingly for white-hot explosion cores, muzzle flashes, and powerup glows.
- Use normal alpha blending for smoke, silt, and water haze.
- Apply a low-opacity blue-green full-screen grade underwater; exempt HUD or keep HUD in a separate ungraded layer.
- Avoid blurry bloom. If glow is needed, use pixelated duplicate sprites or small stepped halos.
- Camera shake should be short and mechanical: 2-5 px displacement for impacts and boss damage.

## Animation Guidelines

- Player idle: 4-6 frames, slow bob, propeller flicker, 1-2 bubble emitters.
- Small enemy movement: 4-8 frames, readable recoil or engine movement.
- Turret fire: anticipation frame, muzzle flash, recoil, settle.
- Explosion: 6-10 frames for small blasts, 10-16 frames for large blasts.
- Boss damage: flash, armor chip, smoke leak, exposed machinery, secondary explosions.
- Use subpixel-style animation by changing highlight/shadow clusters and silhouette edge pixels, not by moving the whole sprite every frame.

## gpt-image-2 Prompt Templates

Use these templates for original assets. Replace bracketed fields.

### Player Submarine Sprite Sheet

```text
Create an original 1993 arcade pixel art sprite sheet for a side-view submarine hero in an underwater shooter. Style: dense Irem/Nazca lineage pixel art, hand-authored 2D arcade look, chunky readable silhouette, dieselpunk military submarine, worn olive steel hull, rivets, panel seams, periscope, torpedo tubes, propeller bubbles, chipped paint. Source sprite size 64x32 pixels per frame, 6 idle frames in a single horizontal row, transparent background, crisp nearest-neighbor pixels, no antialiasing, no modern vector style, no text, no logo, no existing game characters.
```

### Enemy Craft

```text
Create an original pixel art enemy sprite sheet for [enemy role: turret sub / mine layer / patrol diver / mini-boss cannon craft] in an underwater arcade shooter. Visual style: early-1990s Irem arcade, highly detailed mechanical pixel art, exaggerated functional silhouette, large readable weapon parts, dark outline, blue-steel shadows, rust and hazard-color accents, small lamps and vents, damaged panels. Include [frame count] frames for [idle / attack / damage] animation, each frame [width]x[height] source pixels, transparent background, crisp pixel edges, no antialiasing, no text.
```

### Background Layer

```text
Create an original horizontal scrolling underwater arcade game background layer, 1993 hand-drawn pixel art style inspired by dense Irem/Nazca craftsmanship. Subject: [sunken city / polar ice trench / flooded factory / wrecked battleship graveyard]. Wide parallax layer, detailed but lower contrast than sprites, murky teal and deep navy water, atmospheric depth, silt, pipes, wreckage, small environmental storytelling props, no foreground gameplay obstacles, no characters, no text, seamless horizontal scrolling feel, crisp pixel art, no antialiasing.
```

### Boss Sprite

```text
Create an original large boss sprite for an underwater arcade shooter: [boss concept]. Style: dense 1993 Irem arcade pixel art, modular war machine, exaggerated cannons and weak points, bulky dieselpunk submarine engineering, layered armor plates, rivets, rust, warning stripes, exposed pipes, damageable parts, dark blue-green shadows, warm hazard accents. Sprite should read clearly at 1x, approximate source size [width]x[height] pixels, transparent background, crisp nearest-neighbor pixels, no antialiasing, no text, no logo, no existing IP.
```

### Explosion Sheet

```text
Create an original underwater explosion pixel art sprite sheet for a 1993 arcade shooter. 10 frames in one horizontal row, each frame 64x64 source pixels, transparent background. White-yellow hot core, orange blast body, red-brown smoke, dark debris chunks, cyan shock ring, bubble clusters, stepped pixel clusters, no soft airbrush gradients, crisp nearest-neighbor pixel art, no text.
```

### HUD Elements

```text
Create original pixel art HUD elements for a 1993 underwater arcade shooter: compact score panel, depth meter, weapon icon frame, lives submarine icon, warning alert. Dark navy plates, 1-2 pixel pale steel outlines, cyan and yellow highlights, red warning accents, blocky bitmap arcade typography placeholders only, transparent background, crisp pixel art, no modern UI cards, no rounded glossy buttons.
```

## Negative Prompt Additions

Append these to art prompts when the model drifts modern:

```text
Avoid smooth vector art, modern mobile game UI, flat minimalist icons, soft gradients, painterly brush strokes, 3D render, realistic lighting, anime character focus, clean sci-fi surfaces, oversized bloom, rounded app-style panels, blurry antialiasing, copyrighted characters, logos, exact Metal Slug or In the Hunt assets.
```

## Acceptance Checklist

- Sprite reads clearly at 1x and remains attractive at 2x or 3x.
- Active gameplay objects have stronger contrast than backgrounds.
- Machinery has personality through silhouette, recoil, damage, and small mechanical details.
- Palette uses cold aquatic bases plus warm weapon/effect accents.
- Backgrounds are dense and authored but do not compete with bullets.
- Effects are chunky and frame-readable, not soft particles.
- HUD feels like a compact arcade overlay, not a modern web app.
