const User = require('../schemas/user')

// CREATE USER
exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        res.status(201).json(user)
    } catch (err) {
        res.status(400).json(err)
    }
}

// GET ALL USER (query username includes)
exports.getAllUsers = async (req, res) => {
    try {

        let filter = { isDeleted: false }

        if (req.query.username) {
            filter.username = {
                $regex: req.query.username,
                $options: "i"
            }
        }

        const users = await User.find(filter).populate("role")

        res.json(users)

    } catch (err) {
        res.status(500).json(err)
    }
}

// GET USER BY ID
exports.getUserById = async (req, res) => {
    try {

        const user = await User.findById(req.params.id)
            .populate("role")

        if (!user || user.isDeleted)
            return res.status(404).json({ message: "User not found" })

        res.json(user)

    } catch (err) {
        res.status(500).json(err)
    }
}

// UPDATE USER
exports.updateUser = async (req, res) => {
    try {

        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )

        res.json(user)

    } catch (err) {
        res.status(400).json(err)
    }
}

// SOFT DELETE
exports.deleteUser = async (req, res) => {
    try {

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { isDeleted: true },
            { new: true }
        )

        res.json({ message: "User deleted (soft)", user })

    } catch (err) {
        res.status(500).json(err)
    }
}

exports.enableUser = async (req, res) => {

    const { email, username } = req.body

    try {

        const user = await User.findOne({
            email: email,
            username: username,
            isDeleted: false
        })

        if (!user)
            return res.status(404).json({ message: "User not found" })

        user.status = true

        await user.save()

        res.json({
            message: "User enabled",
            user
        })

    } catch (err) {
        res.status(500).json(err)
    }

}

exports.disableUser = async (req, res) => {

    const { email, username } = req.body

    try {

        const user = await User.findOne({
            email: email,
            username: username,
            isDeleted: false
        })

        if (!user)
            return res.status(404).json({ message: "User not found" })

        user.status = false

        await user.save()

        res.json({
            message: "User disabled",
            user
        })

    } catch (err) {
        res.status(500).json(err)
    }

}

exports.getUsersByRole = async (req, res) => {

    try {

        const users = await User.find({
            role: req.params.id,
            isDeleted: false
        }).populate("role")

        res.json(users)

    } catch (err) {
        res.status(500).json(err)
    }

}