"use client";

import { Button } from "@/app/components/button/button";
import { Memory } from "@/app/models/memory.model";
import { useFormState, useFormStatus } from "react-dom";
import { createMemory } from "@/app/actions/create-memory";
import { useEffect } from "react";

type NewMemoryFormProps = {
  onSubmit: (memory: Partial<Memory>) => void;
  userId: number;
};

const initialState: Partial<Memory> = {
  user_id: 0,
};

export function NewMemoryForm({ onSubmit, userId }: NewMemoryFormProps) {
  const [state, formAction] = useFormState(
    createMemory as (
      state: Awaited<Partial<Memory>>
    ) => Partial<Memory> | Promise<Partial<Memory>>,
    initialState
  );
  const { pending } = useFormStatus();

  useEffect(() => {
    if (!pending && state?.title) {
      onSubmit(state as Partial<Memory>);
    }
  }, [pending, state, onSubmit]);

  return (
    <form className='flex flex-col gap-5' action={formAction}>
      <div>
        <input name='user_id' type='hidden' value={userId} />
        <label
          htmlFor='title'
          className='block mb-2 text-sm font-medium text-gray-900'
        >
          Title
        </label>
        <input
          type='text'
          id='title'
          name='title'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-300 focus:border-green-300 w-full'
          placeholder='Title'
          required
        />
      </div>
      <div className='mb-6 flex flex-col justify-items-start'>
        <label
          htmlFor='description'
          className='block mb-2 text-sm font-medium text-gray-900'
        >
          Description
        </label>
        <textarea
          id='description'
          name='description'
          placeholder='What are you remembering?'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-300 focus:border-green-300 block w-full p-2.5 h-36'
          required
        />
      </div>
      <input
        type='file'
        name='image'
        id='image'
        className='bg-gray-50 border border-gray-300 text-sm rounded-lg w-full'
      />
      <div className='flex justify-end'>
        <Button type='submit' disabled={pending}>
          Create new memory
        </Button>
      </div>
    </form>
  );
}
