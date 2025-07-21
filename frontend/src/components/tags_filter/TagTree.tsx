import type { EventTag } from "@/utils/types";
import Tag from "./Tag";

const TagTree = ({ tags, level = 0 }: { tags: EventTag[]; level?: number }) => {
  return (
    <div>
      {tags.map((tag: EventTag) => (
        <div key={tag.name}>
          <Tag
            name={tag.name}
            color={tag.color}
            level={level}
            isLast={tags.at(-1) === tag}
          />
          {tag.subtags && tag.subtags.length > 0 && (
            <TagTree tags={tag.subtags} level={level + 1} />
          )}
        </div>
      ))}
    </div>
  );
};

export default TagTree;
