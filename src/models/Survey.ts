import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

@Entity('surveys')
class Survey {
    @PrimaryColumn('uuid')
    readonly id: string; // Não vou deixar quem estiver tendo informação do usuário ex: controller consiga mudar esse id

    @Column()
    title: string;

    @Column()
    description: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { Survey }
