const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: Boolean(Number(process.env.SMTP_SECURE)),
    requiresAuth: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
})

function isInvalidPayload(payload) {
    return !payload.name || !payload.email || !payload.message || !payload.subject
}

function getEmailContent(payload, noHtml) {
    let content = ''
    const lb = noHtml ? '\n' : '<br>'

    if (!noHtml) {
        content += '<h2>'
    }

    // TODO: i18n
    content += 'Informations de contact'

    if (!noHtml) {
        content += '</h2>'
    }

    content += lb

    content += 'Email : ' + payload.email + lb
    content += 'Nom : ' + payload.name + lb
    content += 'Type de demande : ' + payload.subject + lb

    content += 'Message : ' + payload.message

    return content
}

exports.handler = function(event, context, callback) {
    // only allow POST requests
    if (event.httpMethod !== 'POST') {
        return callback(null, {
            statusCode: 410,
            body: JSON.stringify({
                message: 'Only POST requests allowed.',
            }),
        })
    }

    // parse the body to JSON so we can use it in JS
    const payload = JSON.parse(event.body)

    // validate the form
    if (isInvalidPayload(payload)) {
        return callback(null, {
            statusCode: 422,
            body: JSON.stringify({
                message: 'Required information is missing.',
            }),
        })
    }

    const mailOptions = {
        // TODO: Use env variable
        from: 'noreply@example.com',
        // TODO: Use env variable
        to: 'noreply@example.com',
        // TODO: Use env variable to get domain
        // TODO: i18n
        subject: '[example.com] Nouvelle demande de contact',
        text: getEmailContent(payload, true),
        html: getEmailContent(payload),
    }

    // finally everything is fine and we can send the mail
    transport.sendMail(mailOptions, (error, info) => {
        // if there happenend an error on the postmark side we send a 500 error to the client
        if (error) {
            return callback(null, {
                statusCode: 500,
                body: JSON.stringify({
                    message: 'Internal Server Error: ' + error,
                }),
            })
        }
        // if everything was fine we send status code 200
        return callback(null, {
            statusCode: 200,
            body: JSON.stringify({
                message: `Message sent successfully : ${info.messageId}`,
            }),
        })
    })
}
