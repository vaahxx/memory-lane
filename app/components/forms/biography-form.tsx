import { Button } from "@/app/components/button";
import { User } from "@/app/models/user.model";
import { useFormState, useFormStatus } from "react-dom";
import { updateBiography } from "@/app/actions/update-biography";
import { useEffect } from "react";

type BiographyFormProps = {
  onSubmit: (updatedUser: User) => void;
  onCancel: () => void;
  userId: User["id"];
  biography: User["biography"];
};

const initialState: Partial<User> = {};

export function BiographyForm({
  onSubmit,
  onCancel,
  userId,
  biography,
}: BiographyFormProps) {
  const [state, formAction] = useFormState(
    updateBiography as (
      state: Awaited<Partial<User>>
    ) => Partial<User> | Promise<Partial<User>>,
    initialState
  );
  const { pending } = useFormStatus();

  useEffect(() => {
    if (!pending && state.biography) {
      onSubmit(state as User);
    }
  }, [pending, state, onSubmit]);

  return (
    <form
      data-testid='biography-form'
      className='flex flex-col gap-3 w-full'
      action={formAction}
    >
      <div className='mb-6 flex flex-col justify-items-start'>
        <input name='user_id' type='hidden' value={userId} />
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
          defaultValue={biography}
          required
        />
      </div>
      <div className='flex justify-end gap-5'>
        <Button
          type='button'
          variant='transparent'
          onClick={() => onCancel()}
          disabled={pending}
        >
          Cancel
        </Button>
        <Button type='submit'>Update</Button>
      </div>
    </form>
  );
}
