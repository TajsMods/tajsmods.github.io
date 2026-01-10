---
title: Taj's Core API
---

# Taj's Core API

All APIs are accessed from the Core singleton:

```gdscript
var core = Engine.has_meta("TajsCore") ? Engine.get_meta("TajsCore") : null
if core == null:
    return
```

## Versioning

```gdscript
var version = core.get_version()
var ok = core.require("1.0.0")
var cmp = core.compare_versions("1.0.0", "1.0.1")
```

## Module Registry

```gdscript
core.register_module({
    "id": "YourNamespace-YourMod",
    "name": "Your Mod",
    "version": "1.0.0",
    "min_core_version": "1.0.0"
})
```

Emits `module.registered` on the event bus.

## Node Registration

Register custom windows that appear in the game's window menu:

```gdscript
var base_dir = get_script().resource_path.get_base_dir()
var scene_path = base_dir.path_join("scenes/windows/window_mywindow.tscn")

core.nodes.register_node({
    "id": "YourNamespace-YourMod.my_window",
    "mod_id": "YourNamespace-YourMod",
    "display_name": "My Custom Window",
    "description": "A custom window from my mod.",
    "packed_scene_path": scene_path,
    "icon": "window",              # Icon name from textures/icons/
    "category": "utility",         # network, cpu, gpu, research, hacking, factory, coding, utility
    "sub_category": "file",        # Sub-category within the menu
    "level": 0,                    # Required player level
    "requirement": "",             # e.g., "research.some_research"
    "hidden": false,               # Hide from menu until unlocked
    "attributes": {"limit": -1},   # -1 = unlimited instances
    "data": {},                    # Custom data dictionary
    "guide": ""                    # Help text key
})
```

### Scene Requirements

Your window scene **must** follow this format:

```
[gd_scene load_steps=3 format=3]

[ext_resource type="PackedScene" uid="uid://b46qouyu3lx2m" path="res://scenes/windows/window_base.tscn" id="1_base"]
[ext_resource type="Script" path="res://mods-unpacked/YourMod/scenes/windows/my_window.gd" id="2_script"]

[node name="WindowBase" instance=ExtResource("1_base")]
script = ExtResource("2_script")
window = "YourNamespace-YourMod_my_window"
```

**Important:**
- Use the **UID** for `window_base.tscn` (copy from a working scene)
- Root node name must be `"WindowBase"`
- The `window` property must match your node ID with dots replaced by underscores

### Script Requirements

Your window script should extend `WindowIndexed`:

```gdscript
extends WindowIndexed

# Override export() and save() to include the relative scene path
func export() -> Dictionary:
    var data = super()
    data["filename"] = "../../mods-unpacked/YourMod/scenes/windows/my_window.tscn"
    return data

func save() -> Dictionary:
    var data = super()
    data["filename"] = "../../mods-unpacked/YourMod/scenes/windows/my_window.tscn"
    return data
```

Once registered, your window will appear in the game's window menu. The vanilla game handles spawning when the player clicks it.

## Settings

Register a schema (namespaced keys recommended):

```gdscript
core.settings.register_schema("YourNamespace-YourMod", {
    "yourmod.enabled": {"type": "bool", "default": true},
    "yourmod.count": {"type": "int", "default": 5}
})
```

Read and write:

```gdscript
var enabled = core.settings.get_bool("yourmod.enabled", true)
core.settings.set_value("yourmod.enabled", false)
```

Listen for changes:

```gdscript
core.settings.value_changed.connect(Callable(self, "_on_setting_changed"))
```

## Event Bus

```gdscript
core.event_bus.on("core.ready", Callable(self, "_on_core_ready"), self, true)
core.event_bus.emit("my.event", {"payload": 1})
```

## Keybinds

```gdscript
var evt := InputEventKey.new()
evt.keycode = KEY_F8
evt.pressed = true
core.keybinds.register_action(
    "YourNamespace-YourMod.toggle",
    "Toggle Feature",
    [evt],
    "gameplay",
    Callable(self, "_on_toggle"),
    "YourNamespace-YourMod",
    0
)
```

**Contexts:**
- `"gameplay"` - Only triggers when no text input is focused
- `"ui"` - Only triggers when UI is focused
- `"any"` - Always triggers

Conflicts and UI data:

```gdscript
var conflicts = core.keybinds.get_conflicts()
var actions = core.keybinds.get_actions_for_ui()
```

Rebinding:

```gdscript
core.keybinds.set_binding("yourmod.toggle", [new_event])
core.keybinds.reset_to_default("yourmod.toggle")
```

## Convenience Helpers

```gdscript
core.notify("check", "Operation complete")
core.play_sound("click")
core.copy_to_clipboard("https://example.com")
```

## Command Palette Settings

Palette state/config is available when the Command Palette mod is installed:

```gdscript
if core.command_palette != null:
    core.command_palette.set_enabled(true)
    core.command_palette.set_value("wire_drop_menu_enabled", true)
    var favorites = core.command_palette.get_favorites()
```

## Patches

Apply one-time patches and signal connections:

```gdscript
core.patches.apply_once("yourmod.patch", func():
    core.patches.connect_signal_once(node, "ready", Callable(self, "_on_ready"), "yourmod.ready")
)
```

## Diagnostics

```gdscript
var snapshot = core.diagnostics.collect()
var json = core.diagnostics.export_json()
var tests = core.diagnostics.self_test()
```
