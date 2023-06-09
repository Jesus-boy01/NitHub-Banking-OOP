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
        console.log(account1);
        console.log(account2.getAccountNumber);
        return Number(account1) === account2.getAccountNumber;
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
    userDeposit(amount, pin) {
        const pinVerified = this.verifyPin(pin);
        if (amount < 0) {
            alert("Invalid Amount");
            return;
        }
        if (!pinVerified) {
            alert("Invalid Pin");
            return;
        }
        this.accountBalance += amount;
        alert("Successful");
    }
    userWithdrawal(amount, pin) {
        const pinVerified = this.verifyPin(pin);
        if (amount > this.accountBalance) {
            alert("Insufficient Funds");
            return;
        }
        if (amount <= 0) {
            alert("Invalid Amount");
            return;
        }
        if (!pinVerified) {
            alert("Invalid PIN");
            return;
        }
        this.accountBalance -= amount;
        alert("Successful");
    }
    userTransfer(amount, transferAccount, pin) {
        const accountExists = this.existenceOfAccount(getRecepientAccountNumber.value, transferAccount);
        const pinVerified = this.verifyPin(pin);
        if (!accountExists) {
            alert("The recipient account does not exist in NitBank Banking System");
            return;
        }
        if (!pinVerified) {
            alert("Invalid PIN");
            return;
        }
        if (this.accountBalance < amount) {
            alert("Insufficient Funds");
            return;
        }
        if (amount <= 0) {
            alert("Invalid Amount");
            return;
        }
        this.accountBalance -= amount;
        transferAccount.accountBalance += amount;
        alert("Successful");
    }
    get userAccountBalance() {
        return `$${this.accountBalance}`;
    }
    get getTypeOfAccount() {
        return this.typeOfAccount;
    }
    get getAccountPin() {
        return __classPrivateFieldGet(this, _BankAccount_accountPin, "f");
    }
    verifyPin(pin) {
        return (__classPrivateFieldGet(this, _BankAccount_accountPin, "f") === pin);
    }
}
_BankAccount_accountPin = new WeakMap();
let createAccount = document.getElementById("create-account");
let getGlobalBank = document.getElementById("get-global-bank");
let getUserAccountName = document.getElementById("get-user-account-name");
let getUserAccountNumber = document.getElementById("get-user-account-number");
let getUserAccountBalance = document.getElementById("get-user-account-balance");
let getUserAccountType = document.getElementById("get-user-account-type");
let getRecepientAccountNumber = document.getElementById("transfer-recipient-account-number");
let userDepositAmount = document.getElementById("deposit");
let userWithdrawAmount = document.getElementById("withdraw");
let userTransferAmount = document.getElementById("transfer");
let resetForm;
resetForm = document.getElementById("reset-form");
let resetDepoForm;
resetDepoForm = document.getElementById("reset-depo-form");
let resetWithdrawForm;
resetWithdrawForm = document.getElementById("reset-withdraw-form");
let resetTransferForm;
resetTransferForm = document.getElementById("reset-transfer-form");
createAccount === null || createAccount === void 0 ? void 0 : createAccount.addEventListener('click', createUserAccount);
getGlobalBank === null || getGlobalBank === void 0 ? void 0 : getGlobalBank.addEventListener('click', getGlobalBankName);
getUserAccountName === null || getUserAccountName === void 0 ? void 0 : getUserAccountName.addEventListener('click', getMyUserAccountName);
getUserAccountNumber === null || getUserAccountNumber === void 0 ? void 0 : getUserAccountNumber.addEventListener('click', getMyUserAccountNumber);
getUserAccountBalance === null || getUserAccountBalance === void 0 ? void 0 : getUserAccountBalance.addEventListener('click', getMyUserAccountBalance);
getUserAccountBalance === null || getUserAccountBalance === void 0 ? void 0 : getUserAccountBalance.addEventListener('click', updateAccountBalance);
getUserAccountType === null || getUserAccountType === void 0 ? void 0 : getUserAccountType.addEventListener('click', getMyUserAccountType);
userDepositAmount === null || userDepositAmount === void 0 ? void 0 : userDepositAmount.addEventListener('click', myUserDeposit);
userWithdrawAmount === null || userWithdrawAmount === void 0 ? void 0 : userWithdrawAmount.addEventListener('click', myUserWithdraw);
userTransferAmount === null || userTransferAmount === void 0 ? void 0 : userTransferAmount.addEventListener('click', myUserTransfer);
const toluAccount = new BankAccount("Tolu Dada", 356785467, "Savings Account", true, "2348");
let userName = document.getElementById("user-name");
let userNumber = document.getElementById("user-number");
let userBalance = document.getElementById("user-balance");
let userType = document.getElementById("user-type");
userName.innerText = toluAccount.getAccountName;
userNumber.innerText = (toluAccount.getAccountNumber).toString();
userBalance.innerText = toluAccount.userAccountBalance;
userType.innerText = toluAccount.getTypeOfAccount;
let myAccount;
function createUserAccount(e) {
    e.preventDefault();
    const userAccountName = document === null || document === void 0 ? void 0 : document.getElementById("account-name");
    const userAccountNumber = document === null || document === void 0 ? void 0 : document.getElementById("account-number");
    const userAccountType = document === null || document === void 0 ? void 0 : document.getElementById("account-type");
    const possessAtm = document === null || document === void 0 ? void 0 : document.getElementById("possess-atm");
    const boolPossessAtm = (possessAtm.value.toLowerCase() === "true");
    const userAccountPin = document === null || document === void 0 ? void 0 : document.getElementById("account-pin");
    if ((userAccountName.value === "") && (userAccountNumber.value === "") &&
        (userAccountType.value === "") && (userAccountPin.value === "")) {
        alert("Account Details must be filled");
        return;
    }
    myAccount = new BankAccount(userAccountName.value, Number(userAccountNumber.value), userAccountType.value, boolPossessAtm, userAccountPin.value);
    alert("Successful");
    resetAccountForm(e);
}
const isDefined = typeof document !== "undefined";
function getGlobalBankName() {
    if (isDefined) {
        const globalBankName = document.querySelector(".insert-bank-name");
        globalBankName.innerText = (myAccount === null || myAccount === void 0 ? void 0 : myAccount.getBankName) || "";
    }
}
function getMyUserAccountName() {
    if (isDefined) {
        const myUserAccountName = document.querySelector(".insert-account-name");
        myUserAccountName.innerText = (myAccount === null || myAccount === void 0 ? void 0 : myAccount.getAccountName) || "";
    }
}
function getMyUserAccountNumber() {
    if (isDefined) {
        const myUserAccountNumber = document.querySelector(".insert-account-number");
        myUserAccountNumber.innerText = (myAccount === null || myAccount === void 0 ? void 0 : myAccount.getAccountNumber.toString()) || "";
    }
}
function getMyUserAccountBalance() {
    if (isDefined) {
        const myUserAccountBalance = document.querySelector(".insert-account-balance");
        myUserAccountBalance.innerText = (myAccount === null || myAccount === void 0 ? void 0 : myAccount.userAccountBalance) || "";
    }
}
function getMyUserAccountType() {
    if (isDefined) {
        const myUserAccountType = document.querySelector(".insert-account-type");
        myUserAccountType.innerText = (myAccount === null || myAccount === void 0 ? void 0 : myAccount.getTypeOfAccount) || "";
    }
}
function updateAccountBalance() {
    const updateBalance = document.querySelector(".update-balance");
    updateBalance.innerText = (myAccount === null || myAccount === void 0 ? void 0 : myAccount.userAccountBalance) || "";
}
function myUserDeposit() {
    const depositAmount = Number(document.getElementById("deposit-amount").value);
    const depositPin = document.getElementById("depo-account-pin");
    myAccount === null || myAccount === void 0 ? void 0 : myAccount.userDeposit(depositAmount, depositPin.value);
    updateAccountBalance();
}
function myUserWithdraw() {
    const withdrawAmount = Number(document.getElementById("withdraw-amount").value);
    const withdrawPin = document.getElementById("withdraw-account-pin");
    myAccount === null || myAccount === void 0 ? void 0 : myAccount.userWithdrawal(withdrawAmount, withdrawPin.value);
    updateAccountBalance();
}
function myUserTransfer() {
    let recipientAccountNumber = document.getElementById("transfer-recipient-account-number");
    console.log(recipientAccountNumber.value);
    const transferAmount = Number(document.getElementById("transfer-amount").value);
    const transferPin = document.getElementById("transfer-account-pin");
    myAccount === null || myAccount === void 0 ? void 0 : myAccount.userTransfer(transferAmount, toluAccount, transferPin.value);
    userBalance.innerText = toluAccount.userAccountBalance;
    updateAccountBalance();
}
resetForm === null || resetForm === void 0 ? void 0 : resetForm.addEventListener('submit', resetAccountForm);
resetDepoForm === null || resetDepoForm === void 0 ? void 0 : resetDepoForm.addEventListener('submit', resetAccountForm);
resetWithdrawForm === null || resetWithdrawForm === void 0 ? void 0 : resetWithdrawForm.addEventListener('submit', resetAccountForm);
resetTransferForm === null || resetTransferForm === void 0 ? void 0 : resetTransferForm.addEventListener('submit', resetAccountForm);
function resetAccountForm(e) {
    e.preventDefault();
    resetForm === null || resetForm === void 0 ? void 0 : resetForm.reset();
    resetDepoForm === null || resetDepoForm === void 0 ? void 0 : resetDepoForm.reset();
    resetWithdrawForm === null || resetWithdrawForm === void 0 ? void 0 : resetWithdrawForm.reset();
    resetTransferForm === null || resetTransferForm === void 0 ? void 0 : resetTransferForm.reset();
}
//# sourceMappingURL=index.js.map