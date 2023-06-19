import axios from "axios";

const urlResource = "http://localhost:4000/api/jugadores";

async function Buscar(Nombre) {
  try {
    const resp = await axios.get(urlResource, {
      params: { Nombre },
    });
    console.log(resp);
    console.log(resp.data);
    return resp.data;
  } catch (error) {
    console.log(error);
    throw new Error("Ha ocurrido un error al buscar el Nombre.");
  }
}

async function BuscarPorId(item) {
  try {
    const resp = await axios.get(urlResource + "/" + item.IdJugador);
    console.log(resp.data);
    return resp.data;
  } catch (error) {
    console.log(error);
    throw new Error("Ha ocurrido un error al buscar el Jugador por ID.");
  }
}

async function Grabar(item) {
  console.log(item);
  try {
    if (!item.IdJugador) {
      const resp = await axios.post(urlResource, item);
      return resp.data;
    } else {
      await axios.put(urlResource + "/" + item.IdJugador, item);
    }
  } catch (error) {
    console.log(error);
    throw new Error(
      "Ha ocurrido un error al grabar el Jugador en la base de datos."
    );
  }
}

async function Eliminar(id) {
  try {
    await axios.delete(urlResource + "/" + id);
  } catch (error) {
    console.log(error);
    throw new Error("Ha ocurrido un error al eliminar el Album");
  }
}

export const JugadoresService = {
  Buscar,
  BuscarPorId,
  Grabar,
  Eliminar,
};
