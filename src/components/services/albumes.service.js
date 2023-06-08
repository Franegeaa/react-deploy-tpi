import axios from "axios";

const urlResource = "http://localhost:4000/api/albumes";

async function Buscar(Titulo, Pagina) {
  const resp = await axios.get(urlResource, {
    params: { Titulo, Pagina },
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await axios.get(urlResource + "/" + item.IdAlbum);
  return resp.data;
}

async function Grabar(item) {
  if (item.IdAlbum === 0) {
    await axios.post(urlResource, item);
  } else {
    await axios.put(urlResource + "/" + item.IdAlbum, item);
  }
}

export const AlbumesService = {
  Buscar,
  BuscarPorId,
  Grabar,
};
