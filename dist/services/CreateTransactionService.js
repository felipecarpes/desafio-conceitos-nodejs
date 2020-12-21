"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CreateTransactionService = /** @class */ (function () {
    function CreateTransactionService(transactionsRepository) {
        this.transactionsRepository = transactionsRepository;
    }
    CreateTransactionService.prototype.execute = function (_a) {
        var title = _a.title, value = _a.value, type = _a.type;
        if (!["income", "outcome"].includes(type)) {
            throw new Error('Transaction type is invalid');
        }
        var total = this.transactionsRepository.getBalance().total;
        if (type === 'outcome' && total < value) {
            throw new Error('You do not have enough balance');
        }
        var transactions = this.transactionsRepository.create({
            title: title,
            type: type,
            value: value
        });
        return transactions;
    };
    return CreateTransactionService;
}());
exports.default = CreateTransactionService;
