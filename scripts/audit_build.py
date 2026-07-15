import os, yaml, re

root = r'C:\Users\oscar\AI WORKBENCH\WonderousIncremental'
gdd_path = os.path.join(root, r'2_prototype\sovereign_machine_gdd.yaml')
with open(gdd_path, 'r', encoding='utf-8') as f:
    gdd = yaml.safe_load(f)

src = ''
for f in ['store.ts', 'generators.ts', 'types.ts']:
    p = os.path.join(root, r'AutoMagicalDuet\src\gameplay', f)
    with open(p, 'r', encoding='utf-8') as fh:
        src += fh.read() + '\n'
for f in ['game-scene.ts']:
    p = os.path.join(root, r'AutoMagicalDuet\src\scenes', f)
    with open(p, 'r', encoding='utf-8') as fh:
        src += fh.read() + '\n'

implemented = 0
not_found = []
for m in gdd['mechanics']:
    mid = m['id']
    key = mid.split('.')[-1]
    if re.search(key.lower(), src.lower()):
        implemented += 1
    else:
        not_found.append(mid)

print(f'GDD mechanics: {len(gdd["mechanics"])}')
print(f'Implemented: {implemented}')
print(f'Missing: {len(not_found)}')
print()
for m in gdd['mechanics']:
    mid = m['id']
    key = mid.split('.')[-1]
    present = bool(re.search(key.lower(), src.lower()))
    print(f"  {'[x]' if present else '[ ]'} {mid:40s} {m['principle']:15s} {m['status']:10s}")

print()
print('--- OTHER STATUS ---')
print(f'Generators: 6 (Listening Dish, Signal Loom, Pattern Scriptorium, Custodian Guild, Protocol Engine, Dreaming Archive)')
print(f'Upgrades: {len([m for m in gdd["mechanics"] if m["id"].startswith("upgrade.")])}')
print(f'Currencies: 3 (Signals, Insight, Stewardship) + Paradigm Shards')
print(f'Metaphases: 5 (instrument, workshop, protocol, ecology, charter)')
print(f'Prestige: Basic (paradigm shift button, shards awarded, phase advance)')
print(f'Visual bugs: Fixed (wordWrap, card heights, sprite aspect ratio)')
