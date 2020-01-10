const bcrypt = require('bcryptjs');

module.exports = {
    register: async(req, res) => {
        const {email, firstName, lastName, password} = req.body;
        const {session} = req;
        const db = req.app.get('db');

        let user = await db.user_get(email);
        user = user[0];
        if(user){
            return res.status(400).send('A user with that email already exists. Please log in.')
        }
        const salt = bcrypt .genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        // send username to users_table
        // get user_id back and then run another db statement inserting hash into passwords table.
        let newUser = await db.user_register({email, firstName, lastName});
        newUser = newUser[0];
        const userId = newUser.users_id;
        await db.user_password({hash, userId});
        session.user = newUser;
        res.status(200).send(session.user);
    },
    login: async(req, res) => {
        const {email, password} = req.body;
        const {session} = req;
        const db = req.app.get('db');

        let user = await db.user_get(email);
        user = user[0];
        console.log(user);
        if(!user){
            return res.status(400).send('Email not found');
        }
        const authenticated = bcrypt.compareSync(password, user.passwords_password);
        if(authenticated){
            delete user.passwords_password;
            delete user.passwords_id;
            session.user = user;
            console.log(`user is: ${session.user}`)
            res.status(202).send(session.user)
        } else {
            console.log(password, user.passwords_password);
            res.status(401).send('Incorrect password')
            console.log('you suck')
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