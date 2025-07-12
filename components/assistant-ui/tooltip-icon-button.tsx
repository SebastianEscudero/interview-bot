import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";

type TooltipIconButtonProps = {
  tooltip: string;
} & ComponentPropsWithoutRef<typeof Button> &
  VariantProps<typeof buttonVariants>;

export const TooltipIconButton = ({
  children,
  tooltip,
  ...rest
}: TooltipIconButtonProps) => {
  return (
    <TooltipProvider delayDuration={400}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" {...rest}>
            {children}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};