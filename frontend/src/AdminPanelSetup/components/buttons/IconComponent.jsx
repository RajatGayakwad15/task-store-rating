import React from "react";

const IconButton = ({
  onClick,
  icon: Icon,
  variant = "default",
  size = 14,
  className = "",
}) => {
  const styles = {
    primary:
      "text-[var(--accent-light)] hover:bg-[var(--accent-transparent-2)]",
    success: "text-green-400 hover:bg-green-950/50",
    danger: "text-red-400 hover:bg-red-950/50",
    warning: "text-yellow-400 hover:bg-yellow-950/50",
    info: "text-indigo-400 hover:bg-indigo-950/50",
    default: "text-white hover:bg-zinc-900 hoverd:text-gray-800",
    theme: "text-[#C47f31] hover:bg-[#C47f31]/20",
  };

  return (
    <button
      onClick={onClick}
      className={`p-2.5 rounded-md transition-all ${styles[variant]} ${className} hover:opacity-90 transition-all`}
    >
      <Icon size={size} />
    </button>
  );
};

export default IconButton;
