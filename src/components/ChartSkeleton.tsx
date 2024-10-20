import React from "react";
import { Button } from "./ui/button";

interface ChartSkeletonProps {
  text?: string;
  actionHandler?: () => void;
  actionHandlerText?: string;
}

const ChartSkeleton: React.FC<ChartSkeletonProps> = ({
  text,
  actionHandler,
  actionHandlerText,
}) => {
  return (
    <div className="relative m-auto h-full w-full overflow-hidden rounded-xl bg-[#F8FAFC]">
      <div className="absolute inset-0 z-10 h-full w-full animate-shimmer bg-gradient-to-r from-transparent via-[#F1F5F9] to-transparent opacity-50"></div>

      <div className="relative z-20 flex flex-col items-center justify-center h-full space-y-5">
        {text && (
          <p
            className="text-lg font-bold text-center"
            aria-label="Loading Text"
          >
            {text}
          </p>
        )}
        {actionHandler && actionHandlerText && (
          <Button onClick={actionHandler} className="mx-auto">
            {actionHandlerText}
          </Button>
        )}
      </div>
    </div>
  );
};

export { ChartSkeleton };
