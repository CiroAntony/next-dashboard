"use client";

import React, { useState } from "react";
import { Button } from "primereact/button";
import { Rating } from "primereact/rating";
import { InputText } from "primereact/inputtext";
import Image from "next/image";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Toast } from "primereact/toast";

export default function CardsProducts() {
  const [searchTerm, setSearchTerm] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [toast, setToast] = useState(null);

  const productImageUrl =
    "https://www.longchamp.com/dw/image/v2/BCVX_PRD/on/demandware.static/-/Sites-LC-master-catalog/default/dw8cf350ac/images/DIS/10197HCV016_0.png?sw=400&sh=400&sm=fit";

  const products = [
    {
      id: 1,
      name: "Bamboo Watch",
      description: "Duis Aute Irure",
      price: "$9.66",
      rating: 3,
    },
    {
      id: 2,
      name: "Black Watch",
      description: "Ullam libero",
      price: "$12.45",
      rating: 4,
    },
    {
      id: 3,
      name: "Shoes",
      description: "Eveniet magnam",
      price: "$21.50",
      rating: 3,
    },
    {
      id: 4,
      name: "Yoga-Mat",
      description: "Quis minus soluta",
      price: "$15.00",
      rating: 3,
    },
    {
      id: 5,
      name: "Headphones",
      description: "Sunt facere tempora",
      price: "$44.50",
      rating: 3,
    },
    {
      id: 6,
      name: "Lime Band",
      description: "Lorem Ipsum Dolor",
      price: "$5.90",
      rating: 4,
    },
    {
      id: 7,
      name: "Necklace",
      description: "Sit amet consectetur",
      price: "$21.90",
      rating: 3,
    },
    {
      id: 8,
      name: "T-Shirt",
      description: "Adipisicing elit",
      price: "$18.50",
      rating: 3,
    },
  ];

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  });

  const handleShare = async (productName: string) => {
    const baseUrl = window.location.origin;
    const currentParams = new URLSearchParams(searchParams);
    currentParams.set("query", productName);
    const shareUrl = `${baseUrl}${pathname}?${currentParams.toString()}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Mira este producto: ${productName}`,
          text: `Echa un vistazo a ${productName} en nuestra tienda.`,
          url: shareUrl,
        });
        toast.current?.show({
          severity: "success",
          summary: "Compartido",
          detail: "El enlace del producto ha sido compartido exitosamente",
          life: 3000,
        });
      } catch (error) {
        console.error("Error al compartir:", error);
        fallbackCopyToClipboard(shareUrl);
      }
    } else {
      fallbackCopyToClipboard(shareUrl);
    }
  };

  const fallbackCopyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.current?.show({
          severity: "success",
          summary: "Enlace copiado",
          detail: "El enlace del producto ha sido copiado al portapapeles",
          life: 3000,
        });
      })
      .catch((err) => {
        console.error("Error al copiar el enlace: ", err);
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "No se pudo copiar el enlace",
          life: 3000,
        });
      });
  };

  const renderProductCard = (product: any) => (
    <div className="col-12 md:col-6 xl:col-3 p-3" key={product.id}>
      <div className="surface-card shadow-2 border-round p-4">
        <div className="flex flex-column align-items-center border-bottom-1 surface-border pb-3">
          <div
            className="mb-3 relative"
            style={{ width: "150px", height: "150px" }}
          >
            <Image
              src={productImageUrl}
              alt={product.name}
              width={150}
              height={150}
              objectFit="contain"
            />
          </div>
          <span className="text-xl text-900 font-medium mb-2">
            {product.name}
          </span>
          <span className="text-600 font-medium mb-3">
            {product.description}
          </span>
          <span className="text-2xl text-800 block mb-3 font-semibold">
            {product.price}
          </span>
          <Rating value={product.rating} readOnly stars={5} cancel={false} />
        </div>
        <div className="flex pt-3 justify-content-between align-items-center">
          <Button
            icon="pi pi-share-alt"
            className="p-button-text"
            onClick={() => handleShare(product.name)}
            tooltip="Compartir producto"
            tooltipOptions={{ position: "top" }}
          />
          <Button
            icon="pi pi-heart"
            className="p-button-text p-button-secondary"
          />
        </div>
      </div>
    </div>
  );

  const query = searchParams.get("query") || "";
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="surface-ground">
      <Toast ref={toast} />
      <div className="p-3">
        <span className="p-input-icon-left">
          <i className=" ml-2 pi pi-search" />
          <InputText
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Buscar por nombre"
            style={{ paddingLeft: "2.5rem", width: "100%" }}
          />
        </span>
      </div>
      <div className="grid">{filteredProducts.map(renderProductCard)}</div>
    </div>
  );
}
