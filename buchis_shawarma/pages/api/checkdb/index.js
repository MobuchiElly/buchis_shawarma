import dbConnect from '@/utils/mongodb';

const myfunc = async function GET(req, res) {

 try{
    const con = await dbConnect();
    return (res.status(200).send('connected to server'));
 } catch(err) {
    console.error(err, 'Failed to connect')
 }
}

export default myfunc;
