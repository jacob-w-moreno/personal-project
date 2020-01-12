module.exports = {
    addTrans: async(req, res) => {
        const {catId,name,amount,category,type,newBalance} = req.body;
        const db = req.app.get('db');
        await db.trans_post({catId,name,amount,category,type});
        await db.cat_put({newBalance, catId})
        res.sendStatus(200);
    },
    distribute: async(req, res) => {
        const {added, id} = req.body;
        const db = req.app.get('db');
        db.cat_put_inc({added, id})
        res.sendStatus(200);
    },
    addInc: async(req, res) => {
        const{name, amount, type} = req.body;
        let catId=null;
        let category=null;
        const db = req.app.get('db');
        db.trans_post({catId, name, amount, category, type})
        res.sendStatus(200);
    },
    getTrans: async(req, res) => {
        const db = req.app.get('db');
        let trans = await db.trans_get();
        res.status(200).send(trans)
    }
}