"use server";

import axios from "axios";
import { User } from "@/app/models/user.model";
import { redirect } from "next/navigation";

export async function createUser(
  _prevState: Partial<User> | undefined,
  formData: FormData
): Promise<Partial<User>> {
  const { name, biography } = Object.fromEntries(formData.entries());

  const { data: newUser } = await axios.post<User>(
    `http://localhost:4001/users`,
    {
      name: name.toString(),
      biography: biography.toString(),
    }
  );

  redirect(`/memories/${newUser.id}`);
}
