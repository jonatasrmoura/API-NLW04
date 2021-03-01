// Email fack para teste de envio de email. essa parte do código se encontra na documentação do nodemailer

import nodemailer, { Transporter } from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';

class SendMailService {
    private client: Transporter;

    constructor() {
        nodemailer.createTestAccount().then(account => {
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass,
                }
            });

            // Com isso posso usar todo o meu transporter dentro da minha função execute();
            this.client = transporter;
        });
    }

    async execute(to: string, subject: string, variables: object, path: string) {
        // leitura do arquivo npsMail.hbs

        const templateFileContent = fs.readFileSync(path).toString('utf-8');

        const mailTemplateParse = handlebars.compile(templateFileContent);

        // variáveis que minha aplicação vai receber no arquivo de email (npsMail.hbs)

        const html = mailTemplateParse(variables);

        const message = await this.client.sendMail({
            // para quem eu quero enviar
            to,
            // qual é o assunto
            subject,
            // corpo da mensagen
            html,
            // de onde está vindo esse email
            from: 'NPS <noreplay@nps.com.br>',
        });

        console.log('Message sent: %s', message.messageId);

        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }
}

export default new SendMailService();
