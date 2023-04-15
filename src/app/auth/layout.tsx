type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="bg-gray-900 p-5 rounded max-w-md space-y-5">
        {children}
      </div>
    </div>
  );
}
