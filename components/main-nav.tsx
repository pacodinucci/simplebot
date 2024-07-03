import Link from "next/link";

const MainNav = () => {
  return (
    <div>
      <ul className="flex gap-12 items-center">
        <li>
          <Link href="/">
            <h3 className="text-lg font-semibold">Solutions</h3>
          </Link>
        </li>
        <li>
          <Link href="/">
            <h3 className="text-lg font-semibold">Products</h3>
          </Link>
        </li>
        <li>
          <Link href="/">
            <h3 className="text-lg font-semibold">Contact</h3>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MainNav;
