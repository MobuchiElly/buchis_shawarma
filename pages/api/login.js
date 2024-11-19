import cookie from 'cookie';

const handler = async (req, res) => {
    const body = req.body;  
    if (req.method === 'POST') {
        const { token } = req.body;
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized attempt to login as admin' });
          }
        try {
            const secureCookie = process.env.NODE_ENV === 'production' ? true : false;
            const tokenString = JSON.stringify(token);
            res.setHeader('Set-Cookie', cookie.serialize('token', tokenString, {
                maxAge: 60 * 60,
                sameSite: 'strict',
                path: '/',
                secure: secureCookie,
            }))
            res.status(200).json({ message: 'Token set successfully' });
        } catch (error) {
            res.status(400).json('error encountered when trying to set cookie');
        }
    }
};

export default handler;