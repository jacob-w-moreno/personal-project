module.exports = {
    addCat: async(req, res) => {
        const {name, amount, type, overflow} = req.body;
        const users_id = 9;
        const db = req.app.get('db');
        let cat = await db.cat_post({name, amount, type, users_id});
        if (type === 'Percentage') {
            console.log('overfow:', overflow);
            await db.cat_put_overflow({overflow});
        }
        res.status(200).send(cat);
    },
    addOverflow: async(req, res) => {
        const {overflowTotal} = req.body;
        const users_id = 9;
        const db = req.app.get('db');
        let overflow = await db.cat_post_overflow({overflowTotal, users_id});
        res.status(200).send(overflow);
    },
    getCat: async(req, res) => {
        const users_id = 9;
        const db = req.app.get('db');
        let cats = await db.cat_get({users_id});
        res.status(200).send(cats)
    },
    editCat: async(req, res) => {
        const users_id = 9;
        const db = req.app.get('db');
        const {name, balance, allocated, categoryID} = req.body;
        await db. cat_put({name, balance, allocated, users_id, categoryID});
        res.sendStatus(200);
    },
    deleteCat: async(req, res) => {
        const {id} = req.params;
        const db = req.app.get('db');
        await db.cat_delete(id);
        res.sendStatus(200)
    }
}