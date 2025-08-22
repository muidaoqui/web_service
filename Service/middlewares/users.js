const validBodyRequest = (schema) => (req, res, next) =>{
    try{
        const data = schema.parse(req.body);
        req.body = data;
        next();
    }catch(err){
        res.status(400).json({ error: err.errors });d
    }
}