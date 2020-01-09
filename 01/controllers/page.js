const Client = require("../models/client");
exports.index = async (req, res, next) => {
  // res.sendFile(`${process.cwd()}/views/index.html`)

  res.render("pages/index", {
    title: "Home Page"
  });
};
exports.about = async (req, res, next) => {
  // res.sendFile(`${process.cwd()}/views/about.html`)
  res.render("pages/about", {
    title: "About Page",
    hasFooter: true
  });
};
exports.clients = async (req, res, next) => {
    console.log('broll')
  // res.sendFile(`${process.cwd()}/views/users.html`)
    let clients =await Client.find();
  res.render("pages/clients", {
    title: "Clients List",
    clients:clients
  });
};
exports.clientform = async (req, res, next) => {
  // res.sendFile(`${process.cwd()}/views/users.html`)
  res.render("pages/client-form", {
    title: "Clients Create"
  });
};
exports.clientscreate = async (req, res, next) => {
  try {
    let client = new Client(req.body);
    try{
        await client.save();
       return res.redirect('/clients/')
      
    }catch(e){
        console.log(e)
    }
  } catch (e) {
    console.log(e);
  }
};
