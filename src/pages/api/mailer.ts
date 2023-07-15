import type { NextApiRequest, NextApiResponse } from 'next'
const nodemailer = require("nodemailer");

export default function handler(req: NextApiRequest,res: NextApiResponse) {

    if(req.method == "POST"){

        const transporter = nodemailer.createTransport({
        host: "smtp.forwardemail.net",
        port: 465,
        secure: true,
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: 'REPLACE-WITH-YOUR-ALIAS@YOURDOMAIN.COM',
            pass: 'REPLACE-WITH-YOUR-GENERATED-PASSWORD'
        }
        });

        const main = async () => {
        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: "bar@example.com, baz@example.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        //
        // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
        //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
        //       <https://github.com/forwardemail/preview-email>
        //
        }
        main().catch(console.error);
        res.status(200).json({ name: 'John Doe' })
    }
}
