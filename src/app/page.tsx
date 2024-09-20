"use client";
import React, { useRef } from "react";
import { Button } from "primereact/button";
import { Ripple } from "primereact/ripple";
import { StyleClass } from "primereact/styleclass";
import { InputText } from "primereact/inputtext";
import { Badge } from "primereact/badge";
import { Menu } from "primereact/menu";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import Image from "next/image";

export default function HeadlessDemo() {
  const btnRef5 = useRef<any>(null);
  const btnRef6 = useRef<any>(null);
  const cag = useRef<any>(null);
  const items = [
    {
      label: "Home",
      icon: "pi pi-home",
      command: () => {
        console.log("Home clicked");
      },
    },
    {
      label: "Profile",
      icon: "pi pi-user",
      command: () => {
        console.log("Profile clicked");
      },
    },
    {
      label: "Settings",
      icon: "pi pi-cog",
      command: () => {
        console.log("Settings clicked");
      },
    },
  ];
  return (
    <div className="min-h-screen flex relative lg:static surface-ground">
      <div className="min-h-screen flex flex-column relative flex-auto">
        <div className="flex flex-column flex-auto">
          <div className="surface-section p-5">
            <div className="flex align-items-start flex-column lg:flex-row lg:justify-content-between">
              <div className="flex align-items-start flex-column md:flex-row">
                <Image
                  src="/assets/avatar-f-1@2x.png"
                  alt="avatar-f-1"
                  className="mr-3 lg:mr-3"
                  width={100}
                  height={100}
                />
                <div>
                  <span className="text-900 font-medium text-3xl">
                    Kathryn Murphy
                  </span>
                  <i className="pi pi-star text-2xl ml-4 text-yellow-500"></i>
                  <div className="flex align-items-center flex-wrap text-sm">
                    <div className="mr-5 mt-3">
                      <span className="font-medium text-500">FOLLOWERS</span>
                      <div className="text-700 mt-2">333</div>
                    </div>
                    <div className="mr-5 mt-3">
                      <span className="font-medium text-500">PROJECTS</span>
                      <div className="text-700 mt-2">26</div>
                    </div>
                    <div className="mr-5 mt-3">
                      <span className="font-medium text-500">COLLECTIONS</span>
                      <div className="text-700 mt-2">17</div>
                    </div>
                    <div className="mt-3">
                      <span className="font-medium text-500">SHOTS</span>
                      <div className="text-700 mt-2">130</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-3 lg:mt-0">
                <Button
                  icon="pi pi-bookmark"
                  className="p-button-rounded mr-2"
                />
                <Button
                  icon="pi pi-heart"
                  className="p-button-rounded p-button-success mr-2"
                />
                <Button
                  icon="pi pi-list"
                  className="p-button-rounded p-button-help"
                />
              </div>
            </div>
          </div>
          <div className="p-5">
            <div className="grid">
              <div className="col-12 lg:col-6 xl:col-3">
                <div className="surface-card shadow-2 p-3 border-1 border-50 border-round">
                  <div className="flex justify-content-between mb-3">
                    <div>
                      <span className="block text-500 font-medium mb-3">
                        Orders
                      </span>
                      <div className="text-900 font-medium text-xl">152</div>
                    </div>
                    <div
                      className="flex align-items-center justify-content-center bg-blue-100 border-round"
                      style={{ width: "2.5rem", height: "2.5rem" }}
                    >
                      <i className="pi pi-shopping-cart text-blue-500 text-xl"></i>
                    </div>
                  </div>
                  <span className="text-green-500 font-medium">24 new </span>
                  <span className="text-500">since last visit</span>
                </div>
              </div>
              <div className="col-12 lg:col-6 xl:col-3">
                <div className="surface-card shadow-2 p-3 border-1 border-50 border-round">
                  <div className="flex justify-content-between mb-3">
                    <div>
                      <span className="block text-500 font-medium mb-3">
                        Revenue
                      </span>
                      <div className="text-900 font-medium text-xl">$2.100</div>
                    </div>
                    <div
                      className="flex align-items-center justify-content-center bg-orange-100 border-round"
                      style={{ width: "2.5rem", height: "2.5rem" }}
                    >
                      <i className="pi pi-map-marker text-orange-500 text-xl"></i>
                    </div>
                  </div>
                  <span className="text-green-500 font-medium">%52+ </span>
                  <span className="text-500">since last week</span>
                </div>
              </div>
              <div className="col-12 lg:col-6 xl:col-3">
                <div className="surface-card shadow-2 p-3 border-1 border-50 border-round">
                  <div className="flex justify-content-between mb-3">
                    <div>
                      <span className="block text-500 font-medium mb-3">
                        Customers
                      </span>
                      <div className="text-900 font-medium text-xl">28441</div>
                    </div>
                    <div
                      className="flex align-items-center justify-content-center bg-cyan-100 border-round"
                      style={{ width: "2.5rem", height: "2.5rem" }}
                    >
                      <i className="pi pi-inbox text-cyan-500 text-xl"></i>
                    </div>
                  </div>
                  <span className="text-green-500 font-medium">520 </span>
                  <span className="text-500">newly registered</span>
                </div>
              </div>
              <div className="col-12 lg:col-6 xl:col-3">
                <div className="surface-card shadow-2 p-3 border-1 border-50 border-round">
                  <div className="flex justify-content-between mb-3">
                    <div>
                      <span className="block text-500 font-medium mb-3">
                        Comments
                      </span>
                      <div className="text-900 font-medium text-xl">
                        152 Unread
                      </div>
                    </div>
                    <div
                      className="flex align-items-center justify-content-center bg-purple-100 border-round"
                      style={{ width: "2.5rem", height: "2.5rem" }}
                    >
                      <i className="pi pi-comment text-purple-500 text-xl"></i>
                    </div>
                  </div>
                  <span className="text-green-500 font-medium">85 </span>
                  <span className="text-500">responded</span>
                </div>
              </div>
              <div className="col-12 xl:col-6">
                <div className="surface-card shadow-2 border-round p-4">
                  <div className="text-xl text-900 font-medium mb-5">
                    Latest News
                  </div>
                  <ul className="list-none p-0 m-0">
                    <li className="pb-3 border-bottom-1 surface-border">
                      <div className="font-medium text-900 mb-2">
                        Aenean euismod elementum
                      </div>
                      <div
                        className="line-height-3 text-600"
                        style={{ maxWidth: "30rem" }}
                      >
                        Vitae turpis massa sed elementum tempus egestas sed sed
                        risus. In metus vulputate eu scelerisque felis imperdiet
                        proin.
                      </div>
                    </li>
                    <li className="py-3 border-bottom-1 surface-border">
                      <div className="font-medium text-900 mb-2">
                        In iaculis nunc sed augue lacus
                      </div>
                      <div
                        className="line-height-3 text-600"
                        style={{ maxWidth: "30rem" }}
                      >
                        Viverra vitae congue. Nisi scelerisque eu ultrices vitae
                        auctor eu augue ut lectus. Elementum eu facilisis sed
                        odio morbi.
                      </div>
                    </li>
                    <li className="py-3 border-bottom-1 surface-border">
                      <div className="font-medium text-900 mb-2">
                        Proin sagittis nisl rhoncus
                      </div>
                      <div
                        className="line-height-3 text-600"
                        style={{ maxWidth: "30rem" }}
                      >
                        In pellentesque massa placerat duis ultricies lacus. Ac
                        feugiat sed lectus vestibulum mattis ullamcorper.
                      </div>
                    </li>
                  </ul>
                  <div className="flex justify-content-between pt-3">
                    <Button
                      label="Clear All"
                      className="p-button-outlined p-button-secondary w-6 mr-2"
                    />
                    <Button
                      label="New Entry"
                      className="p-button-outlined w-6 ml-2"
                    />
                  </div>
                </div>
              </div>
              <div className="col-12 xl:col-6">
                <div className="surface-card shadow-2 border-round p-4">
                  <div className="flex justify-content-between align-items-center mb-5">
                    <span className="text-xl text-900 font-medium">
                      Team Members
                    </span>
                    <div>
                      <Button
                        icon="pi pi-ellipsis-v"
                        className="p-button-text p-button-plain p-button-rounded"
                        onClick={(event) => cag.current.toggle(event)}
                      />
                      <Menu ref={cag} popup model={items} />
                    </div>
                  </div>
                  <ul className="list-none p-0 m-0">
                    <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                      <div className="flex">
                        <Image
                          src="/assets/avatar-f-1@2x.png"
                          alt="avatar-f-1"
                          className="mr-3 lg:mr-2"
                          width={45}
                          height={45}
                        />{" "}
                        <div>
                          <span className="block text-900 font-medium mb-1">
                            Janette Hudson
                          </span>
                          <div className="text-600">UI/UX Designer</div>
                        </div>
                      </div>
                      <div className="mt-2 md:mt-0 flex flex-nowrap">
                        <Button
                          className="p-button-text p-button-plain p-button-rounded mr-1"
                          icon="pi pi-twitter"
                        />
                        <Button
                          className="p-button-text p-button-plain p-button-rounded mr-1"
                          icon="pi pi-github"
                        />
                        <Button
                          className="p-button-text p-button-plain p-button-rounded mr-1"
                          icon="pi pi-facebook"
                        />
                      </div>
                    </li>
                    <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                      <div className="flex">
                        <Image
                          src="/assets/avatar-f-1@2x.png"
                          alt="avatar-f-1"
                          className="mr-3 lg:mr-2"
                          width={45}
                          height={45}
                        />
                        <div>
                          <span className="block text-900 font-medium mb-1">
                            Theresa Webb Hudson
                          </span>
                          <div className="text-600">UI/UX Designer</div>
                        </div>
                      </div>
                      <div className="mt-2 md:mt-0 flex flex-nowrap">
                        <Button
                          className="p-button-text p-button-plain p-button-rounded mr-1"
                          icon="pi pi-twitter"
                        />
                        <Button
                          className="p-button-text p-button-plain p-button-rounded mr-1"
                          icon="pi pi-github"
                        />
                        <Button
                          className="p-button-text p-button-plain p-button-rounded mr-1"
                          icon="pi pi-facebook"
                        />
                      </div>
                    </li>
                    <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                      <div className="flex">
                        <Image
                          src="/assets/avatar-f-1@2x.png"
                          alt="avatar-f-1"
                          className="mr-3 lg:mr-2"
                          width={45}
                          height={45}
                        />{" "}
                        <div>
                          <span className="block text-900 font-medium mb-1">
                            Arlene McCoy
                          </span>
                          <div className="text-600">UI/UX Designer</div>
                        </div>
                      </div>
                      <div className="mt-2 md:mt-0 flex flex-nowrap">
                        <Button
                          className="p-button-text p-button-plain p-button-rounded mr-1"
                          icon="pi pi-twitter"
                        />
                        <Button
                          className="p-button-text p-button-plain p-button-rounded mr-1"
                          icon="pi pi-github"
                        />
                        <Button
                          className="p-button-text p-button-plain p-button-rounded mr-1"
                          icon="pi pi-facebook"
                        />
                      </div>
                    </li>
                    <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                      <div className="flex">
                        <Image
                          src="/assets/avatar-f-1@2x.png"
                          alt="avatar-f-1"
                          className="mr-3 lg:mr-2"
                          width={45}
                          height={45}
                        />{" "}
                        <div>
                          <span className="block text-900 font-medium mb-1">
                            Jacob Jones
                          </span>
                          <div className="text-600">UI/UX Designer</div>
                        </div>
                      </div>
                      <div className="mt-2 md:mt-0 flex flex-nowrap">
                        <Button
                          className="p-button-text p-button-plain p-button-rounded mr-1"
                          icon="pi pi-twitter"
                        />
                        <Button
                          className="p-button-text p-button-plain p-button-rounded mr-1"
                          icon="pi pi-github"
                        />
                        <Button
                          className="p-button-text p-button-plain p-button-rounded mr-1"
                          icon="pi pi-facebook"
                        />
                      </div>
                    </li>
                    <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                      <div className="flex">
                        <Image
                          src="/assets/avatar-f-1@2x.png"
                          alt="avatar-f-1"
                          className="mr-3 lg:mr-2"
                          width={45}
                          height={45}
                        />{" "}
                        <div>
                          <span className="block text-900 font-medium mb-1">
                            James Cooper
                          </span>
                          <div className="text-600">UI/UX Designer</div>
                        </div>
                      </div>
                      <div className="mt-2 md:mt-0 flex flex-nowrap">
                        <Button
                          className="p-button-text p-button-plain p-button-rounded mr-1"
                          icon="pi pi-twitter"
                        />
                        <Button
                          className="p-button-text p-button-plain p-button-rounded mr-1"
                          icon="pi pi-github"
                        />
                        <Button
                          className="p-button-text p-button-plain p-button-rounded mr-1"
                          icon="pi pi-facebook"
                        />
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-12">
                <div className="border-round p-4">
                  <div className="text-xl text-900 font-medium mb-5">
                    Timeline
                  </div>
                  <div className="mb-5 flex">
                    <div
                      className="flex flex-column align-items-center"
                      style={{ width: "2rem" }}
                    >
                      <span className="bg-blue-500 text-0 flex align-items-center justify-content-center border-circle p-2">
                        <i className="pi pi-compass text-xl"></i>
                      </span>
                      <div
                        className="h-full bg-blue-500"
                        style={{ width: "2px", minHeight: "4rem" }}
                      ></div>
                    </div>
                    <div className="ml-5 surface-card shadow-2 border-round p-3 flex-auto">
                      <div className="mb-3">
                        <span className="text-900 font-medium inline-block mr-3">
                          Jacob Jones
                        </span>
                        <span className="text-500 text-sm">1 minute ago</span>
                      </div>
                      <div className="line-height-3 text-700 mb-3">
                        Eu tincidunt tortor aliquam nulla facilisi cras
                        fermentum. Sollicitudin nibh sit amet commodo nulla.
                        Mauris in aliquam sem fringilla ut morbi.
                      </div>
                      <div className="text-500 flex align-items-center gap-4">
                        <div className="flex align-items-center gap-1">
                          <i className="pi pi-heart"></i>
                          <span>0</span>
                        </div>
                        <div className="flex align-items-center gap-1">
                          <i className="pi pi-comment"></i>
                          <span>1</span>
                        </div>
                        <div className="flex align-items-center gap-1">
                          <i className="pi pi-eye"></i>
                          <span>24</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-5 flex">
                    <div
                      className="flex flex-column align-items-center"
                      style={{ width: "2rem" }}
                    >
                      <span className="bg-orange-500 text-0 flex align-items-center justify-content-center border-circle p-2">
                        <i className="pi pi-list text-xl"></i>
                      </span>
                      <div
                        className="h-full bg-orange-500"
                        style={{ width: "2px", minHeight: "4rem" }}
                      ></div>
                    </div>
                    <div className="ml-5 surface-card shadow-2 border-round p-3 flex-auto">
                      <div className="mb-3">
                        <span className="text-900 font-medium inline-block mr-3">
                          Theresa Webb
                        </span>
                        <span className="text-500 text-sm">2 hours ago</span>
                      </div>
                      <div className="line-height-3 text-700 mb-3">
                        Purus sit amet volutpat consequat mauris. Pretium lectus
                        quam id leo in vitae. Posuere sollicitudin aliquam
                        ultrices sagittis orci a scelerisque purus semper.
                      </div>
                      <div className="text-500 flex align-items-center gap-4">
                        <div className="flex align-items-center gap-1">
                          <i className="pi pi-heart"></i>
                          <span>26</span>
                        </div>
                        <div className="flex align-items-center gap-1">
                          <i className="pi pi-comment"></i>
                          <span>6</span>
                        </div>
                        <div className="flex align-items-center gap-1">
                          <i className="pi pi-eye"></i>
                          <span>673</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-5 flex">
                    <div
                      className="flex flex-column align-items-center"
                      style={{ width: "2rem" }}
                    >
                      <span className="bg-purple-500 text-0 flex align-items-center justify-content-center border-circle p-2">
                        <i className="pi pi-inbox text-xl"></i>
                      </span>
                      <div
                        className="h-full bg-purple-500"
                        style={{ width: "2px", minHeight: "4rem" }}
                      ></div>
                    </div>
                    <div className="ml-5 surface-card shadow-2 border-round p-3 flex-auto">
                      <div className="mb-3">
                        <span className="text-900 font-medium inline-block mr-3">
                          Walter Black
                        </span>
                        <span className="text-500 text-sm">4 hours ago</span>
                      </div>
                      <div className="line-height-3 text-700 mb-3">
                        Euismod in pellentesque massa placerat duis ultricies
                        lacus. Vitae sapien pellentesque habitant morbi
                        tristique senectus et netus et.
                      </div>
                      <div className="text-500 flex align-items-center gap-4">
                        <div className="flex align-items-center gap-1">
                          <i className="pi pi-heart"></i>
                          <span>62</span>
                        </div>
                        <div className="flex align-items-center gap-1">
                          <i className="pi pi-comment"></i>
                          <span>36</span>
                        </div>
                        <div className="flex align-items-center gap-1">
                          <i className="pi pi-eye"></i>
                          <span>21</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
