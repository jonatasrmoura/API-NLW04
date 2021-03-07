/**
 * @fileoverview Fazer o calculo do NPS
 */

import { Request, Response } from "express";
import { getCustomRepository , Not, IsNull} from "typeorm";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

class NpsController {

    /**
     * nota: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10.
     * Existem três identificadores:
     * Detratores => Notas consideradas de 0 á 6
     * Passivos => que são de 7 á 8
     * Promotores => tão nota 9 ou 10
     * 
     * (Número de promotores - número de detratores) / (número de respondentes) * 100
     */

    async execute(request: Request, response: Response) {
        const { survey_id } = request.params;

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveysUsers = await surveysUsersRepository.find({
            survey_id,
            value: Not(IsNull()), // Porque tem usuário que ainda não respondeu
        });

        // Filtrar os campos que são Detratores, Passivos e Promotores

        const detractor = surveysUsers.filter(survey => 
            (survey.value >= 0 && survey.value <= 6)
        ).length; // pegar o valor

        const promoters = surveysUsers.filter(survey =>
            (survey.value >= 9 && survey.value <= 10)
        ).length; // pegar o valor;

        // Pegar os passivos só para mostrar para o usuário o retorno (passivos não fazem parte do calculo de NPS)

        const passive = surveysUsers.filter(survey => 
            (survey.value >= 7 && survey.value <= 8)
        ).length; // pegar o valor;

        const totalAnswers = surveysUsers.length;

        // Rotando o calculo NPS

        const calculate = Number(
            (((promoters - detractor) / totalAnswers) * 100).toFixed(2) // trazer duas casas depois do ponto
        );

        return response.json({
            detractor,
            promoters,
            passive,
            totalAnswers,
            nps: calculate,
        })
    }
}

export {NpsController};