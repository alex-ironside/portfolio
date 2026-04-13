# GSD Debug Knowledge Base

Resolved debug sessions. Used by `gsd-debugger` to surface known-pattern hypotheses at the start of new investigations.

---

## dog-unassigned-from-all-groups-on-sidebar-drop — dragging dog to roster removes from all groups instead of source group only
- **Date:** 2026-04-14
- **Error patterns:** drag, drop, roster, sidebar, removeDogFromGroup, group membership, unassigned, all groups, multi-group
- **Root cause:** GroupBuilder.handleDragEnd looped over all walkGroups and called removeDogFromGroup for every group containing the dragged dog when dropped on 'roster'. MiniDogCard already passed groupId in drag data (data.current.groupId) but handleDragEnd ignored it.
- **Fix:** Replace all-groups loop with single targeted call using sourceGroupId from event.active.data.current?.groupId. If absent (RosterRow drag with no groupId), do nothing — it's a no-op.
- **Files changed:** dog tracker/src/components/GroupBuilder.tsx, dog tracker/src/components/GroupBuilder.test.tsx
---

