const pool = require("../../postgres/postgresConfig");
const { updatePendingActionMail } = require("../email/nodeMail");

exports.updateTransactions = (async (req, res) => {
    const { pending_action, update_message, user_id, proof_id } = req.body;

    const results = pool.query("UPDATE proof SET pending_action = $1 WHERE proof_id = $2 AND user_id = $3", 
        [pending_action, proof_id, user_id])
    .catch((error) => {
        console.log("failed to get data from roles!", error)
        return res.status(400).json({updateStatusError: "failed to update transaction status!"})
    });
    const updateResults = (await results).rows[0];
    console.log(updateResults);

    //updatePendingActionMail(req, res);
    return res.status(200).json({updateStatusMessage: "transaction status was successfully updated!"})
});