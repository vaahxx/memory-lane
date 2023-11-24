"use server";

import { UserForm } from "./components/forms/user-form";

export default async function Home() {
  return (
    <div className='flex justify-center items-center w-screen h-screen'>
      <div className='p-4 md:p-5 space-y-4 w-3/4 shadow bg-white border-2 flex flex-col justify-center gap-3 h-fit rounded-lg'>
        <h1 className='text-2xl font-bold'>New user</h1>
        <UserForm />
      </div>
    </div>
  );
}
