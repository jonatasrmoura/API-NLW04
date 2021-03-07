import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

class AnswerController {

    //http://localhost:3336/answers/6?u=c6cdadcf-03bc-4b50-9e43-84a2940078f1
    /**
     * Route Params => Parâmetros que compôe a rota
     * - são os parâmetros que vêm na rota -
     * ex: routes.get("/answers/:value");
     * 
     * Query Params => Buscam Paginação, são parâmetros não obrigatórios, para identificar um query params,
     * ele sempre vai vim depois do ponto de interogação ?,
     * e a composisão dele é chave=valor -> ex: (?u=c6cdadcf-03bc-4b50-9e43-84a2940078f1)
     */

    async execute(request: Request, response: Response) {
        const { value } = request.params;
        const { u } = request.query;

        const surveyUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveyUser = await surveyUsersRepository.findOne({
            id: String(u),
        });

        if (!surveyUser) {
            return response.status(400).json({
                error: 'Survey User does not exists!',
            });
        }

        surveyUser.value = Number(value);

        await surveyUsersRepository.save(surveyUser);
        
        return response.json(surveyUser);
    }
}

export { AnswerController };