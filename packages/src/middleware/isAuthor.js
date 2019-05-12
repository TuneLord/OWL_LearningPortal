module.exports = (req, res, next) => {
    //sprawdza czy użytkownik jest autorem, jesli nie to odmawia dostepu
    const isAuthor = req.checklist.authorId === req.user._id;
    if (!isAuthor) return res.status(403).send('Access denied - not an owner.');

    next();
}