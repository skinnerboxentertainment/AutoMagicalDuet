# Retro Adventure Visual Tuner

Companion to `design/aesthetic-styleguide.md`.

The styleguide defines the general Sub Shooter arcade language. This tuner locks the selected hero identity from `public/assets/concept-retro.png`: a copper-and-brass retro adventure submarine with teal glass, readable toy-like proportions, and dense handcrafted mechanical ornament.

## 1. Locked Palette

Measured source image:

- Canvas: 800x400
- Visible submarine bounds: x 35-772, y 18-347
- Visible bounds: 738x330
- Overall silhouette aspect: 2.24:1

### Primary Extracted Clusters

These are sampled/clustered from the image and should be treated as the hero-sub palette core.

| Role | Extracted hex | Styleguide anchor mapping |
| --- | --- | --- |
| Ink contour / deepest occlusion | `#2F1509` | `#101018` Ink outline, warmed for brass/copper art |
| Warm black-brown interior line | `#4E2410` | `#18191C` Smoke black + `#6D3829` Rust shadow |
| Deep glass shadow | `#07231B` | `#07141F` Abyss shadow, shifted green |
| Dark teal glass | `#0F3F35` | `#17606A` Blue teal, darkened |
| Mid teal glass | `#205D54` | `#2B7A78` Murky teal |
| Glass highlight teal | `#468881` | `#7FC6D6` Polar cyan, dirtied/desaturated |
| Copper shadow | `#76301C` | `#6D3829` Rust shadow |
| Main copper hull | `#9A452E` | `#B25A32` Rust orange, darkened/redder |
| Copper highlight | `#B46D40` | `#B25A32` Rust orange + `#C7B579` Paint chip beige |
| Aged brass shadow | `#6A461C` | `#A78942` Brass, shadow step |
| Aged brass mid | `#8C612F` | `#A78942` Brass |
| Brass highlight | `#C28E5A` | `#A78942` Brass, warm highlight |
| Polished brass glint | `#DBA972` | `#C7B579` Paint chip beige + brass highlight |
| Cream fin/window insert | `#ECC997` | `#C7B579` Paint chip beige, warmed |
| Pale reflected highlight | `#F3EAD3` | `#D6D8CF` Edge highlight / `#FFF1B8` warm core |
| Muted glass reflection | `#9AAEAF` | `#9DA7A8` Worn light steel + polar cyan |

### Supporting Frequent Pixel Colors

Use these when hand-tuning ramps or asking for pixel-art output:

`#502010`, `#783020`, `#803020`, `#A04830`, `#481810`, `#703018`, `#883820`, `#702818`, `#904028`, `#682818`, `#002820`, `#002020`, `#002018`, `#B05038`, `#604018`, `#A85038`, `#583810`, `#704818`, `#805820`, `#785020`, `#084038`.

### Palette Correction To Styleguide

The existing styleguide is correct for enemies, stages, effects, and general arcade craft, but the hero submarine should not be primarily olive or steel. Lock hero identity to:

- Dominant material: aged copper hull.
- Secondary material: polished aged brass frames and machinery.
- Tertiary material: deep teal-green glass.
- Accent material: warm cream enamel or canvas-like fin/window inserts.
- Outline: warm dark brown/black, not pure cool black except in deepest occlusion.

## 2. Proportion Bible

### Overall Side View

- Full visible silhouette: 738w x 330h, aspect 2.24:1.
- Main hull excluding tower and tail fins: roughly 650w x 190h, aspect 3.4:1.
- Nose-to-tail read: pointed drill/nose cap, bulbous glass cockpit, long copper cigar hull, narrow engine ring, forked shark-like tail fins.
- Maximum height occurs around the conning tower, not the body center.
- Body centerline sits slightly below the image midpoint, giving the tower room to define the top silhouette.

### Major Shape Ratios

| Feature | Approximate placement / ratio |
| --- | --- |
| Nose tip | At 0-3% of length; small brass point defines direction. |
| Glass cockpit mass | 8-25% of length; tall rounded faceted canopy, about 0.55 body height. |
| Copper mid-body | 24-74% of length; uninterrupted cigar volume with portholes and rivets. |
| Tail cone / engine | 74-88% of length; narrows into brass engine rings. |
| Tail fins | 82-100% of length; top and bottom fins create the rear silhouette. |
| Conning tower | Centered near 39-44% of length; height about 0.95 of body height above upper hull. |
| Periscope pipe | Rises from tower; curved forward; about 0.38 of body height above tower. |
| Large side portholes | Three main circles at about 32%, 47%, and 60% of length; equal spacing. |
| Porthole diameter | About 13-15% of body height including brass rim. |
| Tail fin height | Rear fin spread reaches about 1.15 body heights from top fin tip to bottom fin tip. |

### Recognition Rules

The hero sub stops reading correctly if any of these are removed:

- Copper cigar hull with a downward belly curve and small upper ridge.
- Oversized brass-rimmed teal glass cockpit at the nose.
- Three large circular teal portholes along the side.
- Brass conning tower with rivet banding and curved periscope.
- Brass mechanical rails/tubes along the lower flank.
- Large swept tail fins with cream insert panels.
- Warm dark contour around the entire silhouette.

## 3. Detail Density Map

Detail is high, but not evenly distributed.

### High-Density Zones

- Nose cockpit: faceted brass frame, glass panes, inner shadows, tiny rivets.
- Conning tower: stacked brass bands, rivets, glass lenses, periscope highlights.
- Porthole rims: rings, specular dots, teal glass reflection clusters.
- Lower flank: pipes, brackets, small tank/cylinder, hatch plates.
- Tail engine: concentric brass rings, dark inner aperture, small center pin.
- Panel seams: curved vertical bands following hull volume, with rivet rows.

### Medium-Density Zones

- Copper hull midsection: rivets and seams spaced across the surface, but with enough open copper to read the body color.
- Tail cone: fewer seams, more broad shading to show taper.
- Side fin/wing: one clean brass outline with a central highlight and shadow underneath.

### Rest Zones

- Upper copper hull between tower and tail.
- Large copper body patches between the three portholes.
- Cream tail-fin inserts.
- Broad glass panes after their highlight and shadow shapes are established.

### Practical Density Rule

At source-pixel scale, cluster details in groups of 2-6 pixels, then leave 12-24 pixels of calmer material before the next dense cluster. The image works because rivets and seams describe the form without filling every square inch with equal noise.

## 4. Material Spec

### Copper Hull

- Base: `#9A452E`.
- Shadow: `#76301C`, then `#4E2410` in occluded seams.
- Highlight: `#B46D40`, then small `#DBA972` glints only on exposed edges.
- Surface: curved panel seams, subtle mottling, scattered rivets, worn but not destroyed.
- Avoid flat orange, clean red, or rusty ruin. This is maintained adventure equipment, not scrap.

### Aged Brass

- Base: `#8C612F`.
- Shadow: `#6A461C`.
- Highlight: `#C28E5A`.
- Glint: `#DBA972` and rare `#F3EAD3`.
- Use on structural frames: cockpit ribs, porthole rims, tower bands, periscope, pipes, engine rings, fin borders.
- Brass should look heavier and more polished than copper, with tighter high-contrast edge highlights.

### Teal Glass

- Base shadow: `#07231B`.
- Deep pane: `#0F3F35`.
- Mid reflection: `#205D54`.
- Bright reflection: `#468881`.
- Pale reflected glint: `#9AAEAF` or `#F3EAD3`, used sparingly.
- Glass highlights are chunky curved wedges or crescent shapes, placed in the upper-left quadrant of circular windows and along the top edge of cockpit panes.

### Cream Inserts

- Base: `#ECC997`.
- Shadow: `#C28E5A` or `#8C612F` when adjacent to brass.
- Highlight: `#F3EAD3`.
- Use only as a relief material in tail fins and small nose/cockpit panels. It should never overtake copper or brass.

### Rivets And Bolts

- Rivets are small brass dots with a dark lower-right pixel and warm upper-left highlight.
- On copper panels, rivets should be brass or dark copper depending on local contrast.
- Rivet rows follow curvature. Do not place them in perfectly flat modern CAD-like grids.

## 5. Lighting Formula

- Primary light direction: upper left/front.
- Secondary fill: low warm reflection from brass/copper surfaces.
- Deepest shadows: underside of hull, under side fin, under pipe brackets, inside engine aperture, lower-right edge of porthole rims.
- Highlight shape: small hard-edged pixel clusters, curved edge strokes, and oval glints rather than soft gradients.
- Shadow depth: strong enough to separate material layers, but not black-crushed except at holes and silhouette contact.
- Glass rule: brightest highlight sits upper-left; darkest teal sits lower-right/interior.
- Brass rule: high contrast at rims and raised bands; thin pale highlights along top-left edges.
- Copper rule: broader, lower-contrast ramp across the hull, with brighter flecks only on rivets and chipped edges.

## 6. View Consistency Rules

The provided reference image is a polished side view. Future 3/4 views must preserve the same identity, not redesign the vehicle.

### Side View To 3/4 Translation

- Keep the silhouette length-dominant: 3/4 view can shorten apparent length by 10-18%, but must remain a long submarine, not a round pod.
- Preserve the nose cockpit as the dominant front mass with faceted teal panes.
- Maintain three side portholes when the side is visible; in 3/4, the farthest rear porthole may be smaller or partially occluded.
- Keep the conning tower at the same longitudinal station: slightly forward of hull center.
- Keep the curved forward periscope and brass tower cap.
- Tail fins must still read as swept, organic adventure fins with cream inserts.
- Engine rings remain brass and concentric; in 3/4, show ellipse perspective but keep the dark inner aperture.

### Consistency Checks

- Same palette proportions: copper first, brass second, teal third, cream accent.
- Same porthole language: circular, thick brass rims, teal glass.
- Same mechanical ornament: rivets, seams, pipes, hatch plates.
- Same lighting direction: upper-left highlights even as perspective changes.
- Same amount of rest space: 3/4 perspective must not become a fully noisy object.

## 7. gpt-image-2 Prompt Templates

Use the styleguide templates for the broad arcade target, then append this tuner language for the hero sub.

### Hero Sub Side View

```text
Create an original retro-adventure arcade pixel art hero submarine, side view, transparent background. Lock the design to this identity: long copper cigar hull, aged brass cockpit ribs and porthole rims, deep teal glass, cream tail-fin inserts, three large circular side portholes, faceted glass nose cockpit, brass conning tower slightly forward of center, curved forward periscope, lower brass pipes and hatch plates, swept shark-like tail fins, concentric brass engine ring. Proportions: full silhouette about 2.24:1, main hull about 3.4:1, cockpit occupies the front quarter, conning tower around 40% of length, three portholes evenly spaced through the mid-body. Palette: copper #9A452E/#76301C/#B46D40, brass #8C612F/#C28E5A/#DBA972, glass #07231B/#0F3F35/#205D54/#468881, cream #ECC997/#F3EAD3, warm ink contour #2F1509. Dense hand-authored 1993 arcade pixel craft, crisp nearest-neighbor pixels, dark warm outline, hard-edged highlights from upper left, clustered rivets and seams with calm copper rest zones, no text, no logo.
```

### Hero Sub 3/4 View

```text
Create an original retro-adventure arcade pixel art hero submarine in 3/4 view, transparent background, matching the same vehicle as the side-view hero. It must remain a long copper submarine, not a round pod: copper cigar hull, oversized faceted teal glass nose cockpit, three brass-rimmed teal portholes visible along the side with perspective compression, brass conning tower slightly forward of center, curved forward periscope, lower brass pipes, swept tail fins with cream inserts, concentric brass engine rings shown as ellipses. Preserve the locked palette: copper #9A452E/#76301C/#B46D40, brass #8C612F/#C28E5A/#DBA972, glass #07231B/#0F3F35/#205D54/#468881, cream #ECC997/#F3EAD3, warm ink #2F1509. Lighting from upper left, chunky pixel highlights, dense details clustered around cockpit, tower, portholes, pipes, and engine, calmer broad copper panels between. Crisp 1993 arcade pixel art, no antialiasing, no text, no logo.
```

### Hero Sub Idle Sheet

```text
Create a 6-frame horizontal sprite sheet for the locked retro-adventure hero submarine. Source frame size 96x48 pixels, transparent background, crisp nearest-neighbor pixel art. Same design in every frame: long copper hull, brass nose cockpit frame, teal glass panes, three circular brass-rimmed portholes, brass conning tower and curved forward periscope, lower pipes, swept tail fins with cream inserts, brass engine ring. Animate only subtle arcade idle details: 1-2 px bob, propeller/engine flicker, small bubble puffs behind engine, tiny glass highlight shimmer, slight periscope wobble. Keep silhouette stable and readable. Use palette copper #9A452E/#76301C/#B46D40, brass #8C612F/#C28E5A/#DBA972, glass #07231B/#0F3F35/#205D54/#468881, cream #ECC997/#F3EAD3, warm outline #2F1509.
```

### Orthographic Model Sheet

```text
Create an original pixel art model sheet for the locked retro-adventure hero submarine: side view, 3/4 front view, and 3/4 rear view on a transparent background. All views must show the same vehicle with identical materials and proportions: long copper cigar hull, faceted teal glass nose cockpit, three brass-rimmed teal portholes, brass conning tower slightly forward of center with curved forward periscope, lower brass pipes, swept tail fins with cream inserts, brass engine rings. Use the locked palette and upper-left lighting. Keep detail clusters consistent between views and preserve rest zones on broad copper panels. Crisp 1993 arcade pixel art, no text, no logo, no antialiasing.
```

## 8. Negative Prompt Additions

Append these to the existing styleguide negative prompts when generating hero-sub art:

```text
Avoid olive-green hero hull, gray steel-dominant hero hull, sleek sci-fi submarine, smooth vector submarine, realistic 3D render, modern clean concept art, flat cel shading, soft airbrush gradients, plastic toy gloss, steampunk top-hat fantasy, excessive pipes covering the whole hull, equal-detail noise everywhere, missing three side portholes, missing brass conning tower, missing curved periscope, missing faceted teal nose cockpit, round pod silhouette, stubby chibi submarine, pure black outlines, blue glass without green depth, tail fins without cream inserts, front cockpit redesigned as a windshield-only car cabin, inconsistent lighting between views.
```

## Match Grade Against Current Styleguide

### Palette

Grade: B+.

The image follows the guide's warm machinery, brass, rust, teal glass, and warm highlight families. It diverges from the recommended player-sub olive/steel baseline by making copper the dominant identity. The styleguide should explicitly allow the hero sub to use a copper/brass adventure palette while reserving olive/steel for alternate vehicles, enemies, and military props.

### Sprite Construction

Grade: A-.

The image strongly follows silhouette-first construction, high-value dark contour, hue-shifted material ramps, clustered details, rivets, seams, portholes, pipes, and exaggerated functional parts. It is more painterly/high-resolution than a final 64x32 gameplay sprite, so production sprites should simplify while preserving the silhouette, three portholes, tower, and material hierarchy.

### Design Philosophy

Grade: A.

The sub has exaggerated but readable function: drill-like nose, glass cockpit, portholes, tower/periscope, lower pipes, engine ring, and fins. It feels engineered but caricatured. This is exactly the direction the guide describes, with a stronger Jules Verne / retro-adventure identity than the more military Irem baseline.

### PixiJS Rendering

Grade: A-.

Nearest-neighbor scaling, layered particles, pixelated glow, scanlines, and palette-consistent bubbles will preserve the look. The main risk is overusing bloom or underwater color grading, which could flatten the brass/copper contrast and teal glass. Keep hero sprites either ungraded or only lightly graded.

### Recommended Styleguide Changes

- Add this hero-specific palette exception: copper/brass/teal/cream is the player-sub identity.
- Add a note that dense art must still include rest zones, especially on broad hull panels.
- Add model-sheet consistency requirements for side and 3/4 views.
- Add negative prompts for missing portholes, missing tower/periscope, overly sleek sci-fi forms, and olive/gray drift on the hero.
- Add guidance that brass has tighter, brighter highlights than copper; copper uses broader, warmer ramps.

## Retro Adventure Feel

The image reads retro-adventure because it combines:

- Jules Verne-like brass, glass, rivets, periscope, and pressure-vessel forms.
- A warm copper hull instead of modern naval gray.
- Ornamental but functional mechanical details: pipes, hatches, cockpit ribs, engine rings.
- Chunky caricature proportions: long hull, oversized portholes, tall tower, dramatic tail fins.
- Hand-authored arcade density: every detail supports material, scale, or function.
- Theatrical upper-left highlights that make the vehicle feel collectible, readable, and heroic.

