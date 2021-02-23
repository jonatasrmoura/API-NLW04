import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

@Entity('users')
export class User {
    @PrimaryColumn('uuid')
    readonly id: string; // Não vou deixar quem estiver tendo informação do usuário ex: controller consiga mudar esse id

    @Column()
    name: string;

    @Column()
    email: string;

    @CreateDateColumn()
    created_at: Date;


    /**
     * Verificar se é diferente do id,porque vou ter dois cenários, um é a criação de um objeto e outro é a edição
     * de um objeto, então quando eu estiver criando um usuário eu quero criar um id que até então eu não tenho,
     * só que quando eu estiver editando eu quero que a entidade utilize o id que ela já tem como padrão,
     * Então se esse id não existir eu quero que esse id tenha o valor de uuid
    */
    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}
