type BrandNameProps = {
  className?: string;
};

/** The product wordmark used in app headers. */
export function BrandName({ className }: BrandNameProps) {
  return <span className={className}>LeBeHo</span>;
}
