import Image from "next/image";

type MemoryCardProps = {
  title: string;
  content: string;
  date: string;
  image: string;
};

export function MemoryCard({ title, content, date, image }: MemoryCardProps) {
  function convertDate(date: string) {
    const dateObject = new Date(date);
    return dateObject.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return (
    <div className='flex flex-col lg:flex-row gap-2 w-full shadow h-fit rounded-lg items-center justify-center p-10'>
      {image && (
        <div className='flex items-center'>
          <Image
            src={image}
            width={100}
            height={100}
            alt='Memory'
            className='object-cover rounded-full shadow border-2 w-[100px] h-[100px]'
          />
        </div>
      )}
      <div className='flex flex-col gap-3 items-center'>
        <div className='flex flex-col items-center'>
          <p className='text-2xl'>{title}</p>
          <p className='text-sm'>{convertDate(date)}</p>
        </div>
        <p className='text-base lg:max-w-[70%]'>{content}</p>
      </div>
    </div>
  );
}
