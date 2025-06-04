import React from "react";
import { cn } from "../../lib/utils";
import { useNavigate } from "react-router-dom";

export function Card({
  label,
  icon: Icon,
  amount,
  description,
  onClickPath,
  payload,
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClickPath) {
      navigate(onClickPath, { state: payload || {} });
    }
  };

  return (
    <CardContent
      onClick={handleClick}
      className={cn(
        "transition-all",
        onClickPath &&
          "cursor-pointer hover:bg-gray-900 dark:hover:bg-zinc-900  "
      )}
    >
      <section className="flex justify-between gap-2">
        <p className="font-semibold">{label}</p>
        <Icon className="h-4 w-4 text-gray-400" />
      </section>
      <section className="flex flex-col gap-1">
        <h2 className="text-2xl  font-semibold">
          {label === "Total Revenue" ? `${amount}` : amount}
        </h2>
      </section>
    </CardContent>
  );
}

export function CardContent({ className, ...props }) {
  return (
    <div
      {...props}
      className={cn(
        "flex w-full flex-col gap-3 rounded-2xl p-5 border border-zinc-800 shadow bg-[var(--cards-bg)]",
        className
      )}
    />
  );
}
