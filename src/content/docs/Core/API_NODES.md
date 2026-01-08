---
title: Node API (Core)
---

Core exposes a node/window registry and a safe spawner that mirror the vanilla window pipeline.

Access
```gdscript
var core = Engine.has_meta("TajsCore") ? Engine.get_meta("TajsCore") : null
if core == null:
    return
var registry = core.nodes # alias for core.node_registry
var spawner = core.node_spawner
```

NodeRegistry
- `register_node(def: Dictionary) -> bool`
- `unregister_node(node_id: String) -> bool`
- `get_node_def(node_id: String) -> Dictionary`
- `list_nodes(filter: Dictionary = {}) -> Array`
- `refresh_node_catalog() -> bool`
- `can_spawn(node_id, context)` / `spawn(...)` / `create_instance(...)` are forwarded when the spawner is available.

Required definition fields
- `id`: namespaced string (`ModId.node_id`).
- `display_name`: shown in UI (can be a translation key or literal).
- `packed_scene_path` OR `factory`:
  - `packed_scene_path` should be a `res://` path to a `.tscn`.
  - `factory` should be a valid `Callable` returning a `Node`.

Optional fields (mapped to vanilla `Data.windows`)
- `description` (String)
- `icon` (String id, e.g. `"window"`)
- `icon_path` (String `res://.../icon.png`)
- `category` (String: `network`, `cpu`, `gpu`, `research`, `hacking`, `factory`, `coding`, `utility`)
- `sub_category` (String, must exist under the category in WindowsMenu)
- `group` (String, should match vanilla group ids if used)
- `level` (int, default 0)
- `requirement` (String, default "")
- `hidden` (bool, default false)
- `attributes` (Dictionary, default `{ "limit": -1 }`)
- `data` (Dictionary, default `{}`)
- `guide` (String)
- `tags` (Array)
- `mod_id` (String, optional override of the id prefix)

Events
- `nodes.registered` payload: `{ "id": node_id, "mod_id": mod_id }`
- `nodes.failed` payload: `{ "id": node_id, "mod_id": mod_id, "reason": reason }`

Spawner
- `can_spawn(node_id, context={}) -> bool`
- `spawn(node_id, context={}) -> Node?`
- `create_instance(node_id) -> Node?`

Spawn context keys
- `position` (Vector2 world position)
- `global_position` (Vector2 world position)
- `screen_position` (Vector2 screen position; converted via `Utils.screen_to_world_pos`)
- `snap` (bool, default true; snaps to 50px grid)
- `dry_run` (bool, default false; returns instance without placing)
- `ignore_limits` (bool, default false)
- `parent` (Node; used only when spawning non-window nodes)

Save/load compatibility
Vanilla saves store `filename` relative to `res://scenes/windows/`. If your scene lives outside that folder, override `export()` and `save()` in your window script to store a relative path. Core provides a helper:

```gdscript
const NodeDefs := preload("res://mods-unpacked/TajemnikTV-Core/core/nodes/node_defs.gd")

func export() -> Dictionary:
    var data = super()
    data["filename"] = NodeDefs.make_save_filename(scene_file_path)
    return data

func save() -> Dictionary:
    var data = super()
    data["filename"] = NodeDefs.make_save_filename(scene_file_path)
    return data
```

If you register a node after the WindowsMenu UI is built, call `core.nodes.refresh_node_catalog()` to inject buttons into the menu.
