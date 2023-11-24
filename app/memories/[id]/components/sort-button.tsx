"use client";

import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { Dropdown } from "@/app/components/dropdown";

const SORT_OLDER_TO_NEW = "older";
const SORT_NEWER_TO_OLDER = "newer";
const sortButtonOptions = [
  {
    key: SORT_OLDER_TO_NEW,
    value: "Older to newer",
  },
  {
    key: SORT_NEWER_TO_OLDER,
    value: "Newer to older",
  },
];

export function SortButton() {
  const router = useRouter();
  const { id } = useParams();

  function handleSelectSort(optionKey: string) {
    router.push(`/memories/${id}?sortBy=${optionKey}`);
  }

  return <Dropdown options={sortButtonOptions} onSelect={handleSelectSort} />;
}
