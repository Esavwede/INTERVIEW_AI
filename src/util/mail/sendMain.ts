

import logger from '@src/system/logger/logger';
import FormData from 'form-data';
import Mailgun from 'mailgun.js';
import { ServerError } from '../Errors/Endpoints/serverError';


const mailgun = new Mailgun(FormData);


const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY || 'key-yourkeyhere'
});


export async function sendMail( mailOptions: { email: string, html: string, subject: string, text: string } )
{
    try 
    {

       const { email, subject, text, html } = mailOptions
      
       const MAIL_URL = process.env.ENV_SIGNUP_MAIL_URL || 'sandboxe7bb68fd69ec47c8b3bc14a21fab66ed.mailgun.org'
       const MAIL_SENDER = process.env.ENV_SIGNUP_MAIL_SENDER || 'mailgun@sandboxe7bb68fd69ec47c8b3bc14a21fab66ed.mailgun.org'

       const result = await  mg.messages.create( MAIL_URL, {
            from: `Interview AI <${MAIL_SENDER}>`,
            to: [ email],
            subject,
            text,
            html
          })
        

          logger.info( result ) 
    }
    catch(e: any ) 
    {
        logger.error(e,"Error Occured While Sending Mail") 
        throw new ServerError("Error Occured While Sending Mail")
    }
}
