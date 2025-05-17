const db = require("../../config/dbConnection");
const rawQueryModel = {
    
    GetProducts : async function () {
        return new Promise((resolve, reject) => {
        const query = `SELECT * FROM tblproduct`;
        db.query(query, [], async (err, result) => {
            resolve({ success: true, data: result });
        });
        });
    },

    GetIngredients : async function () {
        return new Promise((resolve, reject) => {
        const query = `SELECT * FROM tblingredient`;
        db.query(query, [], async (err, result) => {
            resolve({ success: true, data: result });
        });
        });
    },

    GetTransactionHdr : async function () {
        return new Promise((resolve, reject) => {
        const query = `SELECT * FROM tbltransactionhdr`;
        db.query(query, [], async (err, result) => {
            resolve({ success: true, data: result });
        });
        });
    },

    GetTransactionDtl : async function (params) {
        return new Promise((resolve, reject) => {
        const query = `SELECT * FROM tbltransactiondtl WHERE transaction_link_id = ?`;
        db.query(query, [params], async (err, result) => {
            resolve({ success: true, data: result });
        });
        });
    },


    GetLogs : async function () {
        return new Promise((resolve, reject) => {
        const query = `SELECT * FROM tblaudittrail`;
        db.query(query, [], async (err, result) => {
            resolve({ success: true, data: result });
        });
        });
    }

};

module.exports = rawQueryModel;
