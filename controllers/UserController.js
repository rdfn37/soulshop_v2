const User = require("../models/User");
const bcrypt = require("bcrypt");

class UserController {
  static async loginPage(req, res) {
    res.render("login");
  }

  static async signupPage(req, res) {
    res.render("signup");
  }

  static async loginUser(req, res) {
    const { email, password } = req.body;

    if (email && password) {
      const user = await User.findOne({ email });

      if (user) {
        const equals = await bcrypt.compare(password, user.password);

        if (!equals) {
          res.render("login", { error: "Senha incorreta!" });
        } else {
          req.session.user = { _id: user._id };
          res.redirect("/");
        }
      } else {
        res.render("login", { erro: "Usuário não existe" });
      }
    } else {
      res.render("login", { error: "Campos inválidos" });
    }
  }

  static async signupUser(req, res) {
    const { name, email, birthdate, password } = req.body;

    if (name && email && birthdate && password) {
      const userExists = await User.findOne({ email });
      if (userExists) {
        res.render("signup", { error: "E-mail já cadastrado" });
      } else {
        const salt = await bcrypt.genSalt(12);
        const hash = await bcrypt.hash(password, salt);

        const user = User({ name, email, birthdate, password: hash });

        const saved = await user.save();

        req.session.user = { _id: saved._id };

        res.redirect("/");
      }
    } else {
      res.render("signup", { error: "Informações Obrigatórios" });
    }
  }

  static async logoutUser(req, res) {
    req.session.destroy();
    res.redirect("/login");
  }
}

module.exports = UserController;
