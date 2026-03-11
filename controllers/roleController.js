import Role from "../schemas/role.js";
import User from "../schemas/user.js";


// CREATE

export const createRole = async (req, res) => {

    try {

        const role = await Role.create(req.body);

        res.json(role);

    } catch (err) {
        res.status(500).json(err.message);
    }

};



// GET ALL

export const getAllRoles = async (req, res) => {

    try {

        const roles = await Role.find({ deleted: false });

        res.json(roles);

    } catch (err) {
        res.status(500).json(err.message);
    }

};



// GET BY ID

export const getRoleById = async (req, res) => {

    try {

        const role = await Role.findById(req.params.id);

        res.json(role);

    } catch (err) {
        res.status(500).json(err.message);
    }

};



// UPDATE

export const updateRole = async (req, res) => {

    try {

        const role = await Role.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(role);

    } catch (err) {
        res.status(500).json(err.message);
    }

};



// SOFT DELETE

export const deleteRole = async (req, res) => {

    try {

        await Role.findByIdAndUpdate(req.params.id, {
            deleted: true
        });

        res.json({ message: "Role deleted (soft)" });

    } catch (err) {
        res.status(500).json(err.message);
    }

};



// GET USERS BY ROLE

export const getUsersByRole = async (req, res) => {

    try {

        const users = await User
            .find({
                role: req.params.id,
                deleted: false
            })
            .populate("role");

        res.json(users);

    } catch (err) {
        res.status(500).json(err.message);
    }

};