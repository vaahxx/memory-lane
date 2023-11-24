"use server";

import axios from "axios";
import { Memory } from "../models/memory.model";
import { revalidatePath } from "next/cache";
import { User } from "../models/user.model";

export async function updateBiography(
  _prevState: Partial<Memory> | undefined,
  formData: FormData
): Promise<Partial<User>> {
  const { biography, user_id } = Object.fromEntries(formData.entries());

  await axios.patch<User>(`http://localhost:4001/users/${user_id}`, {
    biography: biography.toString(),
  });

  revalidatePath("/memories/:id");

  return { biography: biography.toString(), id: Number(user_id) };
}
