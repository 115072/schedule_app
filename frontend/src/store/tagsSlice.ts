import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";


export type FILTER = 'active'|'inactive'|'partial'

export interface EventTag {
  name: string,
  color: string,
  filter?: FILTER,
  subtags?: EventTag[]
}

const initialState: EventTag[] = [
    {
      name: "Tag 1",
      color: "#e57373",
      subtags: [
        {
          name: "Tag 1.1",
          color: "#64b5f6",
        },
        {
          name: "Tag 1.2",
          color: "#81c784",
          subtags: [
            {
              name: "Tag 1.2.1",
              color: "#ffd54f",
            },
            {
              name: "Tag 1.2.2",
              color: "#ff004f",
            },
            {
              name: "Tag 1.2.3",
              color: "#00ffff",
            },
          ],
        },
        {
          name: "Tag 1.3",
          color: "#ba68c8",
        },
      ],
    },
    {
      name: "Tag 2",
      color: "#4db6ac",
    },
    {
      name: "Tag 3",
      color: "#f06292",
      subtags: [
        {
          name: "Tag 3.1",
          color: "#7986cb",
        },
        {
          name: "Tag 3.2",
          color: "#aed581",
          subtags: [
            {
              name: "Tag 3.2.1",
              color: "#ff8a65",
            },
          ],
        },
        {
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

function updateFilters(tagToToggle?: EventTag, tags?: EventTag[]) : EventTag[] {
  if (tags === undefined) return []

  tags.forEach((t) => {
    if (t.name == tagToToggle?.name && t.color == tagToToggle?.color) {
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