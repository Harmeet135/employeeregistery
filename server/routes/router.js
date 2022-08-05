const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');


router.post('/register', async (req, res) => {
    const { name, email, age, mobile, salary, work, desc } = req.body;

    if (!name || !email || !age || !mobile || !salary || !work || !desc) {
        return res.status(400).json('Please fill all the fields');
    }

    try {

        const preuser = await User.findOne({ email: email });

        if (preuser) {
            res.status(402).json('User already exists');
        }
        else {
            const newuser = new User({
                name,
                email,
                age,
                mobile,
                salary,
                work,
                desc
            });
            newuser.save();
            res.status(201).json(newuser, 'User registered successfully');
        }

    } catch (error) {
        res.status(406).json(error);
    }
});


router.get('/getdata', async (req, res) => {
    try {
        const userdata = await User.find();
        res.status(200).json(userdata);
        // console.log(userdata);
    } catch (error) {
        res.status(404).json(error);
    }
})

router.get('/getdata/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const userid = await User.findById({ _id: id });
        res.status(200).json(userid);
        // console.log(userdata);
    } catch (error) {
        res.status(404).json(error);
    }
})

router.patch('/update/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndUpdate(id, req.body, {
            new: true
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(410).json(error);
    }
}
)

router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await User.findByIdAndDelete({ _id: id });
        res.status(200).json(deleted);
    } catch (error) {
        res.status(404).json(error);
    }
}
)

router.get('/search/:key', async (req, res) => {
    try {
        const result = await User.find({
            "$or": [{
                name: { "$regex": req.params.key, "$options": "i" }
            }]
        })
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json(error);
    }

}
)

module.exports = router;

