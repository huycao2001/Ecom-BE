const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');

// 


const mongoose = require('mongoose');

module.exports.signup = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { name, gender, bday, email, password } = req.body;

        if (!name || !bday || !gender || !email || !password) {

            return res.status(400).json({ msg: 'Please enter all fields' });
        }

        const user = await User.findOne({ email }).session(session);

        if (user) {
            // await session.abortTransaction();
            // session.endSession();
            // return res.status(400).json({ msg: 'User already exists', user });
			throw new Error('User already exists');
        }

        const newUser = new User({ name, gender, bday, email, password });

        // Create salt and hash
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);

        newUser.password = hashed;

        const savedUser = await newUser.save({ session });

        const token = jwt.sign(
            { id: savedUser._id },
            "caobahuydeptrai",
            { expiresIn: 3600 }
        );

        await session.commitTransaction();
        session.endSession();

        res.json({
            msg: 'New account has been successfully created.',
            token,
            user: {
                id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email,
            },
        });

    } catch (err) {
        await session.abortTransaction();
        session.endSession();

        console.error(err);
        return res.json({ msg: err.message });
    }
};


module.exports.login = async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		res.status(400).json({ msg: 'Please enter all fields' });
	}
	User.findOne({ email }).then((user) => {
		if (!user) {
			return res.status(401).json({ msg: 'User does not exist' });
		}

		// Validate password
		bcrypt.compare(password, user.password).then((isMatch) => {
			if (!isMatch)
				return res.status(402).json({ msg: 'Invalid credentials' });

			jwt.sign(
				{ id: user._id },
				// config.get('jwtsecret'),
				"caobahuydeptrai",
				{ expiresIn: 3600 },
				(err, token) => {
					if (err) throw err;
					res.json({
						msg : "Successful",
						token,
						user: {
							id: user._id,
							name: user.name,
							email: user.email,
						},
					});
				}
			);
		});
	});
};

module.exports.get_user = (req, res) => {
	User.findById(req.user.id)
		.select('-password')
		.then((user) => res.json(user));
};

module.exports.get_user_count = (req, res) => {
	User.countDocuments().then((count) => res.json(count));
};
