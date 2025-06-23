import Image from "next/image";
import Link from "next/link";
import DesktopLogo from "../../public/InstaTravel-desktop.png";
import { UserNav } from "./UserNav";
import { SearchModalCompnent } from "./SearchComponent";

export function Navbar() {
  return (    <nav className="w-full border-b">
      <div className="flex items-center justify-between container mx-auto px-4 lg:px-5 xl:px-10 py-4 lg:py-5">        <Link href="/">
          <Image
            src={DesktopLogo}
            alt="InstaTravel Logo"
            className="w-40 lg:w-52 hidden lg:block"
            priority
            width={208}
            height={48}
          />

          <Image
            src={DesktopLogo}
            alt="InstaTravel Logo"
            className="block lg:hidden w-28 h-auto"
            priority
            width={112}
            height={26}
          />
        </Link><SearchModalCompnent />

        <UserNav />
      </div>
    </nav>
  );
}
