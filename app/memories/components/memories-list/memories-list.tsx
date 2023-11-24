import { MemoryCard } from "../memory-card/memory-card";
import { Memory } from "../../../models/memory.model";

type MemoriesListProps = {
  memories: Memory[];
};

export function MemoriesList({ memories }: MemoriesListProps) {
  if (!memories?.length) {
    return (
      <>
        <span>You have no memories yet.</span>
        <span>Create one!</span>
      </>
    );
  }

  return (
    <>
      {memories.map((memory: Memory) => (
        <MemoryCard
          key={memory.id}
          title={memory.title}
          content={memory.description}
          date={memory.timestamp}
          image={memory.image_url}
        />
      ))}
    </>
  );
}
