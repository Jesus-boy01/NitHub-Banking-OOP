"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _BankAccount_accountPin;
class BankingSystem {
    constructor(accName, accNumber) {
        this.accountName = accName;
        this.accountNumber = accNumber;
    }
    get getBankName() {
        return BankingSystem.bankName;
    }
    get getAccountName() {
        return this.accountName;
    }
    get getAccountNumber() {
        return this.accountNumber;
    }
    existenceOfAccount(account1, account2) {
        return account1.constructor === account2.constructor;
    }
}
BankingSystem.bankName = "NitBank";
class BankAccount extends BankingSystem {
    constructor(accName, accNumber, typeAccount, hasAtm, accPin) {
        super(accName, accNumber);
        this.accountBalance = 1000;
        _BankAccount_accountPin.set(this, void 0);
        this.typeOfAccount = typeAccount;
        this.hasAtmCard = hasAtm;
        __classPrivateFieldSet(this, _BankAccount_accountPin, accPin, "f");
    }
    set userDeposit(amount) {
        if (amount > 0) {
            this.accountBalance += amount;
        }
        else {
            console.log("Invalid amount");
        }
    }
    set userWithdrawal(amount) {
        if ((amount <= this.accountBalance) && (amount > 0) && (this.accountBalance !== 0)) {
            this.accountBalance -= amount;
        }
        else {
            console.log("Insufficient funds");
        }
    }
    userTransfer(amount, transferAccount, pin) {
        if ((this.existenceOfAccount(this, transferAccount)) && (this.verifyPin(pin)) && (this.accountBalance >= amount)) {
            this.accountBalance -= amount;
            transferAccount.accountBalance += amount;
        }
        else {
            throw "This account does not exist in NitBank Banking System or Invalid amount";
        }
    }
    get userAccountBalance() {
        return `Account Balance: $${this.accountBalance}`;
    }
    get getTypeOfAccount() {
        return this.typeOfAccount;
    }
    get getAccountPin() {
        return __classPrivateFieldGet(this, _BankAccount_accountPin, "f");
    }
    verifyPin(pin) {
        if (__classPrivateFieldGet(this, _BankAccount_accountPin, "f") === pin) {
            return true;
        }
        else {
            return false;
        }
    }
}
_BankAccount_accountPin = new WeakMap();
let createAccount = document === null || document === void 0 ? void 0 : document.getElementById("create-account");
let getGlobalBank = document.getElementById("get-global-bank");
let resetForm;
resetForm = document.getElementById("reset-form");
createAccount === null || createAccount === void 0 ? void 0 : createAccount.addEventListener('click', createUserAccount);
getGlobalBank === null || getGlobalBank === void 0 ? void 0 : getGlobalBank.addEventListener('click', getGlobalBankName);
let bamiAccount;
function createUserAccount(e) {
    e.preventDefault();
    const userAccountName = document === null || document === void 0 ? void 0 : document.getElementById("account-name");
    const userAccountNumber = document === null || document === void 0 ? void 0 : document.getElementById("account-number");
    const userAccountType = document === null || document === void 0 ? void 0 : document.getElementById("account-type");
    const possessAtm = document === null || document === void 0 ? void 0 : document.getElementById("possess-atm");
    const boolPossessAtm = (possessAtm.value.toLowerCase() === "true");
    const userAccountPin = document === null || document === void 0 ? void 0 : document.getElementById("account-pin");
    bamiAccount = new BankAccount(userAccountName.value, Number(userAccountNumber.value), userAccountType.value, boolPossessAtm, Number(userAccountPin.value));
}
function getGlobalBankName() {
    if (typeof document !== 'undefined') {
        const globalBankName = document.querySelector(".insert-bank-name");
        globalBankName.value = (bamiAccount === null || bamiAccount === void 0 ? void 0 : bamiAccount.getBankName) || "";
    }
}
resetForm === null || resetForm === void 0 ? void 0 : resetForm.addEventListener('submit', resetAccountForm);
function resetAccountForm(e) {
    e.preventDefault();
    resetForm === null || resetForm === void 0 ? void 0 : resetForm.reset();
}
const toluAccount = new BankAccount("Tolu Dada", 3567854673, "Savings Account", true, 2348);
//# sourceMappingURL=index.js.map