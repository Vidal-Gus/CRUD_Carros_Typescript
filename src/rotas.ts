import { Router } from "express";
import {
    atualizarCarros,
    cadastrarrCarros,
    detalharCarro,
    excluirCarros,
    listarCarros
} from "./controladores/carros";

const rotas = Router();

rotas.get('/carros', listarCarros);
rotas.get('/carros/:id', detalharCarro);
rotas.put('/carros/:id', atualizarCarros);
rotas.post('/carros', cadastrarrCarros);
rotas.delete('/carros/:id', excluirCarros);

export default rotas;