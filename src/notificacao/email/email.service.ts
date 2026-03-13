import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import sgMail from '@sendgrid/mail';


@Injectable()
export class EmailService { 
    constructor(private readonly config: ConfigService){
        const key = config.get<string>('SENDGRID_API_KEY');
        if(key) {
            sgMail.setApiKey(key)
        }   
    }
    

    async sendEmail(){
        try {
        const msg = {
          to: 'mayconrodriguesrosat@gmail.com', 
          from: 'maycontiestudos01@gmail.com', 
          subject: 'Sending with SendGrid is Fun',
          text: 'and easy to do anywhere, even with Node.js',
          html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        }
        await sgMail.send(msg)
        } catch (error) {
            console.log(error)
        }

    }


}


