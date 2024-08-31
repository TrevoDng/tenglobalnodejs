const express = require("express");
const router = express.Router();

const { signin, signup, adminSignin } = require("./auth")

const { adminAuth, getUsers } = require("./auth");

const { tenGlobalHome } = require("../routes/tenglobalHome");
const { checkEmailExistence } = require("./compareEmail");

const { adminGetProof } = require("../routes/sendProof");
const { requestPasswordReset, saveNewPassword } = require("./resetPassword");
const { updateEmail, updateContactNumber } = require("../routes/queries");
const { updateTransactions } = require("../routes/updateTransactions/updateTransactions");

router.route("/signin").post(signin);
router.route("/admin/signin").post(adminSignin);

router.route("/signup").post(async (err, req, res, next) => {
  //console.log("hi");
    const { email } = req.body;
    const emailExists = await checkEmailExistence(req, "body");
  let emailErrorMessage = "";

  console.log(emailExists);

    if (emailExists) {

  console.log({email_message: 'email exist'});
      emailErrorMessage = email + ": already exists please try another email";
    } else {
      return res.status(400).json({
        email_error_message: emailErrorMessage,
      });
    }

  }, signup)

router.route("/request-password-rest").post(requestPasswordReset);
router.route("/save-new-password").post(saveNewPassword);
router.route("/getUsers").get(getUsers);
router.route("/update-email").patch(updateEmail);
router.route("/update-contact-number").patch(updateContactNumber);
router.route("/tenglobalhome").get(tenGlobalHome);
router.route("/admin/getProof").get(adminAuth, adminGetProof);
router.route("/admin/update-transaction").post(adminAuth, updateTransactions)

module.exports = router