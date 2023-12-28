import cookie from 'cookie';

const handler = (req, res) => {
  const { method } = req;


    if (req.method === 'POST') {
    const { username, password } = req.body;
//     console.log(username);
//     console.log(password);
//   console.log(process.env.ADMIN_USERNAME);
//   console.log(process.env.ADMIN_PASSWORD);
    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
        const secureCookie = process.env.NODE_ENV === 'production' ? true : false;

        res.setHeader('Set-Cookie', cookie.serialize('token', process.env.TOKEN, {
        maxAge: 60 * 60,
        sameSite: 'strict',
        path: '/',
        secure: secureCookie,
        }));
        res.status(200).json({ message: 'successful' });
    } else {
        res.status(400).json({ error: 'wrong credentials' });
    }
    };
}
export default handler;