import { Request, Response } from "express";
import { knex } from "../bancondedados/conexao";

export const listarCarros = async (req: Request, res: Response) => {
    try {
        const listagem: {}[] = await knex('carros');

        return res.status(200).json(listagem);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensagem: "Erro no servidor" })
    }
}

export const detalharCarro = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const listagem: {} = await knex('carros').where({ id }).first();

        if (!listagem) {
            return res.status(404).json({ mensagem: "Carro não encontrado!" })
        }

        return res.status(200).json(listagem);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensagem: "Erro no servidor" })
    }
}

export const cadastrarrCarros = async (req: Request, res: Response) => {
    const { marca, modelo, ano, cor, valor } = req.body;

    if (!marca || !modelo || !ano || !cor || !valor) {
        return res.status(500).json({ mensagem: "As propriedades marca, modelo, ano, cor, valor são obrigatórias" })
    }

    try {
        const carroCadastrado: {}[] = await knex('carros').insert({ marca, modelo, ano, cor, valor }).returning("*");

        return res.status(201).json(carroCadastrado);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensagem: "Erro no servidor" })
    }
}

export const atualizarCarros = async (req: Request, res: Response) => {
    const { marca, modelo, ano, cor, valor } = req.body;
    const { id } = req.params;

    if (!marca || !modelo || !ano || !cor || !valor) {
        return res.status(500).json({ mensagem: "As propriedades marca, modelo, ano, cor, valor são obrigatórias" })
    }

    try {
        const carroEncontrado: {} = await knex('carros').where({ id }).first();

        if (!carroEncontrado) {
            return res.status(404).json({ mensagem: "Carro não encontrado!" })
        }

        const carroAtualizado: {}[] = await knex('carros').where({ id }).update({ marca, modelo, ano, cor, valor }).returning("*");

        return res.status(200).json(carroAtualizado);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensagem: "Erro no servidor" })
    }

}

export const excluirCarros = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const carroEncontrado: {} = await knex('carros').where({ id }).first();

        if (!carroEncontrado) {
            return res.status(404).json({ mensagem: "Carro não encontrado" })
        }

        await knex('carros').delete().where({ id });

        return res.status(200).json({ mensagem: "Carro excluido com sucesso" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensagem: "Erro no servidor!" })
    }
}
