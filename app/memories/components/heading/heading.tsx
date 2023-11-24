"use client";

import { Title } from "@/app/components/title/title";
import { Button } from "@/app/components/button/button";

type HeadingProps = {
  title: string;
};

export function Heading({ title }: HeadingProps) {
  async function handleShare() {
    await navigator.clipboard.writeText(window.location.href);
    alert("Page link copied to clipboard!");
  }

  return (
    <div className='flex justify-between w-full'>
      <Title>{title}</Title>
      <Button
        type='button'
        icon='share'
        variant='transparent'
        onClick={handleShare}
      >
        Share
      </Button>
    </div>
  );
}
