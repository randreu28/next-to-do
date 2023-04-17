type Props = {
  children: React.ReactNode;
};

export default function TodoLayout({ children }: Props) {
  return <div className="p-5 space-y-5">{children}</div>;
}
