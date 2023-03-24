const { SUBSCRIPTION } = require("./in-memory-db");

exports.addSubscription = (req, res) => {

    
    SUBSCRIPTION.push(req.body);
    console.log("usuario inscrito com sucesso");
    res.status(200).json({message: 'Usuario inscrito com sucesso!'});
}