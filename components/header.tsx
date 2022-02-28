import Link from "next/link";
import { MyContext } from "../context/state";
import { useContext } from "react";

export default function Header() {
  const value = useContext(MyContext);

  return (
      <header>
        <h1>Hello {value?.user?.displayName}</h1>
        <h6>SteamID: {value?.user?.id}</h6>
        <img src={value?.user?.photos[0]?.value} alt="Avatar" />
        <Link href="/api/auth/logout">Logout</Link>
      </header>
  );
}
