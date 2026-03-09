import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TooltipProps {
    children: ReactNode;
    content: string;
    className?: string;
}

export default function Tooltip({ children, content, className }: TooltipProps) {
    return (
        <div className={cn("group relative inline-flex items-center justify-center", className)}>
            {children}
            <div className="pointer-events-none absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out transform translate-y-2 group-hover:translate-y-0 z-50">
                <div className="relative bg-neutral-900 border border-white/10 text-white text-xs whitespace-nowrap px-3 py-1.5 rounded-md shadow-xl backdrop-blur-md">
                    {content}
                    {/* Arrow down */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-solid border-t-neutral-900 border-t-[5px] border-x-transparent border-x-[5px] border-b-0" />
                </div>
            </div>
        </div>
    );
}
