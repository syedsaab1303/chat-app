const Message = require('../models/Message');

exports.sendMessage = async (req, res) => {
    const { content, chatRoom } = req.body;  //  workflow  smjhna hai, hm postman ki body me jo value dete hai manually usko yha fetch krege and is value ko use krege 
    const sender = req.user.id;

    try {
        const newMessage = await Message.create({ sender, content, chatRoom }); // sender, content and chatRoom ki value jo new document create kre hai 'Message' ka usme jayegi, iske saath saath Message schema ke bache  hue parameter bhi add hoge new document me.
        res.status(201).json(newMessage); // new document create krte time mongoose bache hue paramter ko bhi add kr dete and ise hm response me bhejege jo hme postman ke reponse me show  hoga after hitting API.
    } catch (error) {
        res.status(500).json({ message: "Failed to send message" });
    }
};

exports.getMessages = async (req, res) => {
    const { chatRoom } = req.params;

    try {
        const messages = await Message.find({ chatRoom }).populate('sender', 'username'); // sender parameter me hm username parameter populate krege to id bhi bnegi
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch messages" });
    }
};
