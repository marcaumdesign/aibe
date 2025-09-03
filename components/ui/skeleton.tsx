import { cn } from '@/utils/cn';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('bg-text-weak-200 animate-pulse rounded-md', className)}
      {...props}
    />
  );
}

export { Skeleton };
