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
import { Quotes } from "../../quotes/types/quotes";
import {
  getQuotes,
  addQuote,
  deleteQuote,
} from "../../quotes/actions/quotesActions";
import { useReactToPrint } from "react-to-print";

export default function QuotesManagement() {
  const [quotes, setQuotes] = useState<Quotes[]>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [showAddDialog, setShowAddDialog] = useState<boolean>(false);

  const [showDetailDialog, setShowDetailDialog] = useState<boolean>(false);
  const [selectedQuote, setSelectedQuote] = useState<Quotes | null>(null);

  const [newQuote, setNewQuote] = useState<Quotes>({
    Fecha: "",
    Numero: 0,
    Cliente: "",
    Items: 0,
    Unidades: 0,
    Sub_total: 0,
    Igv: 18,
    Total: 0,
    Estado: true,
    Usuario: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const toast = React.useRef<Toast>(null);

  const printDetails = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => printDetails.current,
  });

  useEffect(() => {
    loadQuotes();
  }, []);

  async function loadQuotes() {
    const data = await getQuotes();
    setQuotes(data);
  }

  async function handleAddQuote() {
    setSubmitted(true);
    if (validateForm()) {
      try {
        const lastQuote = quotes[quotes.length - 1];
        const newNumero = lastQuote ? lastQuote.Numero + 1 : 1001;
        const quoteToAdd = { ...newQuote, Numero: newNumero };
        await addQuote(quoteToAdd);
        await loadQuotes();
        setShowAddDialog(false);
        resetNewQuote();
        toast.current?.show({
          severity: "success",
          summary: "Éxito",
          detail: "Cotización añadida correctamente",
        });
      } catch (error) {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "No se pudo añadir la cotización",
        });
      }
    }
  }

  function validateForm() {
    return (
      newQuote.Fecha.trim() !== "" &&
      newQuote.Cliente.trim() !== "" &&
      newQuote.Items !== 0 &&
      newQuote.Unidades !== 0 &&
      newQuote.Sub_total !== 0 &&
      newQuote.Igv !== 0 &&
      newQuote.Total !== 0 &&
      newQuote.Usuario.trim() !== ""
    );
  }

  async function handleDeleteQuote(numero: number) {
    try {
      await deleteQuote(numero);
      await loadQuotes();
      toast.current?.show({
        severity: "success",
        summary: "Éxito",
        detail: "Cotización eliminada correctamente",
      });
    } catch (error) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "No se pudo eliminar la cotización",
      });
    }
  }

  function resetNewQuote() {
    setNewQuote({
      Fecha: "",
      Numero: 0,
      Cliente: "",
      Items: 0,
      Unidades: 0,
      Sub_total: 0,
      Igv: 0,
      Total: 0,
      Estado: true,
      Usuario: "",
    });
    setSubmitted(false);
  }

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(quotes);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      saveAsExcelFile(excelBuffer, "cotizaciones");
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

  const actionBodyTemplate = (rowData: Quotes) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-eye"
          className="p-button-rounded p-button-info p-button-sm mr-2"
          onClick={() => {
            setSelectedQuote(rowData);
            setShowDetailDialog(true);
          }}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger p-button-sm"
          onClick={() => handleDeleteQuote(rowData.Numero)}
        />
      </React.Fragment>
    );
  };

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h4 className="m-0 mb-3 md:mb-0">Gestión de Cotizaciones</h4>
      <span className="p-input-icon-left mb-3 md:mb-0 w-full md:w-auto">
        <i className="ml-2 pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter((e.target as HTMLInputElement).value)}
          placeholder="Buscar..."
          className="w-full md:w-auto"
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
          label="Nueva Cotización"
          icon="pi pi-plus"
          onClick={() => setShowAddDialog(true)}
        />
      </div>
    </div>
  );

  const footer = `En total hay ${quotes ? quotes.length : 0} cotizaciones.`;

  const handleFocus = (e: any) => {
    e.target.setSelectionRange(0, e.target.value.indexOf("."));
  };

  return (
    <div className="card">
      <Toast ref={toast} />

      <DataTable
        value={quotes}
        showGridlines
        stripedRows
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25, 50]}
        globalFilter={globalFilter}
        header={header}
        footer={footer}
        scrollable
        scrollHeight="400px"
        responsiveLayout="stack"
        breakpoint="960px"
        className="w-full"
      >
        <Column field="Fecha" header="Fecha" sortable></Column>
        <Column field="Numero" header="Número" sortable></Column>
        <Column field="Cliente" header="Cliente" sortable></Column>
        <Column field="Items" header="Items" sortable></Column>
        <Column field="Unidades" header="Unidades" sortable></Column>
        <Column field="Sub_total" header="Sub Total" sortable></Column>
        <Column field="Igv" header="IGV" sortable></Column>
        <Column field="Total" header="Total" sortable></Column>
        <Column
          field="Estado"
          header="Estado"
          body={(rowData) => (rowData.Estado ? "Activo" : "Inactivo")}
          sortable
        ></Column>
        <Column field="Usuario" header="Usuario" sortable></Column>
        <Column
          header="Acciones"
          body={actionBodyTemplate}
          className="w-10rem"
        ></Column>
      </DataTable>

      <Dialog
        header="Añadir Nueva Cotización"
        visible={showAddDialog}
        style={{ width: "90vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        modal
        onHide={() => {
          setShowAddDialog(false);
          resetNewQuote();
        }}
      >
        <div className="grid">
          <div className="col-12 md:col-4">
            <div className="field">
              <label htmlFor="fecha" className="font-bold">
                Fecha
              </label>
              <Calendar
                id="fecha"
                value={newQuote.Fecha ? new Date(newQuote.Fecha) : null}
                onChange={(e) =>
                  setNewQuote({
                    ...newQuote,
                    Fecha: e.value ? e.value.toISOString().split("T")[0] : "",
                  })
                }
                className={classNames("w-full", {
                  "p-invalid": submitted && !newQuote.Fecha.trim(),
                })}
              />
              {submitted && !newQuote.Fecha.trim() && (
                <small className="p-error">Requerido</small>
              )}
            </div>
          </div>
          <div className="col-12 md:col-4">
            <div className="field">
              <label htmlFor="cliente" className="font-bold">
                Cliente
              </label>
              <InputText
                id="cliente"
                value={newQuote.Cliente}
                onChange={(e) =>
                  setNewQuote({ ...newQuote, Cliente: e.target.value })
                }
                className={classNames("w-full", {
                  "p-invalid": submitted && !newQuote.Cliente.trim(),
                })}
              />
              {submitted && !newQuote.Cliente.trim() && (
                <small className="p-error">Requerido</small>
              )}
            </div>
          </div>
          <div className="col-12 md:col-4">
            <div className="field">
              <label htmlFor="usuario" className="font-bold">
                Usuario
              </label>
              <InputText
                id="usuario"
                value={newQuote.Usuario}
                onChange={(e) =>
                  setNewQuote({ ...newQuote, Usuario: e.target.value })
                }
                className={classNames("w-full", {
                  "p-invalid": submitted && !newQuote.Usuario.trim(),
                })}
              />
              {submitted && !newQuote.Usuario.trim() && (
                <small className="p-error">Requerido</small>
              )}
            </div>
          </div>
          <div className="col-6 md:col-3">
            <div className="field">
              <label htmlFor="items" className="font-bold">
                Items
              </label>
              <InputNumber
                id="items"
                value={newQuote.Items}
                onValueChange={(e) =>
                  setNewQuote({ ...newQuote, Items: e.value || 0 })
                }
                className={classNames("w-full", {
                  "p-invalid": submitted && newQuote.Items === 0,
                })}
              />
              {submitted && newQuote.Items === 0 && (
                <small className="p-error">Requerido</small>
              )}
            </div>
          </div>
          <div className="col-6 md:col-3">
            <div className="field">
              <label htmlFor="unidades" className="font-bold">
                Unidades
              </label>
              <InputNumber
                id="unidades"
                value={newQuote.Unidades}
                onValueChange={(e) =>
                  setNewQuote({ ...newQuote, Unidades: e.value || 0 })
                }
                className={classNames("w-full", {
                  "p-invalid": submitted && newQuote.Unidades === 0,
                })}
              />
              {submitted && newQuote.Unidades === 0 && (
                <small className="p-error">Requerido</small>
              )}
            </div>
          </div>
          <div className="col-6 md:col-3">
            <div className="field">
              <label htmlFor="subTotal" className="font-bold">
                Sub Total
              </label>
              <InputNumber
                id="subTotal"
                value={newQuote.Sub_total}
                onValueChange={(e) =>
                  setNewQuote({ ...newQuote, Sub_total: e.value || 0 })
                }
                mode="currency"
                currency="USD"
                locale="es-ES"
                minFractionDigits={2}
                className={classNames("w-full", {
                  "p-invalid": submitted && newQuote.Sub_total === 0,
                })}
                onFocus={handleFocus}
              />
              {submitted && newQuote.Sub_total === 0 && (
                <small className="p-error">Requerido</small>
              )}
            </div>
          </div>
          <div className="col-6 md:col-3">
            <div className="field">
              <label htmlFor="igv" className="font-bold">
                IGV
              </label>
              <InputNumber
                id="igv"
                value={newQuote.Igv}
                onValueChange={(e) =>
                  setNewQuote({ ...newQuote, Igv: e.value || 0 })
                }
                mode="currency"
                currency="USD"
                locale="es-ES"
                minFractionDigits={2}
                className={classNames("w-full", {
                  "p-invalid": submitted && newQuote.Igv === 0,
                })}
                onFocus={handleFocus}
              />
              {submitted && newQuote.Igv === 0 && (
                <small className="p-error">Requerido</small>
              )}
            </div>
          </div>
          <div className="col-6 md:col-3">
            <div className="field">
              <label htmlFor="total" className="font-bold">
                Total
              </label>
              <InputNumber
                id="total"
                value={newQuote.Total}
                onValueChange={(e) =>
                  setNewQuote({ ...newQuote, Total: e.value || 0 })
                }
                mode="currency"
                currency="USD"
                locale="es-ES"
                minFractionDigits={2}
                className={classNames("w-full", {
                  "p-invalid": submitted && newQuote.Total === 0,
                })}
                onFocus={handleFocus}
              />
              {submitted && newQuote.Total === 0 && (
                <small className="p-error">Requerido</small>
              )}
            </div>
          </div>
          <div className="col-6 md:col-3">
            <div className="field">
              <label htmlFor="estado" className="font-bold">
                Estado
              </label>
              <Dropdown
                id="estado"
                options={[
                  { label: "Activo", value: true },
                  { label: "Inactivo", value: false },
                ]}
                value={newQuote.Estado}
                onChange={(e) => setNewQuote({ ...newQuote, Estado: e.value })}
                placeholder="Seleccione"
                className="w-full"
              />
            </div>
          </div>
          <div className="col-12">
            <Button
              label="Añadir Cotización"
              icon="pi pi-plus"
              onClick={handleAddQuote}
              className="w-full"
            />
          </div>
        </div>
      </Dialog>

      <Dialog
        header="Detalles de la Cotización"
        visible={showDetailDialog}
        style={{ width: "90vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        modal
        onHide={() => setShowDetailDialog(false)}
        className="p-fluid"
      >
        <div ref={printDetails}>
          <style type="text/css" media="print">
            {`
        @media print {
          .print-friendly .p-field {
            page-break-inside: avoid;
          }
          .print-friendly .border-round {
            border: none !important;
          }
          .print-friendly .text-500 {
            color: #000 !important;
          }
          .p-dialog-content {
            padding: 0 !important;
          }
        }
      `}
          </style>
          {selectedQuote && (
            <div className="grid">
              <div className="col-12 md:col-6 lg:col-4">
                <div className="p-field mb-4">
                  <label className="block text-900 font-medium mb-2">
                    Cliente
                  </label>
                  <div className="p-3 border-1 surface-border border-round">
                    <span className="text-500">{selectedQuote.Cliente}</span>
                  </div>
                </div>
              </div>
              <div className="col-12 md:col-6 lg:col-4">
                <div className="p-field mb-4">
                  <label className="block text-900 font-medium mb-2">
                    Moneda
                  </label>
                  <div className="p-3 border-1 surface-border border-round">
                    <span className="text-500">Dólar</span>
                  </div>
                </div>
              </div>
              <div className="col-12 md:col-6 lg:col-4">
                <div className="p-field mb-4">
                  <label className="block text-900 font-medium mb-2">
                    Fecha de Emisión
                  </label>
                  <div className="p-3 border-1 surface-border border-round">
                    <span className="text-500">{selectedQuote.Fecha}</span>
                  </div>
                </div>
              </div>
              <div className="col-12 md:col-6 lg:col-4">
                <div className="p-field mb-4">
                  <label className="block text-900 font-medium mb-2">
                    Fecha de Vencimiento
                  </label>
                  <div className="p-3 border-1 surface-border border-round">
                    <span className="text-500">
                      {new Date(
                        new Date(selectedQuote.Fecha).getTime() +
                          30 * 24 * 60 * 60 * 1000
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-12 md:col-6 lg:col-4">
                <div className="p-field mb-4">
                  <label className="block text-900 font-medium mb-2">
                    Días de Vencimiento
                  </label>
                  <div className="p-3 border-1 surface-border border-round">
                    <span className="text-500">30</span>
                  </div>
                </div>
              </div>
              <div className="col-12 md:col-6 lg:col-4">
                <div className="p-field mb-4">
                  <label className="block text-900 font-medium mb-2">
                    Condición de Pago
                  </label>
                  <div className="p-3 border-1 surface-border border-round">
                    <span className="text-500">Contado</span>
                  </div>
                </div>
              </div>
              <div className="col-12 md:col-6 lg:col-4">
                <div className="p-field mb-4">
                  <label className="block text-900 font-medium mb-2">
                    Condición de Entrega
                  </label>
                  <div className="p-3 border-1 surface-border border-round">
                    <span className="text-500">Domicilio</span>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="p-field mb-4">
                  <label className="block text-900 font-medium mb-2">
                    Nota
                  </label>
                  <div className="p-3 border-1 surface-border border-round">
                    <span className="text-500">
                      Nota de ejemplo para la cotización #{selectedQuote.Numero}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-content-end mt-4">
          <Button
            label="Imprimir"
            icon="pi pi-print"
            onClick={handlePrint}
            className="p-button-secondary"
          />
        </div>
      </Dialog>
    </div>
  );
}
