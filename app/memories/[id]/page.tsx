import { Biography } from "../components/biography/biography";
import { MemoriesList } from "../components/memories-list/memories-list";
import { Heading } from "../components/heading/heading";
import { NewMemoryFormModal } from "../components/new-memory-form-modal";
import { getUserWithMemories } from "./utils";
import { SortButton } from "./components/sort-button";

export const revalidate = 3600; // revalidate the data at most every hour

type MemoriesProps = {
  params: {
    id: string;
  };
  searchParams: {
    sortBy: string;
  };
};

export default async function Memories({
  params: { id },
  searchParams: { sortBy },
}: MemoriesProps) {
  const {
    data: { user },
  } = await getUserWithMemories(id, sortBy);

  if (!user || (user && !Object.keys(user).length)) {
    return <h1>Invalid user id</h1>;
  }

  return (
    <main className='flex flex-col items-center p-7 h-screen w-screen gap-9'>
      <Heading title={`${user.name}'s memory lane`} />
      <Biography text={user.biography} />
      <div className='flex justify-between w-full'>
        <SortButton />
        <NewMemoryFormModal userId={user.id} />
      </div>
      <MemoriesList memories={user.memories} />
    </main>
  );
}
