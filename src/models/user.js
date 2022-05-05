module.exports = (sequelize, DataTypes) => {
  return sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'Le mot de passe ne peut pas être vide.',
        },
        notNull: { msg: 'Le mot de passe est obligatoire.' },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Le mot de passe ne peut pas être vide.',
        },
        notNull: { msg: 'Le mot de passe est obligatoire.' },
        len: [8, 30],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: 'Une adresse email valide doit être renseignée.' },
        notEmpty: {
          msg: 'Le champs email ne peut pas être vide.',
        },
        notNull: { msg: 'Le champs email est obligatoire.' },
      },
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    credit: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 150,
      validate: {
        isInt: { msg: 'Le crédit est un entier.' },
      },
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  })
}
