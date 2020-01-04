module.exports = {
    addCat: async(req, res) => {
        const {name, amount, type} = req.body;
        const db = req.app.get('db');
        let catDoll = await db.cat_post({name, amount, type});
        res.status(200).send(catDoll);
    },
    getCat: async(req, res) => {
        const db = req.app.get('db');
        let cats = await db.cat_get();
        res.status(200).send(cats)
    },
    deleteCat: async(req, res) => {
        const {id} = req.params;
        const db = req.app.get('db');
        db.cat_delete(id);
        res.sendStatus(200)
    }
}