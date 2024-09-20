"use client";

import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";
import { Product } from "../../products/types/products";
import {
  getProducts,
  addProduct,
  deleteProduct,
} from "../../products/actions/productActions";
import { useReactToPrint } from "react-to-print";
import { PrintableInvoice } from "./print/page";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [showAddDialog, setShowAddDialog] = useState<boolean>(false);
  const [showDetailDialog, setShowDetailDialog] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Product>({
    Cod: 0,
    Descripción: "",
    Descripción2: "",
    Marca: "",
    Cod_proveedor: 0,
    Costo_unitario: 0,
    Stock_total: 0,
    igv: 18.0,
    Valor_de_mercancia: 0,
    Fecha_creación: "",
    Usuario: "",
    Ult_modificación: "",
    Usuario_modificador: "",
    Estado: true,
  });
  const [submitted, setSubmitted] = useState(false);
  const toast = React.useRef<Toast>(null);
  const printRef = useRef<HTMLDivElement>(null);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    const data = await getProducts();
    setProducts(data);
  }

  async function handleAddProduct() {
    setSubmitted(true);
    if (validateForm()) {
      try {
        const lastProduct = products[products.length - 1];
        const newCod = lastProduct ? lastProduct.Cod + 1 : 1;
        const productToAdd = { ...newProduct, Cod: newCod };
        await addProduct(productToAdd);
        await loadProducts();
        setShowAddDialog(false);
        resetNewProduct();
        toast.current?.show({
          severity: "success",
          summary: "Éxito",
          detail: "Producto añadido correctamente",
        });
      } catch (error) {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "No se pudo añadir el producto",
        });
      }
    }
  }

  function validateForm() {
    return (
      newProduct.Descripción.trim() !== "" &&
      newProduct.Marca.trim() !== "" &&
      newProduct.Cod_proveedor !== 0 &&
      newProduct.Costo_unitario !== 0 &&
      newProduct.Stock_total !== 0 &&
      newProduct.Valor_de_mercancia !== 0 &&
      newProduct.Fecha_creación.trim() !== "" &&
      newProduct.Usuario.trim() !== "" &&
      newProduct.igv !== 0
    );
  }

  async function handleDeleteProduct(cod: number) {
    try {
      await deleteProduct(cod);
      await loadProducts();
      toast.current?.show({
        severity: "success",
        summary: "Éxito",
        detail: "Productos eliminado correctamente",
      });
    } catch (error) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "No se pudo eliminar el producto",
      });
    }
  }

  function resetNewProduct() {
    setNewProduct({
      Cod: 0,
      Descripción: "",
      Descripción2: "",
      Marca: "",
      Cod_proveedor: 0,
      Costo_unitario: 0,
      Stock_total: 0,
      igv: 0,
      Valor_de_mercancia: 0,
      Fecha_creación: "",
      Usuario: "",
      Ult_modificación: "",
      Usuario_modificador: "",
      Estado: true,
    });
    setSubmitted(false);
  }

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(products);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      saveAsExcelFile(excelBuffer, "productos");
    });
  };

  const saveAsExcelFile = (buffer: any, fileName: string) => {
    import("file-saver").then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        let EXCEL_EXTENSION = ".xlsx";
        const data = new Blob([buffer], {
          type: EXCEL_TYPE,
        });

        module.default.saveAs(
          data,
          fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
        );
      }
    });
  };

  const header = (
    <div className="flex justify-content-between align-items-center">
      <h4 className="m-0">Gestión de Productos</h4>
      <span className="p-input-icon-left">
        <i className="ml-2 pi pi-search" />
        <InputText
          type="search"
          onChange={(event) => handleSearch(event.target.value)}
          onInput={(e) => setGlobalFilter((e.target as HTMLInputElement).value)}
          placeholder=" Buscar..."
          defaultValue={searchParams.get("query")?.toString()}
          style={{ paddingLeft: "2.5rem", width: "100%" }}
        />
      </span>
      <div className="flex flex-column md:flex-row">
        <Button
          label="Exportar a Excel"
          icon="pi pi-file-excel"
          className="p-button-success mb-2 md:mb-0 md:mr-2"
          onClick={exportExcel}
        />
        <Button
          label="Nuevo Producto"
          icon="pi pi-plus"
          onClick={() => setShowAddDialog(true)}
        />
      </div>
    </div>
  );

  const actionBodyTemplate = (rowData: Product) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-eye"
          className="p-button-rounded p-button-info p-button-sm mr-2"
          onClick={() => {
            setSelectedProduct(rowData);
            setShowDetailDialog(true);
          }}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger p-button-sm"
          onClick={() => handleDeleteProduct(rowData.Cod)}
        />
      </React.Fragment>
    );
  };

  const footer = `En total hay ${products ? products.length : 0} productos.`;

  const handleFocus = (e: any) => {
    e.target.setSelectionRange(0, e.target.value.indexOf("."));
  };

  const DetailField = ({ label, value }: { label: string; value: any }) => (
    <div className="col-12 md:col-6 lg:col-4">
      <h5 className="font-bold mb-2">{label}</h5>
      <p className="p-2 border-1 surface-border border-round">{value}</p>
    </div>
  );

  return (
    <div className="card">
      <Toast ref={toast} />

      <DataTable
        value={products}
        showGridlines
        stripedRows
        paginator
        rows={13}
        rowsPerPageOptions={[5, 10, 25, 50]}
        globalFilter={globalFilter}
        header={header}
        footer={footer}
        scrollable
        className="w-full"
      >
        <Column field="Cod" header="Cod" sortable className="w-4rem"></Column>
        <Column
          field="Descripción"
          header="Desc"
          sortable
          className="w-10rem"
        ></Column>
        <Column
          field="Marca"
          header="Marca"
          sortable
          className="w-6rem"
        ></Column>
        <Column
          field="Cod_proveedor"
          header="Cod_prov"
          sortable
          className="w-6rem"
        ></Column>
        <Column
          field="Costo_unitario"
          header="Costo_Unit"
          sortable
          className="w-6rem"
        ></Column>
        <Column
          field="Stock_total"
          header="Stock"
          sortable
          className="w-5rem"
        ></Column>
        <Column
          field="Valor_de_mercancia"
          header="Valor_Merca"
          sortable
          className="w-7rem"
        ></Column>
        <Column
          field="Usuario"
          header="Usuario"
          sortable
          className="w-8rem"
        ></Column>
        <Column
          field="Ult_modificación"
          header="Ult_mod"
          sortable
          className="w-7rem"
        ></Column>
        <Column
          field="Usuario_modificador"
          header="Usuario_mod"
          sortable
          className="w-8rem"
        ></Column>
        <Column
          field="Estado"
          header="Estado"
          body={(rowData) => (rowData.Estado ? "Activo" : "Inactivo")}
          sortable
          className="w-6rem"
        ></Column>
        <Column
          header="Acciones"
          body={actionBodyTemplate}
          className="w-10rem"
        ></Column>
      </DataTable>

      <Button
        label="Imprimir"
        icon="pi pi-print"
        onClick={handlePrint}
        className="p-button-secondary"
        style={{ marginTop: "10px" }}
      />

      <Dialog
        header="Añadir Nuevo Producto"
        visible={showAddDialog}
        style={{ width: "80vw" }}
        modal
        onHide={() => {
          setShowAddDialog(false);
          resetNewProduct();
        }}
      >
        <div className="grid">
          <div className="col-12 md:col-6">
            <div className="p-field">
              <label htmlFor="descripcion" className="block mb-2">
                Descripción
              </label>
              <InputText
                id="descripcion"
                value={newProduct.Descripción}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, Descripción: e.target.value })
                }
                className={classNames("w-full", {
                  "p-invalid": submitted && !newProduct.Descripción.trim(),
                })}
              />
              {submitted && !newProduct.Descripción.trim() && (
                <small className="p-error block mt-2">
                  La descripción es requerida.
                </small>
              )}
            </div>
          </div>
          <div className="col-12 md:col-6">
            <div className="p-field">
              <label htmlFor="descripcion2" className="block mb-2">
                Descripción 2
              </label>
              <InputText
                id="descripcion2"
                value={newProduct.Descripción2}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, Descripción2: e.target.value })
                }
                className="w-full"
              />
            </div>
          </div>
          <div className="col-12 md:col-4">
            <div className="p-field">
              <label htmlFor="marca" className="block mb-2">
                Marca
              </label>
              <InputText
                id="marca"
                value={newProduct.Marca}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, Marca: e.target.value })
                }
                className={classNames("w-full", {
                  "p-invalid": submitted && !newProduct.Marca.trim(),
                })}
              />
              {submitted && !newProduct.Marca.trim() && (
                <small className="p-error block mt-2">
                  La marca es requerida.
                </small>
              )}
            </div>
          </div>
          <div className="col-12 md:col-4">
            <div className="p-field">
              <label htmlFor="codProveedor" className="block mb-2">
                Código Proveedor
              </label>
              <InputNumber
                id="codProveedor"
                value={newProduct.Cod_proveedor}
                onValueChange={(e) =>
                  setNewProduct({ ...newProduct, Cod_proveedor: e.value || 0 })
                }
                className={classNames("w-full", {
                  "p-invalid": submitted && newProduct.Cod_proveedor === 0,
                })}
              />
              {submitted && newProduct.Cod_proveedor === 0 && (
                <small className="p-error block mt-2">
                  El código de proveedor es requerido.
                </small>
              )}
            </div>
          </div>
          <div className="col-12 md:col-4">
            <div className="p-field">
              <label htmlFor="costoUnitario" className="block mb-2">
                Costo Unitario
              </label>
              <InputNumber
                id="costoUnitario"
                value={newProduct.Costo_unitario}
                onValueChange={(e) =>
                  setNewProduct({ ...newProduct, Costo_unitario: e.value || 0 })
                }
                mode="currency"
                currency="USD"
                locale="es-ES"
                className={classNames("w-full", {
                  "p-invalid": submitted && newProduct.Costo_unitario === 0,
                })}
                onFocus={handleFocus}
              />
              {submitted && newProduct.Costo_unitario === 0 && (
                <small className="p-error block mt-2">
                  El costo unitario es requerido.
                </small>
              )}
            </div>
          </div>
          <div className="col-12 md:col-4">
            <div className="p-field">
              <label htmlFor="stockTotal" className="block mb-2">
                Stock Total
              </label>
              <InputNumber
                id="stockTotal"
                value={newProduct.Stock_total}
                onValueChange={(e) =>
                  setNewProduct({ ...newProduct, Stock_total: e.value || 0 })
                }
                className={classNames("w-full", {
                  "p-invalid": submitted && newProduct.Stock_total === 0,
                })}
              />
              {submitted && newProduct.Stock_total === 0 && (
                <small className="p-error block mt-2">
                  El stock total es requerido.
                </small>
              )}
            </div>
          </div>
          <div className="col-12 md:col-4">
            <div className="p-field">
              <label htmlFor="igv" className="block mb-2">
                IGV
              </label>
              <InputNumber
                id="igv"
                value={newProduct.igv}
                onValueChange={(e) =>
                  setNewProduct({ ...newProduct, igv: e.value || 0 })
                }
                mode="decimal"
                minFractionDigits={2}
                maxFractionDigits={2}
                suffix="%"
                className={classNames("w-full", {
                  "p-invalid": submitted && newProduct.igv === 0,
                })}
                onFocus={handleFocus}
              />
              {submitted && newProduct.igv === 0 && (
                <small className="p-error block mt-2">
                  El IGV es requerido.
                </small>
              )}
            </div>
          </div>
          <div className="col-12 md:col-4">
            <div className="p-field">
              <label htmlFor="valorMercancia" className="block mb-2">
                Valor de Mercancía
              </label>
              <InputNumber
                id="valorMercancia"
                value={newProduct.Valor_de_mercancia}
                onValueChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    Valor_de_mercancia: e.value || 0,
                  })
                }
                mode="currency"
                currency="USD"
                locale="es-ES"
                className={classNames("w-full", {
                  "p-invalid": submitted && newProduct.Valor_de_mercancia === 0,
                })}
                onFocus={handleFocus}
              />
              {submitted && newProduct.Valor_de_mercancia === 0 && (
                <small className="p-error block mt-2">
                  El valor de mercancía es requerido.
                </small>
              )}
            </div>
          </div>
          <div className="col-12 md:col-4">
            <div className="p-field">
              <label htmlFor="fechaCreacion" className="block mb-2">
                Fecha de Creación
              </label>
              <Calendar
                id="fechaCreacion"
                value={
                  newProduct.Fecha_creación
                    ? new Date(newProduct.Fecha_creación)
                    : null
                }
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    Fecha_creación: e.value
                      ? e.value.toISOString().split("T")[0]
                      : "",
                  })
                }
                className={classNames("w-full", {
                  "p-invalid": submitted && !newProduct.Fecha_creación.trim(),
                })}
              />
              {submitted && !newProduct.Fecha_creación.trim() && (
                <small className="p-error block mt-2">
                  La fecha de creación es requerida.
                </small>
              )}
            </div>
          </div>
          <div className="col-12 md:col-4">
            <div className="p-field">
              <label htmlFor="usuario" className="block mb-2">
                Usuario
              </label>
              <InputText
                id="usuario"
                value={newProduct.Usuario}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, Usuario: e.target.value })
                }
                className={classNames("w-full", {
                  "p-invalid": submitted && !newProduct.Usuario.trim(),
                })}
              />
              {submitted && !newProduct.Usuario.trim() && (
                <small className="p-error block mt-2">
                  El usuario es requerido.
                </small>
              )}
            </div>
          </div>
          <div className="col-12 md:col-4">
            <div className="p-field">
              <label htmlFor="ultModificacion" className="block mb-2">
                Última Modificación
              </label>
              <Calendar
                id="ultModificacion"
                value={
                  newProduct.Ult_modificación
                    ? new Date(newProduct.Ult_modificación)
                    : null
                }
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    Ult_modificación: e.value
                      ? e.value.toISOString().split("T")[0]
                      : "",
                  })
                }
                className="w-full"
              />
            </div>
          </div>
          <div className="col-12 md:col-6">
            <div className="p-field">
              <label htmlFor="usuarioModificador" className="block mb-2">
                Usuario Modificador
              </label>
              <InputText
                id="usuarioModificador"
                value={newProduct.Usuario_modificador}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    Usuario_modificador: e.target.value,
                  })
                }
                className="w-full"
              />
            </div>
          </div>
          <div className="col-12 md:col-6">
            <div className="p-field">
              <label htmlFor="estado" className="block mb-2">
                Estado
              </label>
              <Dropdown
                id="estado"
                options={[
                  { label: "Activo", value: true },
                  { label: "Inactivo", value: false },
                ]}
                value={newProduct.Estado}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, Estado: e.value })
                }
                placeholder="Seleccione un estado"
                className="w-full"
              />
            </div>
          </div>
          <div className="col-12">
            <Button
              label="Añadir Producto"
              icon="pi pi-plus"
              onClick={handleAddProduct}
              className="w-full"
            />
          </div>
        </div>
      </Dialog>

      <div style={{ display: "none" }}>
        <PrintableInvoice ref={printRef} />
      </div>

      <Dialog
        header="Detalles del Producto"
        visible={showDetailDialog}
        style={{ width: "90vw" }}
        modal
        onHide={() => setShowDetailDialog(false)}
        className="p-fluid"
      >
        <div ref={printRef} className="print-friendly">
          {selectedProduct && (
            <div className="grid">
              <DetailField label="Código" value={selectedProduct.Cod} />
              <DetailField
                label="Descripción"
                value={selectedProduct.Descripción}
              />
              <DetailField
                label="Descripción 2"
                value={selectedProduct.Descripción2}
              />
              <DetailField label="Marca" value={selectedProduct.Marca} />
              <DetailField
                label="Código Proveedor"
                value={selectedProduct.Cod_proveedor}
              />
              <DetailField
                label="Costo Unitario"
                value={`$${selectedProduct.Costo_unitario.toFixed(2)}`}
              />
              <DetailField
                label="Stock Total"
                value={selectedProduct.Stock_total}
              />
              <DetailField
                label="IGV"
                value={`${selectedProduct.igv.toFixed(2)}%`}
              />
              <DetailField
                label="Valor de Mercancía"
                value={`$${selectedProduct.Valor_de_mercancia.toFixed(2)}`}
              />
              <DetailField
                label="Fecha de Creación"
                value={new Date(
                  selectedProduct.Fecha_creación
                ).toLocaleDateString()}
              />
              <DetailField label="Usuario" value={selectedProduct.Usuario} />
              <DetailField
                label="Última Modificación"
                value={
                  selectedProduct.Ult_modificación
                    ? new Date(
                        selectedProduct.Ult_modificación
                      ).toLocaleDateString()
                    : "N/A"
                }
              />
              <DetailField
                label="Usuario Modificador"
                value={selectedProduct.Usuario_modificador || "N/A"}
              />
              <DetailField
                label="Estado"
                value={selectedProduct.Estado ? "Activo" : "Inactivo"}
              />
            </div>
          )}
        </div>
        <div className="mt-4">
          <Button
            label="Imprimir"
            icon="pi pi-print"
            onClick={handlePrint}
            className="p-button-secondary w-full"
          />
        </div>
      </Dialog>
    </div>
  );
}
