module.exports = {
    addCat: async(req, res) => {
        const {name, amount, type} = req.body;
        const {users_id} = req.session.user;
        const db = req.app.get('db');
        let cat = await db.cat_post({name, amount, type, users_id});
        res.status(200).send(cat);
    },
    getCat: async(req, res) => {
        const {users_id} = req.session.user;
        console.log(users_id);
        const db = req.app.get('db');
        let cats = await db.cat_get({users_id});
        res.status(200).send(cats)
    },
    deleteCat: async(req, res) => {
        const {id} = req.params;
        const db = req.app.get('db');
        db.cat_delete(id);
        res.sendStatus(200)
    }
}