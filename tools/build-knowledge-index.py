import json
import re
from pathlib import Path

knowledge_dir = Path(__file__).resolve().parent.parent / "knowledge"
index = {}

for domain_dir in sorted(knowledge_dir.iterdir()):
    if not domain_dir.is_dir() or domain_dir.name.startswith("."):
        continue
    domain = domain_dir.name
    chunks = []
    for f in sorted(domain_dir.glob("*.md")):
        if f.name == "README.md":
            continue
        content = f.read_text(encoding="utf-8")
        fm = {}
        body = content
        if content.startswith("---"):
            end = content.find("---", 3)
            if end != -1:
                fm_text = content[3:end].strip()
                body = content[end + 3 :].strip()
                for line in fm_text.split("\n"):
                    if ":" in line:
                        key, val = line.split(":", 1)
                        key = key.strip()
                        val = val.strip()
                        if val.startswith("[") and val.endswith("]"):
                            val = [v.strip().strip('"') for v in val[1:-1].split(",")]
                        elif val.startswith('"') and val.endswith('"'):
                            val = val[1:-1]
                        fm[key] = val
        title_match = re.search(r"^#\s+(.+)", body, re.MULTILINE)
        title = title_match.group(1) if title_match else f.stem
        desc_match = re.search(r"^(?!$)(.+?)(?:\n\n|\n\-|$)", body, re.MULTILINE)
        desc = desc_match.group(1).strip() if desc_match else ""
        if len(desc) > 200:
            desc = desc[:200] + "..."
        chunks.append(
            {
                "id": f.stem,
                "title": title,
                "description": desc,
                "tags": fm.get("tags", []),
                "triggers": fm.get("triggers", []),
                "related": fm.get("related", []),
                "body": body,
            }
        )
    if chunks:
        index[domain] = chunks

out_path = knowledge_dir / "index.json"
out_path.write_text(json.dumps(index, indent=2, ensure_ascii=False), encoding="utf-8")

public_path = Path(__file__).resolve().parent.parent / "public" / "knowledge" / "index.json"
public_path.parent.mkdir(parents=True, exist_ok=True)
public_path.write_text(json.dumps(index, indent=2, ensure_ascii=False), encoding="utf-8")

total = sum(len(v) for v in index.values())
print(f"Written {total} chunks across {len(index)} domains to knowledge/ and public/knowledge/")
print(f"Domains: {list(index.keys())}")
