import axios from "axios";
import { cache } from "react";

export const getUserWithMemories = cache(async (id: string, sortBy: string) => {
  return await axios.get(
    `http://localhost:4001/user-memories/${id}?sortBy=${sortBy}`
  );
});
