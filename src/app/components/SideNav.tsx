import { Ripple } from "primereact/ripple";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import Link from "next/link";
import Image from "next/image";

export default function SideNav() {
  return (
    <div
      id="app-sidebar"
      className="surface-section h-full lg:h-auto hidden lg:block flex-shrink-0 absolute lg:static left-0 top-0 z-1 border-right-1 surface-border select-none"
      style={{ width: "280px" }}
    >
      <div className="flex flex-column h-full">
        <div
          className="flex align-items-center px-5 flex-shrink-0"
          style={{ height: "60px" }}
        >
          <Image
            src="/assets/logo.png"
            alt="profile-girl"
            height={80}
            width={200}
          />
        </div>
        <div className="overflow-y-auto">
          <ul className="list-none p-3 m-0">
            <li>
              <ul className="list-none p-0 m-0 overflow-hidden">
                <li>
                  <Link
                    href="/"
                    className="no-underline p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                  >
                    <i className="pi pi-chart-bar mr-2"></i>
                    <span className="font-medium">Dashboard</span>
                    <Ripple />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products"
                    className="no-underline p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                  >
                    <i className="pi pi-shop mr-2"></i>
                    <span className="font-medium">Productos</span>
                    <Ripple />
                  </Link>
                </li>

                <li>
                  <Link
                    href="/quotes"
                    className="no-underline p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                  >
                    <i
                      className="pi pi-credit-card
 mr-2"
                    ></i>
                    <span className="font-medium">Cotización</span>
                    <Ripple />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cardsProducts"
                    className="no-underline p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                  >
                    <i
                      className="pi pi-shopping-cart
 mr-2"
                    ></i>
                    <span className="font-medium">Compras</span>
                    <Ripple />
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="mt-auto mx-3">
          <hr className="mb-3 border-top-1 surface-border" />
          <a className="p-ripple my-3 flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
            <Image
              src="/assets/avatar-f-1@2x.png"
              alt="avatar-f-1"
              width={28}
              height={28}
              className="mr-2"
            />
            <span className="font-medium">Amy Elsner</span>
            <Ripple />
          </a>
        </div>
      </div>
    </div>
  );
}
