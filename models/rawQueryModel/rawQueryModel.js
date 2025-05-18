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

    GetSoldItemsTotal : async function (params) {
        return new Promise((resolve, reject) => {
        const query = `SELECT prodid,prodprice, SUM(quantity) AS total_quantity FROM tbltransactiondtl GROUP BY prodid;`;
        db.query(query, [params], async (err, result) => {
            resolve({ success: true, data: result });
        });
        });
    },

    GetPopular: async function (params) {
        return new Promise((resolve, reject) => {
        const query = `SELECT prodid, COUNT(*) AS count_occurrences FROM tbltransactiondtl GROUP BY prodid ORDER BY count_occurrences DESC LIMIT 1;`;
        db.query(query, [], async (err, result) => {
            resolve({ success: true, data: result });
        });
        });
    },

    GetSalesPerDay: async function () {
        return new Promise((resolve, reject) => {
        const query = `SELECT DATE(date) AS sale_date, COUNT(*) AS sales_count FROM tbltransactionhdr GROUP BY DATE(date) ORDER BY sale_date;`;
        db.query(query, [], async (err, result) => {
            resolve({ success: true, data: result });
        });
        });
    },

    SetTransDtl : async function (params) {
        return new Promise((resolve, reject) => {
        const query = `INSERT INTO tbltransactiondtl (transaction_link_id, prodid, prodprice, quantity) VALUES (?, ?, ?, ?)`;
        db.query(query, [params.transaction_link_id, params.prodid, params.prodprice, params.quantity], async (err, result) => {
            resolve({ success: true, data: result });
        });
        });
    }

};

module.exports = rawQueryModel;
