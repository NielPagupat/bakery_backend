const Ctrl = require('../../controller/auth/authController');
const UserCtrl = require('../../controller/administrative/UserListController');

module.exports.routes = {
    post: [
        ['/login', Ctrl.LogIn],
        ['/register', UserCtrl.UserRegistration],
        ['/upload-productPicture', UserCtrl.uploadProductPicture],
        ['/save-product', UserCtrl.saveProduct],
        ['/save-ingredient', UserCtrl.saveIngredient],
        ['/save-transaction', UserCtrl.saveTransaction],
        ['/update-stock', UserCtrl.updateStock]
         
    ],
    get: [
        ['/get-users', UserCtrl.getUsers],
        ['/get-products', UserCtrl.getProducts],
        ['/get-ingredients', UserCtrl.getIngredients],
        ['/get-transactionhdr', UserCtrl.getTransactionHdr],
        ['/get-transactiondtl', UserCtrl.getTransactionDtl],
    ],
    remove: [
        ['/delete-product', UserCtrl.deleteProduct],
        ['/log-out', Ctrl.userLogout],
        ['/delete-user', UserCtrl.deleteUserData],
    ]
}