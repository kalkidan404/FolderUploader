exports.home = (req, res) => {

    res.render("index", {
        user: req.user
    });

};