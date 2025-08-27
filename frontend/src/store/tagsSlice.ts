import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";
import client from "@/api/client";

//TODO connect to API

export type FILTER = "active" | "inactive" | "partial";

export interface EventTag {
  id: number;
  name: string;
  color: string;
  filter?: FILTER;
  children?: EventTag[];
  parenttag?: number | null;
}

const initialState: EventTag[] = [
  {
    id: 0,
    name: "asdasdasd",
    color: "#ffff00",
    children: [],
    parenttag: null,
  },
];

export function findTagById(id?: number, tags?: EventTag[]): EventTag | null {
  if (tags === undefined || id === undefined) return null;
  for (let i = 0; i < tags.length; i++) {
    if (tags[i].id === id) return tags[i];
    const ret = findTagById(id, tags[i].children);
    if (ret != null) return ret;
  }
  return null;
}

function updateFilters(tagToToggle: EventTag, tags?: EventTag[]): EventTag[] {
  if (tags === undefined) return [];

  tags.forEach((t) => {
    if (t.id == tagToToggle.id) {
      t.filter = t.filter == "active" ? "inactive" : "active";
    }
    updateFilters(tagToToggle, t.children);
  });

  return tags;
}

function parseResponse(tags: any[]): EventTag[] {
  return tags.map((t) => ({
    id: t.id,
    name: t.name,
    color: t.hexcolor,
    parenttag: t.parenttag ? Number(t.parenttag) : null,
    children: parseResponse(t.children),
  }));
}

export const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    toggleFilter: (state, action: PayloadAction<EventTag>) => {
      state = updateFilters(action.payload, state);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchTags.fulfilled,
      (state, action: PayloadAction<EventTag[]>) => {
        return action.payload;
      }
    );
  },
});

export const fetchTags = createAsyncThunk("tags/fetchTags", async () => {
  const response = await client({ url: "/tags", method: "get" });
  return parseResponse(response.data);
});

export default tagsSlice.reducer;
export const { toggleFilter } = tagsSlice.actions;

export const selectTags = (state: RootState) => state.tags;
