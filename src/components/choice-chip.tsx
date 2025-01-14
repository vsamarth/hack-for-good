import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ChoiceChipProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected: boolean;
}

export const ChoiceChip = React.forwardRef<HTMLButtonElement, ChoiceChipProps>(
  ({ className, selected, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant="outline"
        className={cn(
          "rounded-full",
          selected && "bg-primary text-primary-foreground hover:bg-primary/90",
          className,
        )}
        {...props}
      />
    );
  },
);
ChoiceChip.displayName = "ChoiceChip";
