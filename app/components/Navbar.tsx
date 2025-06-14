import Image from "next/image";
import Link from "next/link";
import DesktopLogo from "../../public/InstaTravel-desktop.png";
import MobileLogo from "../../public/airbnb-mobile.webp";
import { UserNav } from "./UserNav";
import { SearchModalCompnent } from "./SearchComponent";

export function Navbar() {
  return (
    <nav className="w-full border-b">
      <div className="flex items-center justify-between container mx-auto px-5 lg:px-10 py-5">        <Link href="/">
          <Image
            src={DesktopLogo}
            alt="Desktop Logo"
            className="w-44 hidden lg:block"
            priority
            width={176}
            height={40}
          />

          <Image
            src={MobileLogo}
            alt="Mobile Logo"
            className="block lg:hidden w-12"
            priority
            width={48}
            height={48}
          />
        </Link>        <SearchModalCompnent />

        <UserNav />
      </div>
    </nav>
  );
}
