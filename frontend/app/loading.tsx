export default function Loading() {
  return (
    <div className="px-4 pt-40 pb-24">
      <div className="mx-auto max-w-3xl space-y-4">
        <div className="skeleton h-10 w-2/3 mx-auto rounded-lg" />
        <div className="skeleton h-4 w-1/2 mx-auto rounded-lg" />
      </div>
    </div>
  );
}
