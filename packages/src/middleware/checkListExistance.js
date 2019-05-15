const Checklist = require('../models/checkListModel');

module.exports = async (req,res,next) => {
    try {
        console.log('1')
        const checklist = await Checklist.findById(req.params.id); //jesli id nie poprawne to wyjątek, jesli poprawne ale nie istniejące to null
        if (!checklist) return res.status(404).send(`Checklist does not exist.`);

        req.checklist = checklist;
        next();

    } catch(ex) { //wywoła się w przypadku przekazania nie poprawnego id
        return res.status(404).send('Syntactically wrong id.');
    }
}