import type { EventTag } from "@/store/tagsSlice";
import TagSelect from "./TagSelect";

const TagSelectTree = ({
  tags,
  level = 0,
}: {
  tags: EventTag[];
  level?: number;
}) => {
  return (
    <div>
      {tags.map((tag: EventTag) => (
        <div key={tag.name}>
          <TagSelect tag={tag} level={level} />
          {tag.children && tag.children.length > 0 && (
            <TagSelectTree tags={tag.children} level={level + 1} />
          )}
        </div>
      ))}
    </div>
  );
};

export default TagSelectTree;
