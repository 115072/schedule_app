import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";
import client from "@/api/client";

// Types, interfaces, constants

export type FILTER = "active" | "inactive" | "partial";

export interface EventTag {
  id: number;
  name: string;
  color: string;
  filter?: FILTER;
  children?: EventTag[];
  parenttag?: number | null;
}

interface TagsState {
  selTagId: number | null;
  tags: EventTag[];
}

const initialState: TagsState = {
  selTagId: null,
  tags: [],
};

// Helper functions

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

// Thunks

export const fetchTags = createAsyncThunk("tags/fetchTags", async () => {
  const response = await client({ url: "/tags", method: "get" });
  return parseResponse(response.data);
});

export const addNewTag = createAsyncThunk(
  "tags/addNewTag",
  async (tag: EventTag) => {
    const response = await client({
      url: "/tag",
      method: "post",
      data: {
        name: tag.name,
        hexcolor: tag.color,
        parenttag: tag.parenttag ?? null,
      },
    });
    return response.data.id;
  }
);

export const deleteTag = createAsyncThunk(
  "tags/deleteTag",
  async (tagId: number) => {
    await client({ url: `/tag/${tagId}`, method: "delete" });
    return tagId;
  }
);

// Slice

export const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    toggleFilter: (state, action: PayloadAction<EventTag>) => {
      state.tags = updateFilters(action.payload, state.tags);
    },
    setSelTag: (state, action: PayloadAction<number | null>) => {
      state.selTagId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchTags.fulfilled,
        (state, action: PayloadAction<EventTag[]>) => {
          return { ...state, tags: action.payload };
        }
      )
      .addCase(
        addNewTag.fulfilled,
        (state, action: PayloadAction<number | undefined>) => {
          if (action.payload == undefined) return state;
          return { ...state, selTagId: action.payload };
        }
      )
      .addCase(deleteTag.fulfilled, (state, action: PayloadAction<number>) => {
        if (state.selTagId === action.payload) {
          state.selTagId = null;
        }
      });
  },
});

export default tagsSlice.reducer;
export const { toggleFilter, setSelTag } = tagsSlice.actions;

export const selectTags = (state: RootState) => state.tags.tags;
export const selectSelTag = (state: RootState) =>
  findTagById(state.tags.selTagId ?? undefined, state.tags.tags);
export const selectSelTagId = (state: RootState) => state.tags.selTagId;
