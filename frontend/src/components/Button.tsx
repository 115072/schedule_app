import type React from "react";
import type { MouseEventHandler } from "react";

interface ButtonProps {
  children: React.ReactNode;
  type?: "normal" | "danger" | "submit";
  icon?: string;
  action?: MouseEventHandler;
}

export default function Button(props: ButtonProps) {
  return (
    <button
      onClick={props.action}
      type={props.type == "submit" ? "submit" : "button"}
      className={
        "flex flex-row items-center justify-center px-6 py-2 min-w-24 w-full rounded-xs font-bold cursor-pointer select-none transition-colors " +
        (props.type == "normal" ||
        props.type == "submit" ||
        props.type === undefined
          ? "bg-neutral-300 hover:bg-neutral-50 dark:bg-neutral-700 dark:hover:bg-neutral-500 "
          : "") +
        (props.type == "danger"
          ? "bg-red-400 hover:bg-neutral-50 hover:text-red-600 dark:bg-red-800 "
          : "")
      }
    >
      <div hidden={props.icon === undefined || props.icon == ""}>
        {props.icon}
      </div>
      {props.children}
    </button>
  );
}
