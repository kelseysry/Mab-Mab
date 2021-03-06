'use strict';
module.exports = (sequelize, DataTypes) => {
  const Business = sequelize.define('Business', {
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 100]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zipCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lat: {
      type: DataTypes.DECIMAL,
    },
    lng: {
      type: DataTypes.DECIMAL
    },
  }, {});
  Business.associate = function(models) {
    // associations can be defined here
    Business.belongsTo(models.User, { foreignKey: 'ownerId' });
    Business.hasMany(models.Review, { foreignKey: 'businessId', onDelete: 'CASCADE', hooks: true})
    // if delete business, delete all reviews associated with it


  const columnMapping = {
      through: 'Review', // This is the model name referencing through
      otherKey: 'userId',
      foreignKey: 'businessId'
  }
  Business.belongsToMany(models.User, columnMapping);

  };
  return Business;
};

// npx sequelize-cli model:generate --name Review --attributes userId:integer,businessId:integer,rating:integer,answer:text


// npx sequelize-cli model:generate --name Business --attributes ownerId:integer,title:string,description:text,address:string,city:string,state:string,zipCode:string,lat:decimal,lng:decimal
