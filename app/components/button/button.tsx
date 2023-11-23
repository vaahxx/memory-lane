"use client";

import dynamic from "next/dynamic";

export type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  icon?: string;
  variant?: "filled" | "transparent";
};

/**
 * In order to save the bundle size, I am dynamically importing the icon
 */
const iconsMap = {
  plus: dynamic(
    () => import("@heroicons/react/24/outline").then((mod) => mod.PlusIcon),
    {
      loading: () => <></>,
    }
  ),
  share: dynamic(
    () => import("@heroicons/react/24/outline").then((mod) => mod.ShareIcon),
    {
      loading: () => <></>,
    }
  ),
};

function isValidIcon(icon?: string): icon is keyof typeof iconsMap {
  if (!icon) return false;

  return Object.keys(iconsMap).includes(icon);
}

export function Button({
  icon,
  children,
  onClick,
  type,
  variant = "filled",
  ...props
}: ButtonProps) {
  const Icon = isValidIcon(icon) ? iconsMap[icon] : null;
  const variants = {
    transparent: {
      button:
        "flex gap-2 items-center group transition-all ease-in duration-75",
      text: "flex items-center gap-2 text-base bg-gradient-to-br group-hover:from-green-400 group-hover:to-blue-600 group-hover:bg-clip-text group-hover:text-transparent",
      icon: "w-7 group-hover:fill-green-400 group-hover:stroke-green-400",
    },
    filled: {
      button:
        "flex items-center justify-center py-5 px-[0.15rem] overflow-hidden text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white max-h-8",
      text: "flex items-center gap-2 text-base px-1.5 py-1.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0",
      icon: "w-5",
    },
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={variants[variant].button}
      {...props}
    >
      <span className={variants[variant].text}>
        {Icon && <Icon className={variants[variant].icon} />}
        <span>{children}</span>
      </span>
    </button>
  );
}
