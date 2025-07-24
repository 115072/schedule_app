import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";


export type FILTER = 'active'|'inactive'|'partial'

export interface EventTag {
  id: number,
  name: string,
  color: string,
  filter?: FILTER,
  subtags?: EventTag[]
}

const initialState: EventTag[] = [
    {
      id: 1,
      name: "Tag 1",
      color: "#e57373",
      subtags: [
        {
          id: 11,
          name: "Tag 1.1",
          color: "#64b5f6",
        },
        {
          id: 12,
          name: "Tag 1.2",
          color: "#81c784",
          subtags: [
            {
              id: 121,
              name: "Tag 1.2.1",
              color: "#ffd54f",
            },
            {
              id: 122,
              name: "Tag 1.2.2",
              color: "#ff004f",
            },
            {
              id: 123,
              name: "Tag 1.2.3",
              color: "#00ffff",
            },
          ],
        },
        {
          id: 13,
          name: "Tag 1.3",
          color: "#ba68c8",
        },
      ],
    },
    {
      id: 2,
      name: "Tag 2",
      color: "#4db6ac",
    },
    {
      id: 3,
      name: "Tag 3",
      color: "#f06292",
      subtags: [
        {
          id: 31,
          name: "Tag 3.1",
          color: "#7986cb",
        },
        {
          id: 32,
          name: "Tag 3.2",
          color: "#aed581",
          subtags: [
            {
              id: 321,
              name: "Tag 3.2.1",
              color: "#ff8a65",
            },
          ],
        },
        {
          id: 33,
          name: "Tag 3.3",
          color: "#4fc3f7",
        },
      ],
    },
];

// function isAllInactive(tags?: EventTag[]) : boolean {
//   if (tags === undefined || tags.length == 0) return true
//   let retFlag : boolean = true
//   tags.forEach(t => {if (t.filter != 'inactive' && t.filter != undefined) retFlag = false})
//   return retFlag
// }

// function isAllActive(tags?: EventTag[]): boolean {
//   if (tags === undefined || tags.length == 0) return false
//   let retFlag : boolean = true
//   tags.forEach(t => {if (t.filter != 'active') retFlag = false})
//   return retFlag
// }

// function updateFilters(tagToToggle?: EventTag, tags?: EventTag[], forcedFilter?: FILTER) : { tags: EventTag[], isFound: boolean } {
//   if (tags === undefined) return { tags: [], isFound: false }

//   let foundFlag: boolean = false
//   tags.forEach((t) => {
//     const filter: FILTER | undefined = undefined
//     if (t.name == tagToToggle?.name && t.color == tagToToggle?.color) {
//       t.filter = t.filter == 'active' ? 'inactive' : 'active'
//       foundFlag = true
//       //filter = t.filter
//       // updateFilters(tagToToggle, t.subtags, t.filter)
//     } else if (forcedFilter !== undefined) {
//       t.filter = forcedFilter
//       //filter = forcedFilter
//     }
//     if (updateFilters(tagToToggle, t.subtags, filter).isFound) {
//       t.filter = isAllInactive(t.subtags) ? 'inactive' : 'partial'
//       t.filter = isAllActive(t.subtags) ? 'active' : t.filter
//       foundFlag = true
//     }
//   })

//   return {
//     tags: tags,
//     isFound: foundFlag
//   }
// }

export function findTagById(id?: number, tags?: EventTag[]): EventTag|null {
  if (tags === undefined || id === undefined) return null
  for (let i = 0; i < tags.length; i++) {
    if (tags[i].id === id) return tags[i]
    const ret = findTagById(id, tags[i].subtags)
    if (ret != null) return ret
  }
  return null
}

function updateFilters(tagToToggle: EventTag, tags?: EventTag[]) : EventTag[] {
  if (tags === undefined) return []

  tags.forEach((t) => {
    if (t.id == tagToToggle.id) {
      t.filter = t.filter == 'active' ? 'inactive' : 'active'
    }
    updateFilters(tagToToggle, t.subtags)
  })

  return tags
}

export const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    toggleFilter: (state, action: PayloadAction<EventTag>) => {
      state = updateFilters(action.payload, state)
    }
  }
})

export default tagsSlice.reducer
export const {toggleFilter} = tagsSlice.actions

export const selectTags = (state: RootState) => state.tags