"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function BreadCrumb() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment);

  return (
    <ul className="list-none p-3 m-0 surface-card flex align-items-center font-medium overflow-x-auto">
      <li className="pr-3">
        <Link href="/" className="cursor-pointer">
          <i className="pi pi-home text-blue-500"></i>
        </Link>
      </li>
      {pathSegments.map((segment, index) => {
        const href = "/" + pathSegments.slice(0, index + 1).join("/");
        const isLast = index === pathSegments.length - 1;

        return (
          <li className="px-2" key={href}>
            <i className="pi pi-angle-right text-500"></i>
            {isLast ? (
              <span className="text-900 white-space-nowrap">{segment}</span>
            ) : (
              <Link
                href={href}
                className="cursor-pointer text-blue-500 white-space-nowrap"
              >
                {segment}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}
