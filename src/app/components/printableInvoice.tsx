import React from "react";
import Image from "next/image";

const PrintableInvoice = () => {

  const estilos = `
    .tabla-mejorada {
      border-collapse: separate;
      border-spacing: 0;
      width: 100%;
    }
    .tabla-mejorada th,
    .tabla-mejorada td {
      border-right: 1px solid #ddd;
      padding: 8px;
      text-align: center;
      vertical-align: middle;
    }
    .tabla-mejorada th:last-child,
    .tabla-mejorada td:last-child {
      border-right: none;
    }
    .tabla-mejorada thead th {
      background-color: #f2f2f2;
      font-weight: bold;
    }
  `;


  return (
    <div style={{ padding: "20px" }}>
      <section style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <Image
            src="/assets/blosson-logo.png"
            alt="logo de blosson"
            width={180}
            height={130}
          />
          <p style={{ fontSize: "14px" }}>RUC: 2051774876</p>
          <p style={{ fontSize: "14px" }}>DIRECCÓN: AV las Torres Huachipa</p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            border: "3px solid #ff89f1",
            padding: "9px 29px",
            borderRadius: "12px",
            height: "150px",
          }}
        >
          <h2 style={{ color: "#ff89f1" }}>COTIZACIÓN</h2>
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
                Proveedor
              </td>
              <th style={{ padding: "3px", textAlign: "left" }}>
                {" "}
                : PLATAFORMA CTU
              </th>
            </tr>
            <tr>
              <td style={{ padding: "3px", textAlign: "left", width: "32%" }}>
                RUC
              </td>
              <th style={{ padding: "3px", textAlign: "left" }}>
                {" "}
                : 2051774876
              </th>
            </tr>
            <tr>
              <td style={{ padding: "3px", textAlign: "left", width: "32%" }}>
                Telefono
              </td>
              <th style={{ padding: "3px", textAlign: "left" }}>
                {" "}
                : 987654321
              </th>
            </tr>
            <tr>
              <td style={{ padding: "3px", textAlign: "left", width: "32%" }}>
                Correo
              </td>
              <th style={{ padding: "3px", textAlign: "left" }}>
                {" "}
                : ctuejem@ctu.pe
              </th>
            </tr>
          </tbody>
        </table>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
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
                Dirección
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
          justifyContent: "space-around",
          border: "1px solid #000",
          borderRadius: "6px",
          padding: "6px",
          marginBottom: "6px",
          fontSize: "12px",
        }}
      >
        <div>
          <h4>DIRECIÓN DE ENTREGA</h4>
          <p>El vendedor es responsable del transporte del producto</p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "30%",
          }}
        >
          <div>
            <p>Entrega</p>
            <p style={{ color: "#7f12cc" }}>
              {new Date().toLocaleDateString()}
            </p>
          </div>

          <div>
            <p>Devolución</p>
            <p style={{ color: "#7f12cc" }}>24/10/2024</p>
          </div>
        </div>
      </div>

      <style jsx>{estilos}</style>
      <table className="tabla-mejorada">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Item</th>
            <th>QTD</th>
            <th>Precio Unitario</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4].map((num) => (
            <tr key={num}>
              <td>
                <Image
                  src={`/assets/portico${num}.${num <= 2 ? 'PNG' : 'png'}`}
                  alt="Imagen del Producto"
                  width={130}
                  height={100}
                />
              </td>
              <td>Nombre del Producto</td>
              <td>10</td>
              <td>$20.00</td>
              <td>$200.00</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p
        style={{
          borderTop: "2px solid black",
          textAlign: "center",
          width: "300px",
          marginLeft: "3rem",
        }}
      >
        V.B AUTORIZACION
      </p>
    </div>
  );
});

export default PrintableInvoice;

