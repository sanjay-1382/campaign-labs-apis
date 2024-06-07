import app from '../../app';
let port = process.env.CL_PORT || '80';

app.listen(port, () => {
    console.log(`Running at port: ${port}`)
});