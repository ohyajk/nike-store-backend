import SparkPost from 'sparkpost';
const client = new SparkPost(process.env.SPARKPOST_API_KEY);

const sendMail = (email, firstName) => {
    client.transmissions.send({
        options: {
            sandbox: false
        },
        content: {
            from: 'nikestore@mailer.jitenderkumar.in',
            subject: `Hello, ${firstName}`,
            html: `<html><body><h1>Welcome To nikeStore ${firstName}</h1><p>Thankyou for registering on nikestore...😍!</p></body></html>`
        },
        recipients: [
            { address: email }
        ]
    })
        .then(data => {
            console.log('Woohoo! You just sent your first mailing!');
            console.log(data);
        })
        .catch(err => {
            console.log('Whoops! Something went wrong');
            console.log(err);
        });
}
export default sendMail;