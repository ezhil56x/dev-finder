import { Badge } from "./ui/badge";

export function splitTags(tags: string): string[] {
  return tags.split(", ").map((tag) => tag.trim());
}

export function TagsList({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Badge key={tag}>{tag}</Badge>
      ))}
    </div>
  );
}
