import yaml, os

gdd_path = r'C:\Users\oscar\AI WORKBENCH\WonderousIncremental\2_prototype\sovereign_machine_gdd.yaml'
with open(gdd_path, 'r') as f:
    gdd = yaml.safe_load(f)

# Game files that exist
game_dir = os.path.join(os.path.dirname(__file__), '..', 'src')
store_path = os.path.join(game_dir, 'gameplay', 'store.ts')
scene_path = os.path.join(game_dir, 'scenes', 'game-scene.ts')
gen_path = os.path.join(game_dir, 'gameplay', 'generators.ts')

with open(store_path, 'r') as f: store_src = f.read()
with open(scene_path, 'r') as f: scene_src = f.read()
with open(gen_path, 'r') as f: gen_src = f.read()

all_src = store_src + scene_src + gen_src

print(f"GDD has {len(gdd['mechanics'])} mechanics")
print()

for m in gdd['mechanics']:
    mid = m['id']
    # Check if mechanic id or key word appears in source
    key = mid.split('.')[-1]  # e.g. "signals" from "resource.signals"
    present = key.lower() in all_src.lower() or mid.lower() in all_src.lower()
    icon = '[x]' if present else '[ ]'
    print(f"  {icon} {mid:45s} {m['status']:12s} {m['principle']}")

print()
implemented = sum(1 for m in gdd['mechanics'] if m['id'].split('.')[-1].lower() in all_src.lower() or m['id'].lower() in all_src.lower())
print(f"Implemented: {implemented}/{len(gdd['mechanics'])} mechanics")
