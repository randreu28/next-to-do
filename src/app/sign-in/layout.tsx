type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <form className="bg-gray-900 p-5 rounded w-full max-w-xl space-y-5">
        {children}
      </form>
    </div>
  );
}
