import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';
import * as yup from 'yup';
import { AppError } from '../errors/AppErrors';
export class UsersController {
    async create(request: Request, response: Response) {
        const { name, email } = request.body;

        // Validando Campos de criação de usuário

        const schema = yup.object().shape({
            name: yup.string().required('Nome é obrigatório'),
            email: yup.string().email().required('E-mail incorreto'),
        });

        try {
            await schema.validate(request.body, { abortEarly: false }); // rodar todas as validações
        } catch (err) {
            throw new AppError(err);
        }

        // Entidade do usuário

        const usersRepository = getCustomRepository(UsersRepository);

        // SELECT * FROM USERS WHERE EMAIL = "EMAIL"
        const userAlreadyExists = await usersRepository.findOne({
            email
        });

        if (userAlreadyExists) {
            throw new AppError('[ERRO]: E-mail Address already exists!');
        }

        const user = usersRepository.create({
            name, email,
        });

        await usersRepository.save(user);

        return response.status(201).json(user);
    }
}