"use client";

import { Button } from "@/app/components/button/button";
import { User } from "@/app/models/user.model";
import { useFormState, useFormStatus } from "react-dom";
import { createUser } from "@/app/actions/create-user";

export function UserForm() {
  const [, handleSubmit] = useFormState(
    createUser as (
      state: Awaited<Partial<User>>
    ) => Partial<User> | Promise<Partial<User>>,
    {}
  );
  const { pending } = useFormStatus();

  return (
    <form className='flex flex-col gap-3 w-full' action={handleSubmit}>
      <div className='mb-6'>
        <label
          htmlFor='name'
          className='block mb-2 text-sm font-medium text-gray-900'
        >
          Name
        </label>
        <input
          type='text'
          id='name'
          name='name'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-300 focus:border-green-300 w-full'
          placeholder='Your name'
          required
        />
      </div>
      <div className='mb-6 flex flex-col justify-items-start'>
        <label
          htmlFor='biography'
          className='block mb-2 text-sm font-medium text-gray-900'
        >
          Biography
        </label>
        <textarea
          id='biography'
          name='biography'
          placeholder='Tell us about yourself'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-300 focus:border-green-300 block w-full p-2.5 h-36'
          required
        />
      </div>
      <div className='flex justify-end'>
        <Button type='submit' disabled={pending}>
          Create
        </Button>
      </div>
    </form>
  );
}
