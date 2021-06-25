import mailer from '../core/mailer'
import {SendMessageInfo} from 'nodemailer/lib/sendmail-transport'

interface SendEmailProps: {
    emailFrom: string,
    emailTo: string,
    subject: string,
    html: string
    callback?: (err: Error | null, info: SendMessageInfo) => void
}

export const sendEmail = ({emailFrom, emailTo, subject, html, callback}) => {
     mailer.sendMail({
            from: emailFrom,
            to: emailTo,
            subject: subject,
            html: html
          }, callback || function(err: Error | null, info: SendMessageInfo){
              if(err) {
                console.log(err)
              } else {
                console.log(info)
              }
          })
}