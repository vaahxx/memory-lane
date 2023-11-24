"use client";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useId, useLayoutEffect, useRef, useState } from "react";
import { initDropdowns } from "flowbite";

type Option = {
  key: string;
  value: string;
};

type DropdownProps = {
  options: Option[];
  onSelect: (option: string) => void;
};

export function Dropdown({ options, onSelect }: DropdownProps) {
  const [selectedOption, setSelectedOption] = useState<Option>(options[0]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const id = useId();
  const dropdownId = useId();

  useLayoutEffect(() => {
    initDropdowns();
  }, []);

  function handleClickOption(option: Option) {
    // I am using the button ref to simulate a click and close the dropdown
    buttonRef?.current?.click();
    setSelectedOption(option);
    onSelect(option.key);
  }

  return (
    <>
      <button
        id={id}
        data-testid='dropdown-button'
        data-dropdown-toggle={dropdownId}
        data-dropdown-trigger='click'
        className='text-base rounded-lg px-2.5 py-2.5 text-center inline-flex items-center shadow'
        type='button'
        ref={buttonRef}
      >
        {selectedOption.value}
        <ChevronDownIcon className='w-3 h-3 ml-2' />
      </button>

      <div
        id={dropdownId}
        data-testid='dropdown'
        // because I have to initialize the dropdowns, the hydration will show a warning on the console
        suppressHydrationWarning
        className='z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-fit'
      >
        <ul
          className='py-2 text-base text-gray-700'
          aria-labelledby='dropdownClickButton'
        >
          {options.map((option) => (
            <li
              data-testid={option.key}
              key={option.key}
              onClick={() => handleClickOption(option)}
              className='block px-2 py-2 hover:bg-green-100 transition-all ease-in duration-75 cursor-pointer'
            >
              {option.value}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
