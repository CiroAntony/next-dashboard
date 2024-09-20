"use client";
import React, { useRef } from "react";
import { Ripple } from "primereact/ripple";
import { StyleClass } from "primereact/styleclass";
import { InputText } from "primereact/inputtext";
import { Badge } from "primereact/badge";
import Image from "next/image";

export default function Header() {
  const btnRef5 = useRef<any>(null);
  const btnRef6 = useRef<any>(null);
  return (
    <div
      className="flex justify-content-between align-items-center px-5 surface-0 border-bottom-1 surface-border relative lg:static"
      style={{ height: "60px" }}
    >
      <div className="flex">
        <StyleClass
          nodeRef={btnRef5}
          selector="#app-sidebar"
          enterClassName="hidden"
          enterActiveClassName="fadeinleft"
          leaveToClassName="hidden"
          leaveActiveClassName="fadeoutleft"
          hideOnOutsideClick
        >
          <a
            ref={btnRef5}
            className="p-ripple cursor-pointer block lg:hidden text-700 mr-3"
          >
            <i className="pi pi-bars text-4xl"></i>
            <Ripple />
          </a>
        </StyleClass>
        <span className="p-input-icon-left">
          <i className="ml-2 pi pi-search"></i>
          <InputText
            className="border-none"
            placeholder="   Search"
            style={{ paddingLeft: "2.5rem", width: "100%" }}
          />
        </span>
      </div>
      <StyleClass
        nodeRef={btnRef6}
        selector="@next"
        enterClassName="hidden"
        enterActiveClassName="fadein"
        leaveToClassName="hidden"
        leaveActiveClassName="fadeout"
        hideOnOutsideClick
      >
        <a
          ref={btnRef6}
          className="p-ripple cursor-pointer block lg:hidden text-700"
        >
          <i className="pi pi-ellipsis-v text-2xl"></i>
          <Ripple />
        </a>
      </StyleClass>
      <ul
        className="list-none p-0 m-0 hidden lg:flex lg:align-items-center select-none lg:flex-row
    surface-section border-1 lg:border-none surface-border right-0 top-100 z-1 shadow-2 lg:shadow-none absolute lg:static"
      >
        <li>
          <a
            className="p-ripple flex p-3 lg:px-3 lg:py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer
            transition-duration-150 transition-colors w-full"
          >
            <i className="pi pi-inbox text-base lg:text-2xl mr-2 lg:mr-0"></i>
            <span className="block lg:hidden font-medium">Inbox</span>
            <Ripple />
          </a>
        </li>
        <li>
          <a
            className="p-ripple flex p-3 lg:px-3 lg:py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer
            transition-duration-150 transition-colors w-full"
          >
            <i className="pi pi-bell text-base lg:text-2xl mr-2 lg:mr-0 p-overlay-badge">
              <Badge severity="danger" />
            </i>
            <span className="block lg:hidden font-medium">Notificationes</span>
            <Ripple />
          </a>
        </li>
        <li className="border-top-1 surface-border lg:border-top-none">
          <a
            className="p-ripple flex p-3 lg:px-3 lg:py-2 align-items-center hover:surface-100 font-medium border-round cursor-pointer
            transition-duration-150 transition-colors w-full"
          >
            <Image
              src="/assets/avatar-f-1@2x.png"
              alt="avatar-f-1"
              className="mr-3 lg:mr-0"
              width={32}
              height={32}
            />
            <div className="block lg:hidden">
              <div className="text-900 font-medium">Josephine Lillard</div>
              <span className="text-600 font-medium text-sm">
                Marketing Specialist
              </span>
            </div>
            <Ripple />
          </a>
        </li>
      </ul>
    </div>
  );
}
