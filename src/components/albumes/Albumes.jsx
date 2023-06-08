import { AlbumesService } from "./../services/albumes.service";
import React, { useState, useEffect } from "react";
import moment from "moment";
import AlbumesBuscar from "./AlbumesBuscar";
import AlbumesListado from "./AlbumesListado";
import AlbumesRegistro from "./AlbumesRegistro";

function Albumes() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };
  const [AccionABMC, setAccionABMC] = useState("L");

  const [Titulo, setTitulo] = useState("");
  const [Activo, setActivo] = useState("");

  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null); // usado en BuscarporId (Modificar, Consultar)
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [Pagina, setPagina] = useState(1);
  const [Paginas, setPaginas] = useState([]);

  async function Buscar(_pagina) {
    if (_pagina && _pagina !== Pagina) {
      setPagina(_pagina);
    }
    // OJO Pagina (y cualquier estado...) se actualiza para el proximo render, para buscar usamos el parametro _pagina
    else {
      _pagina = Pagina;
    }

    const data = await AlbumesService.Buscar(Titulo, _pagina);
    setItems(data.Items);
    setRegistrosTotal(data.RegistrosTotal);

    //generar array de las páginas para mostrar en select del paginador
    const arrPaginas = [];
    for (let i = 1; i <= Math.ceil(data.RegistrosTotal / 10); i++) {
      arrPaginas.push(i);
    }
    setPaginas(arrPaginas);
  }

  async function BuscarPorId(item, accionABMC) {
    const data = await AlbumesService.BuscarPorId(item);
    setItem(data);
    setAccionABMC(accionABMC);
  }

  function Consultar(item) {
    BuscarPorId(item, "C"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }
  function Modificar(item) {
    BuscarPorId(item, "M"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }

  function Agregar() {
    setAccionABMC("A");
    setItem({
      IdAlbum: 0,
      Titulo: null,
      Artista: null,
      FechaLanzamiento: moment(new Date()).format("YYYY-MM-DD"),
    });
  }

  function Imprimir() {
    alert("En desarrollo...");
  }

  async function Grabar(item) {
    // agregar o modificar
    try {
      await AlbumesService.Grabar(item);
    } catch (error) {
      alert(error?.response?.data?.message ?? error.toString());
      return;
    }
    await Buscar();
    Volver();

    setTimeout(() => {
      alert(
        "Registro " +
          (AccionABMC === "A" ? "agregado" : "modificado") +
          " correctamente."
      );
    }, 0);
  }

  // Volver/Cancelar desde Agregar/Modificar/Consultar
  function Volver() {
    setAccionABMC("L");
  }

  return (
    <div>
      <div className="tituloPagina">
        Albumes <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      <AlbumesBuscar
        Titulo={Titulo}
        setTitulo={setTitulo}
        Activo={Activo}
        setActivo={setActivo}
        Buscar={Buscar}
        Agregar={Agregar}
      />

      {/* Tabla de resutados de busqueda y Paginador */}
      <AlbumesListado
        {...{
          Items,
          Consultar,
          Modificar,
          Imprimir,
          Pagina,
          RegistrosTotal,
          Paginas,
          Buscar,
        }}
      />

      <div className="alert alert-info mensajesAlert">
        <i className="fa fa-exclamation-sign"></i>
        No se encontraron registros...
      </div>

      {/* Formulario de alta/modificacion/consulta */}
      <AlbumesRegistro {...{ AccionABMC, Item, Grabar, Volver }} />
    </div>
  );
}
export { Albumes };
