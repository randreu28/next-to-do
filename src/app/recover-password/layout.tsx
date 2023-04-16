type Props = {
  children: React.ReactNode;
};

export default function RecoverPasswordLayout({ children }: Props) {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      {children}
    </div>
  );
}
