"use server";

import axios from "axios";
import { Memory } from "../models/memory.model";
import { revalidatePath } from "next/cache";
import { MemoryDTO } from "@/app/dto/memory-dto";

type File = {
  type: string;
  name: string;
};

function isImageFile(file: any): file is File {
  return file && file?.type?.startsWith("image/");
}

async function createImageUrl(image: FormDataEntryValue): Promise<string> {
  return isImageFile(image)
    ? `data:${image.type};base64,${Buffer.from(
        await image.arrayBuffer()
      ).toString("base64")}`
    : "";
}

export async function createMemory(
  _prevState: Partial<Memory> | undefined,
  formData: FormData
) {
  const { title, description, image, user_id } = Object.fromEntries(
    formData.entries()
  );

  const memoryDTO: MemoryDTO = {
    user_id: Number(user_id),
    title: title.toString(),
    description: description.toString(),
    image_url: await createImageUrl(image),
  };

  await axios.post<Memory>(`http://localhost:4001/memories`, memoryDTO);

  revalidatePath("/memories/:id");

  return memoryDTO;
}
