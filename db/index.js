const Sequelize = require("sequelize");

const sequelize = new Sequelize("pure_nodejs", "lego", "1991", {
    dialect: "mysql",
    host: "localhost",
})

const Image = require("./Image")(sequelize);

module.exports = {
    sequelize: sequelize,
    image: Image
}