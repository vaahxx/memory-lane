"use client";

import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Button } from "../../../components/button/button";
import { useParams } from "next/navigation";
import { BiographyForm } from "@/app/components/forms/biography-form";

type BiographyProps = {
  text: string;
};

export function Biography({ text }: BiographyProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { id } = useParams();

  return (
    <div className='flex bg-white shadow p-6 rounded-lg gap-8 w-full'>
      <div className='flex items-center justify-between w-full'>
        {!isEditing ? (
          <>
            <p className='text-lg whitespace-pre-line'>{text}</p>
            <Button onClick={() => setIsEditing(true)} variant='transparent'>
              <PencilSquareIcon className='h-6 w-7 flex hover:stroke-green-400 transition-all ease-in duration-75' />
            </Button>
          </>
        ) : (
          <BiographyForm
            biography={text}
            userId={Number(id)}
            onSubmit={() => setIsEditing(false)}
            onCancel={() => setIsEditing(false)}
          />
        )}
      </div>
    </div>
  );
}
