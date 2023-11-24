type TitleProps = {
  children: string;
};

export function Title({ children }: TitleProps) {
  return (
    <div className='flex justify-between w-full'>
      <h1 className='text-5xl mb-10 antialiased'>{children}</h1>
    </div>
  );
}
