import type { EventTag } from "@/store/tagsSlice";
import Tag from "./Tag";

const TagTree = ({ tags, level = 0 }: { tags: EventTag[]; level?: number }) => {
  return (
    <div>
      {tags.map((tag: EventTag) => (
        <div key={tag.name}>
          <Tag tag={tag} level={level} isLast={tags.at(-1) === tag} />
          {tag.subtags && tag.subtags.length > 0 && (
            <TagTree tags={tag.subtags} level={level + 1} />
          )}
        </div>
      ))}
    </div>
  );
};

export default TagTree;
