export default function TodoContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="md:w-2xl py-2 flex flex-col gap-y-2">{children}</section>;
}
