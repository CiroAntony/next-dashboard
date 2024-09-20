"use client";

import React, { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Image from "next/image";

export const PrintableInvoice = React.forwardRef<HTMLDivElement>(
  (props, ref) => {
    const items = [
      { quantity: 10, price: 20 },
      { quantity: 10, price: 20 },
      { quantity: 10, price: 20 },
    ];

    const subtotal = items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
    const discount = 0;
    const total = subtotal - discount;

    const estilos = `
      .table {
        border-collapse: separate;
        border-spacing: 0;
        width: 100%;
      }
      .table th,
      .table td {
        border-right: 1px solid #000;
        padding: 8px;
        text-align: center;
        vertical-align: middle;
      }
      .table td {
        font-size: 13px
      }
      .table .items {
    text-align: left;
    vertical-align: top;
    font-size: 9pt;
  }
      .table th:last-child,
      .table td:last-child {
        border-right: none;
      }
      .table thead th {
        background-color: #f2f2f2;
        font-weight: bold;
        font-size: 7pt;
      }
      .table {
        border: 1px solid #000;
      }
      .table-img-cell {
        text-align: center;
      }
      .table-img {
        width: 50px;
        height: 80px;
        display: inline-block;
        vertical-align: middle;
      }
  
  
  .summary-table,
      .payment-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 10px;
        font-size: 10px;
      }
      .summary-table th,
      .summary-table td,
      .payment-table th,
      .payment-table td {
        border: 1px solid #000;
        padding: 4px;
        text-align: right;
      }
      .summary-table th,
      .payment-table th {
        background-color: #f2f2f2;
      }
      .payment-table th,
      .payment-table td {
        text-align: center;
      }
      h3 {
        font-size: 12px;
        margin-top: 10px;
        margin-bottom: 5px;
        background-color: #f2f2f2;
        padding: 4px;
      }
  
  
      .company-info {
  height: 100px;
    margin-left: 7px;
    width: 100%;
    border-collapse: collapse;
    font-size: 10px;
    border-spacing: 0; 
  }
  
  .company-info tr {
    margin: 0;
    padding: 0;
    line-height: 0.4;
  }
  
  .company-info tr td {
    vertical-align: top;
    padding: 0;
    margin: 0; 
  }
  
  .company-info td:first-child {
    width: 20%;
    text-align: left;
  }
  
  .company-info td:last-child {
    text-align: left;
    font-weight: bold;
  }
    `;

    return (
      <div ref={ref} style={{ padding: "20px" }}>
        <section
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          <div style={{ display: "flex" }}>
            <Image
              src="/assets/blosson-logo.png"
              alt="logo de blosson"
              width={160}
              height={120}
            />
            <table className="company-info">
              <tbody>
                <tr>
                  <td>RUC</td>
                  <td>: XXXXXXXXXX</td>
                </tr>
                <tr>
                  <td>DIRECCIÓN</td>
                  <td>: Avenida industrial 1086 Lima, Lima, Peru</td>
                </tr>
                <tr>
                  <td>Teléfono</td>
                  <td>: +51 955246018</td>
                </tr>
                <tr>
                  <td>Correo</td>
                  <td>: shakha969@gmail.com</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              border: "3px solid #000",
              padding: "9px 29px",
              borderRadius: "12px",
              height: "130px",
            }}
          >
            <h2 style={{ color: "#000" }}>COTIZACIÓN</h2>
            <p style={{ color: "red" }}>OCBE-OOOOOO19</p>
          </div>
        </section>

        <b style={{ textAlign: "center" }}>INFORMACIÓN GENERAL</b>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            border: "1px solid #000",
            borderRadius: "6px",
            padding: "6px",
            marginBottom: "6px",
            fontSize: "12px",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              <tr>
                <td style={{ padding: "3px", textAlign: "left", width: "32%" }}>
                  CLiente
                </td>
                <th style={{ padding: "3px", textAlign: "left" }}>
                  {" "}
                  : BLOSSOM RENTALS
                </th>
              </tr>
              <tr>
                <td style={{ padding: "3px", textAlign: "left", width: "32%" }}>
                  Fecha de Pedido
                </td>
                <th style={{ padding: "3px", textAlign: "left" }}>
                  {" "}
                  : 01/09/2024
                </th>
              </tr>
              <tr>
                <td style={{ padding: "3px", textAlign: "left", width: "32%" }}>
                  Fecha de Entrega
                </td>
                <th style={{ padding: "3px", textAlign: "left" }}>
                  {" "}
                  : {new Date().toLocaleString()}
                </th>
              </tr>
            </tbody>
          </table>

          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              <tr>
                <td style={{ padding: "3px", textAlign: "left", width: "32%" }}>
                  Vendedor
                </td>
                <th style={{ padding: "3px", textAlign: "left" }}>
                  {" "}
                  : Jorge Luna
                </th>
              </tr>
              <tr>
                <td style={{ padding: "3px", textAlign: "left", width: "32%" }}>
                  Dirección de Entrega
                </td>
                <th style={{ padding: "3px", textAlign: "left" }}>
                  {" "}
                  : AV las Torres Huachipa
                </th>
              </tr>
            </tbody>
          </table>
        </div>

        <b style={{ textAlign: "center" }}>INFORMACIÓN DE LOGISTICA</b>
        <div
          style={{
            display: "flex",
            paddingLeft: "8px",
            border: "1px solid #000",
            borderRadius: "6px 6px 0px 0px",
            padding: "6px",
            marginBottom: "8px",
            fontSize: "12px",
          }}
        >
          <div style={{ marginRight: "30px" }}>
            <p>
              Direción de Entrega <b>: AV24 Los Laureles La Molina</b>
            </p>
            <p>El vendedor es responsable del transporte del producto</p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              width: "30%",
            }}
          >
            <div style={{ marginRight: "15px" }}>
              <p>Entrega</p>
              <p style={{ color: "#7f12cc" }}>21/09/2024. 10:20</p>
            </div>

            <div>
              <p>Devolución</p>
              <p style={{ color: "#7f12cc" }}>24/10/2024. 13:00</p>
            </div>
          </div>
        </div>

        <style jsx>{estilos}</style>
        <table className="table">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Item</th>
              <th>Cant.</th>
              <th>Precio Unit.</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3].map((num) => (
              <tr key={num}>
                <td>
                  <Image
                    src={`/assets/portico${num}.${num <= 2 ? "PNG" : "png"}`}
                    alt="Imagen del Producto"
                    width={130}
                    height={100}
                    className="table-img"
                  />
                </td>
                <td className="items">
                  PORTICO SELENA <br />
                  2 EN 1 ROSADO <br />
                  1.20 mts (ancho) x 2 mts (alto)
                </td>
                <td>10</td>
                <td style={{ textAlign: "right" }}>20.00</td>
                <td style={{ textAlign: "right" }}>200.00</td>
              </tr>
            ))}
          </tbody>
        </table>
        <table className="summary-table">
          <tbody>
            <tr>
              <th>SUBTOTAL DEL PEDIDO (S/)</th>
              <td>{subtotal.toFixed(2)}</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th>(No considera la tasa de flete) DESCUENTO (%)</th>
              <td>0%</td>
            </tr>
            <tr>
              <th>DESCUENTO (S/)</th>
              <td>{discount.toFixed(2)}</td>
            </tr>
            <tr>
              <th>TOTAL GENERAL (S/)</th>
              <td>{total.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>

        <h3
          style={{
            marginTop: "20px",
            backgroundColor: "#f2f2f2",
            padding: "8px",
          }}
        >
          CUOTAS DE PAGOS
        </h3>
        <table className="payment-table">
          <thead>
            <tr>
              <th>VALOR DE COMPRA</th>
              <th>EXTRAS</th>
              <th>VALOR TOTAL</th>
              <th>VALOR PAGADO</th>
              <th>VALOR PENDIENTE</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>S/ {total.toFixed(2)}</td>
              <td>S/ 0.00</td>
              <td>S/ {total.toFixed(2)}</td>
              <td>S/ 0.00</td>
              <td>S/ {total.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
        <div style={{ lineHeight: ".2" }}>
          <h4>Consideraciones:</h4>
          <ul style={{ lineHeight: "1.4" }}>
            <li>
              El cliente asumirá los costos de refacción o compra a los
              artículos dañados.
            </li>
            <li>
              El cliente asumirá los costos de refacción o compra a los
              artículos dañados.
            </li>
            <li>
              El cliente asumirá los costos de refacción o compra a los
              artículos dañados.
            </li>
          </ul>
        </div>
      </div>
    );
  }
);
