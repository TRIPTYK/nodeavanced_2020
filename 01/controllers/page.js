exports.index = async (req, res) => {
    res.sendFile(`${process.cwd()}/views/index.html`)
}
exports.about =  async (req, res) => {
    res.sendFile(`${process.cwd()}/views/about.html`)
}
exports.users = async (req, res) => {
    res.sendFile(`${process.cwd()}/views/users.html`)
}