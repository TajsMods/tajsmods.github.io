---
title: Nodes/Windows Research (Vanilla)
---

- Registry source: `data/windows.json` defines the canonical window id keys and metadata (name, icon, description, scene, category, sub_category, level, requirement, hidden, attributes, data, guide).
- Data load: `scripts/data.gd` loads `data/windows.json` into `Data.windows` during `_init`.
- Menu/catalog build: `scripts/windows_menu.gd` iterates `Data.windows` in `_ready` and creates `window_button.tscn` entries per category/sub_category.
- Panel/placer UI: `scenes/window_panel.gd` and `scenes/window_dragger.gd` read `Data.windows[name].scene` and instantiate with `load("res://scenes/windows/" + scene + ".tscn")`.
- Spawn pipeline: `Signals.create_window.emit(window)` is handled by `scripts/desktop.gd::_on_create_window`, which adds to `Desktop/Windows` and plays SFX.
- Save/load: `scenes/windows/window_container.gd` saves `filename = scene_file_path.get_file()`; `scripts/desktop.gd::add_windows_from_data` loads from `res://scenes/windows/` + `filename`.
- Node id usage: `scenes/windows/window_indexed.gd` uses `window` (id) to read `Data.windows` and updates `Globals.window_count` and group counts.
- Attributes/init: `scripts/attributes.gd::init_attributes` builds `Attributes.window_attributes` from `Data.windows[window].attributes`.
- Globals/init: `scripts/globals.gd::init_vars` initializes `Globals.window_count` and `Globals.windows_data` from `Data.windows`.
