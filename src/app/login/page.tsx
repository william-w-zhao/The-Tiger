import { login, signUp } from "@/lib/actions/auth";
import OldTiger from "@/assets/OldTiger.png";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <div className="flex-1 flex items-center justify-center">
      <form className="flex flex-col items-center gap-4">
        <img src={OldTiger.src} alt="Logo" className="w-32 h-auto"></img>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="px-4 py-2 rounded border border-gray-600"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="px-4 py-2 rounded border border-gray-600"
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <div className="flex gap-2">
          <button
            formAction={login}
            className="px-4 py-2 rounded border bg-white hover:bg-gray-100"
          >
            Log in
          </button>
          <button
            formAction={signUp}
            className="px-4 py-2 rounded border bg-black text-white"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}
