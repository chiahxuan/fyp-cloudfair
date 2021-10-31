const PhoneBook = require("../models/PhoneBook"); //import model

const phoneBookCtrl = {
    addContact: async (req, res) => {
        try {
            const { name, number } = req.body;

            //validation
            if (!validatePhone(number)) return res.status(400).json({ msg: "Invalid number." });
            if (name.length < 5) return res.status(400).json({ msg: "Please insert string more than 5 characters" });
            const newContact = new PhoneBook({
                name: { $toUpper: name },
                number: number,
            });

            await newContact.save();
            res.json({ msg: "Create Contact here" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    viewAllContact: async (req, res) => {
        try {
            const phoneBook = await PhoneBook.find();
            res.json(phoneBook);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
};

function validatePhone(number) {
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return phoneRegex.test(number);
}

module.exports = phoneBookCtrl;
