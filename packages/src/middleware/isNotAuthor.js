module.exports = (req, res, next) => {
    //sprawdza czy użytkownik jest autorem, jesli TAK, to domawia dostępu
    const isNotAuthor = req.checklist.authorId === req.user._id;
    if (isNotAuthor) return res.status(403).send('Access denied - author cannot unsubscribe from own checklist. Delete it instead.');

    next();
}