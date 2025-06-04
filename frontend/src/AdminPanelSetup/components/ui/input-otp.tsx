import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { MinusIcon } from "lucide-react";
import { cn } from "../../lib/utils";

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string;
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "flex items-center gap-2 has-disabled:opacity-50",
        containerClassName
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  );
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center", className)}
      {...props}
    />
  );
}

function InputOTPSlot({
  index,
  className,
  value,
  onChange,
  onKeyDown,
  ...props
}: React.ComponentProps<"input"> & {
  index: number;
  value: string;
  onChange: (index: number, value: string) => void;
  onKeyDown: (index: number, event: React.KeyboardEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      type="text"
      inputMode="numeric"
      maxLength={1}
      value={value}
      onChange={(e) => onChange(index, e.target.value)}
      onKeyDown={(e) => onKeyDown(index, e)}
      className={cn(
        "border border-gray-500 h-12 w-12 flex items-center justify-center text-lg font-semibold text-white bg-black rounded-md transition-all outline-none text-center",
        className
      )}
      {...props}
    />
  );
}


function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="input-otp-separator" role="separator" {...props}>
      <MinusIcon />
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
