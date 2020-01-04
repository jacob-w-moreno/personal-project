const bcrypt = require('bcryptjs');

module.exports = {
    register: async(req, res) => {
        const {email, password} = req.body;
        const {session} = req;
        const db = req.app.get('db');

        let user = await db.user_get(email);
        user = user[0];
        if(user){
            return res.status(400).send('A user with that email already exists. Please log in.')
        }
        const salt = bcrypt .genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        let newUser = await db.user_register({email, hash});
        newUser = newUser[0];
        session.user = newUser;
        res.status(200).send(session.user);
    },
    login: async(req, res) => {
        const {email, password} = req.body;
        const {session} = req;
        const db = req.app.get('db');

        let user = await db.user_get(email);
        user = user[0];
        if(!user){
            return res.status(400).send('Email not found');
        }
        const authenticated = bcrypt.compareSync(password, user.users_password);
        if(authenticated){
            delete user.users_password;
            session.user = user;
            res.status(202).send(session.user)
        } else {
            res.status(401).send('Incorrect password')
        }
    },
    checkUser: (req, res) => {
        if(req.session.user){
            console.log(req.session.user)
            res.status(200).send(req.session.user);
        } else {
            res.status(400).send('User not found');
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    }
}