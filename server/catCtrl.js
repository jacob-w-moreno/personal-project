module.exports = {
    addCat: async(req, res) => {
        const {name, amount, type} = req.body;
        const db = req.app.get('db');
        let catDoll = await db.add_cat({name, amount, type});
        res.status(200).send(catDoll);
    },
    getCat: async(req, res) => {
        const db = req.app.get('db');
        let cats = await db.get_cat_doll();
        res.status(200).send(cats)
    }
}