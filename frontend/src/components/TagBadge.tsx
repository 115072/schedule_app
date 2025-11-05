const TagBadge = ({ color }: { color: string | undefined }) => {
  return (
    <div
      className="size-5 min-w-5 min-h-5 rounded-xs"
      style={{ backgroundColor: color ?? "#00000000" }}
    ></div>
  );
};

export default TagBadge;
