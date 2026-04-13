---
status: resolved
trigger: "When a dog that belongs to multiple groups is dragged and dropped back to the sidebar, it gets unassigned from ALL groups instead of only the one the drag originated from."
created: 2026-04-14T00:00:00Z
updated: 2026-04-14T00:05:00Z
---

## Current Focus
<!-- OVERWRITE on each update - reflects NOW -->

hypothesis: CONFIRMED AND FIXED
test: All 228 tests pass including new regression test
expecting: n/a — resolved
next_action: archive

## Symptoms
<!-- Written during gathering, then IMMUTABLE -->

expected: Dog stays assigned to all groups it was already in. Only the specific group the drag originated from should lose the dog.
actual: Dog is unassigned from ALL groups when dropped back to the sidebar.
errors: None reported — silent data mutation.
reproduction: Dog is assigned to multiple groups. Drag the dog (from sidebar or a group card) and drop it back onto the sidebar. All group assignments are cleared.
started: Unknown — user unsure if it ever worked correctly.

## Eliminated
<!-- APPEND only - prevents re-investigating -->

## Evidence
<!-- APPEND only - facts discovered -->

- timestamp: 2026-04-14T00:01:00Z
  checked: GroupBuilder.tsx handleDragEnd (lines 180-190)
  found: |
    if (overId === 'roster') {
      // drag-back to roster: remove dog from all groups it's in (GROUP-05)
      for (const group of walkGroups) {
        if (group.dogIds.includes(dogId)) {
          removeDogFromGroup(group.id, dogId)
        }
      }
    }
  implication: The comment even references "GROUP-05" as the intended behavior, but this is the bug — it removes from ALL groups, not just the originating one.

- timestamp: 2026-04-14T00:01:00Z
  checked: groupSlice.ts removeDogFromGroup
  found: removeDogFromGroup(groupId, dogId) correctly targets only a single group by id.
  implication: The slice action is fine. The bug is entirely in the call site in GroupBuilder.

- timestamp: 2026-04-14T00:01:00Z
  checked: GroupBuilder.tsx handleDragStart (lines 163-167)
  found: |
    const dogId = (event.active.data.current?.dogId as string) ?? (event.active.id as string)
    setActiveDragId(dogId)
  implication: Only dogId is extracted from drag data. No sourceGroupId is captured. The originating group is never stored, so handleDragEnd has no way to know which group the drag came from.

- timestamp: 2026-04-14T00:01:00Z
  checked: Where draggables are set up (need to find MiniDogCard and RosterRow)
  found: Need to check what data.current each draggable type sends and whether sourceGroupId could be added.
  implication: Fix requires: (1) draggables inside GroupPanel pass sourceGroupId in drag data, (2) handleDragStart capture it, (3) handleDragEnd use it instead of the all-groups loop.

## Resolution
<!-- OVERWRITE as understanding evolves -->

root_cause: GroupBuilder.handleDragEnd looped over all walkGroups and called removeDogFromGroup for every group containing the dragged dog when dropped on 'roster'. MiniDogCard already passes groupId in drag data (data.current.groupId) but handleDragEnd ignored it, removing from all groups instead of just the source.

fix: Replace the all-groups loop with a single targeted call: read sourceGroupId from event.active.data.current?.groupId; if present, call removeDogFromGroup(sourceGroupId, dogId); if absent (RosterRow drag with no groupId), do nothing. Also updated the stale test that encoded the old all-groups behavior.

verification: 228/228 tests pass including new regression test "onDragEnd to roster removes dog only from source group when dog belongs to multiple groups".

files_changed:
  - "dog tracker/src/components/GroupBuilder.tsx"
  - "dog tracker/src/components/GroupBuilder.test.tsx"
