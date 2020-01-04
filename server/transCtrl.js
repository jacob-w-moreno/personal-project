module.exports = {
    getTrans: async(req, res) => {
        const {id} = req.params;
        const db = req.app.get('db');
        let total = db.get_Trans(id);
    }
}