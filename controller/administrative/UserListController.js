const { select, insert, update, remove } = require("../../models/mainModel");
const path = require('path');
const bcrypt = require('bcrypt');
const { GetLogs, GetProducts, GetTransactionHdr, GetTransactionDtl, GetIngredients, SetTransDtl, GetSoldItemsTotal, GetSales, GetSalesDtl, GetSalesPerDay, GetPopular } = require("../../models/rawQueryModel/rawQueryModel");
const db = require('../../config/dbConnection');
const AuthModel = require('../../models/auth/authModel');
const fs = require('fs');
const { param } = require("../../routes/api");

module.exports.uploadProductPicture = async function (req, res) {
	const multer = require('multer');
	const upload = multer({
		storage: multer.diskStorage({
			destination: function (req, file, cb) {
				cb(null, process.env.PRODUCT_PICTURE_PATH)
			},
			filename: function (req, file, cb) {
				const data = req.body;
				cb(null, data.filename)
			}
		})
	}).single('file');
	try {
		await upload(req, res, function (err) {
			if (err instanceof multer.MulterError) {
				// A Multer error occurred when uploading.
				return res.status(200).json({ success: false, message: "Uploading failed. Please contact administrator." });
			} else if (err) {
				// An unknown error occurred when uploading.
				return res.status(200).json({ success: false, message: "File path not found. Check connection to NAS." });
			} else {
				// Everything went fine and save document in DB here.
				return res.status(200).json({ success: true, message: "Successfully upload file." });
			}
		})
	} catch (error) {
		res.status(500).json({ error: error })
	}
}

module.exports.deleteUserData = async function (req, res) {
	const data = req.query
	var params = {
		tableName: "tbllogin",
		where: ["LoginID = ?"],
		whereValue: [data.LoginID],
	}
	try {
		var result = remove(params);
		result.then(function(response){
			res.status(200).json(response);
		})
	} catch (error) {
		res.status(400).send({ error: 'Server Error' });
		console.error(error)
	}
},



module.exports.getUsers = async function (req, res) {
	var params = {
		fields: ["*"],
		tableName: "tbllogin",
	}
	try {
		await select(params).then(function (response) {
			if (response.success) res.status(200).json(response.data);
			else res.status(200).json(response);
		});
	} catch (error) {
		res.status(400).send({ error: 'Server Error' });
		console.error(error)
	}
}



module.exports.UserRegistration = async function (req, res) {
	const data = req.body.dataVariable;
	const saltRounds = 10;

	try {
		const hashedPassword = await bcrypt.hash(data.Password, saltRounds);

		let oldProfilePicturePath = null;
		let oldSignaturePath = null;

		if (data.LoginID > 0) {
			const existingUser = await query(`SELECT filepath_profilepicture, filepath_esignature FROM tbllogin WHERE LoginID = ?`, [data.LoginID]);
			if (existingUser.length > 0) {
				oldProfilePicturePath = existingUser[0].filepath_profilepicture;
				oldSignaturePath = existingUser[0].filepath_esignature;
			}
		}

		const params = {
			tableName: "tbllogin",
			fieldValue: {
				Username: data.Username,
				Password: hashedPassword,
				FullName: data.FullName,
				userlevel: data.userlevel
			}
		};

		if (data.LoginID > 0) {
			params.fieldValue.LoginID = data.LoginID;
		}

		const result = await (data.LoginID > 0 ? update(params) : insert(params));

		if (data.LoginID > 0) {
			if (oldProfilePicturePath && oldProfilePicturePath !== newProfilePicturePath) {
				fs.unlink(oldProfilePicturePath, (err) => {
					if (err) console.error("Failed to delete old profile picture:", err);
					else console.log("Old profile picture deleted successfully.");
				});
			}
			if (oldSignaturePath && oldSignaturePath !== newSignaturePath) {
				fs.unlink(oldSignaturePath, (err) => {
					if (err) console.error("Failed to delete old signature:", err);
					else console.log("Old signature deleted successfully.");
				});
			}
		}

		res.status(200).json({ success: true, data: result });
	} catch (error) {
		console.error("Registration error:", error);
		res.status(400).json({ success: false, error: 'Server Error' });
	}
};


//custom controllers
module.exports.getProducts = async function (req, res) {
	try {
		var result = GetProducts();
		result.then(function(response){
			res.status(200).json(response);
		})
	} catch (error) {
		res.status(400).send({ error: 'Server Error' });
		console.error(error)
	}
}
module.exports.getIngredients = async function (req, res) {
	try {
		var result = GetIngredients();
		result.then(function(response){
			res.status(200).json(response);
		})
	} catch (error) {
		res.status(400).send({ error: 'Server Error' });
		console.error(error)
	}
}

module.exports.getTransactionHdr = async function (req, res) {
	try {
		var result = GetTransactionHdr();
		result.then(function(response){
			res.status(200).json(response);
		})
	} catch (error) {
		res.status(400).send({ error: 'Server Error' });
		console.error(error)
	}
}

module.exports.getTransactionDtl = async function (req, res) {
	data = req.query
	try {
		var result = GetTransactionDtl(data.id);
		result.then(function(response){
			res.status(200).json(response);
		})
	} catch (error) {
		res.status(400).send({ error: 'Server Error' });
		console.error(error)
	}
}

module.exports.productSummary = async function (req, res) {
	data = req.query
	try {
		var result = GetSoldItemsTotal();
		result.then(function(response){
			res.status(200).json(response);
		})
	} catch (error) {
		res.status(400).send({ error: 'Server Error' });
		console.error(error)
	}
}

module.exports.getSalesPerDay = async function (req, res) {
	data = req.query
	try {
		var result = GetSalesPerDay();
		result.then(function(response){
			res.status(200).json(response);
		})
	} catch (error) {
		res.status(400).send({ error: 'Server Error' });
		console.error(error)
	}
}

module.exports.getPopular = async function (req, res) {
	data = req.query
	try {
		var result = GetPopular();
		result.then(function(response){
			res.status(200).json(response);
		})
	} catch (error) {
		res.status(400).send({ error: 'Server Error' });
		console.error(error)
	}
}

module.exports.saveProduct = async function (req, res) {
    const data = req.body.dataVariable;

    const params = {
        tableName: "tblproduct",
        fieldValue: {
            id: data.id,
            pname: data.pname,
            pprice: data.pprice,
            stock: data.stock,
            ptype: data.ptype,
            pexpiry: data.pexpiry,
            picturepath: data.picturepath
        }
    };

    try {
        let response;
        if (!data.id || data.id === "") {
            // Remove id when inserting (usually auto-incremented)
            delete params.fieldValue.id;
            response = await insert(params);
        } else {
            response = await update(params);
        }

        res.status(200).json(response);
    } catch (error) {
        console.error("Error saving product:", error);
        res.status(500).send({ error: 'Server Error' });
    }
};


module.exports.updateStock = async function (req, res) {
    const { id, stock, tableName } = req.body;

    if (!id || typeof stock !== 'number' || !tableName) {
        return res.status(400).json({ error: 'Invalid input' });
    }

    const params = {
        tableName,
        fieldValue: {
            id,
            stock
        }
    };

    try {
        const response = await update(params);
        res.status(200).json(response);
    } catch (error) {
        console.error("Error updating stock:", error);
        res.status(500).send({ error: 'Server Error' });
    }
};

module.exports.saveIngredient = async function (req, res) {
    const data = req.body.dataVariable;
    const params = {
        tableName: "tblingredient",
        fieldValue: {
            id: data.id,
            ingredientname: data.ingredientname,
            stock: data.stock,
        }
    };

    try {
        let response;
        if (!data.id || data.id === "") {
            // Remove id when inserting (usually auto-incremented)
            delete params.fieldValue.id;
            response = await insert(params);
        } else {
            response = await update(params);
        }

        res.status(200).json(response);
    } catch (error) {
        console.error("Error saving product:", error);
        res.status(500).send({ error: 'Server Error' });
    }
};

module.exports.saveTransaction = async function (req, res) {
    const { hdr, dtl } = req.body.dataVariable;

    if (!hdr || !dtl || !Array.isArray(dtl) || dtl.length === 0) {
        return res.status(400).json({ error: 'Invalid or incomplete transaction data.' });
    }

    const paramshdr = {
        tableName: "tbltransactionhdr",
        fieldValue: {
            transactiontotal: hdr.transactiontotal,
            transactiontype: hdr.transactiontype,
        }
    };

    try {
        const hdrResult = await insert(paramshdr);

        if (!hdrResult || !hdrResult.id) {
            return res.status(500).json({ error: "Transaction header insertion failed" });
        }

        const id = hdrResult.id;

        for (const item of dtl) {
            // Insert transaction detail
            const paramsdtl = {
                transaction_link_id: id,
                prodid: item.product.id,
                prodprice: item.product.pprice,
                quantity: item.quantity,
            };

            await SetTransDtl(paramsdtl);

            // Fetch current product stock
            const stockQuery = `SELECT stock FROM tblproduct WHERE id = ? LIMIT 1`;
            const stockResult = await new Promise((resolve, reject) => {
                db.query(stockQuery, [item.product.id], (err, result) => {
                    if (err) return reject(err);
                    resolve(result[0]);
                });
            });

            const currentStock = stockResult?.stock ?? 0;
            const updatedStock = currentStock - item.quantity;

            // Update stock in tblproduct
            await update({
                tableName: "tblproduct",
                fieldValue: {
                    id: item.product.id,      // required for WHERE condition
                    stock: updatedStock       // final computed value
                }
            });
        }

        return res.status(200).json({ success: true, id });
    } catch (error) {
        console.error("Transaction save error:", error);
        return res.status(500).json({ error: 'An unexpected error occurred while saving the transaction.' });
    }
};



module.exports.deleteProduct = async function (req, res) {
	const data = req.query
	const params = {
		tableName: 'tblproduct',
		where: ['id = ?'],
		whereValue: [data.id]
	}

	try {
		var result = remove(params);
		result.then(function(response){
			res.status(200).json(response);
		})
	} catch (error) {
		res.status(400).send({ error: 'Server Error' });
		console.error(error)
	}
}



//template
module.exports.AuditLog = async function (req, res) {
    const data = req.query.dataVariable
	var params = {
		tableName: "tblaudittrail",
		fieldValue:{
			event: data.event,
			doctype: data.doctype,
			referenceno: data.referenceno,
			remarks: data.remarks,
			loggedby:data.loggedby
		}
	}
	try {
		var result = insert(params);
		result.then(function(response){
			res.status(200).json(response);
		})
	} catch (error) {
		res.status(400).send({ error: 'Server Error' });
		console.error(error)
	}
}