class BankingSystem {
    private static bankName: string = "NitBank";
    private accountName: string;
    private accountNumber: number;

    constructor(accName: string, accNumber: number) {
        this.accountName = accName;
        this.accountNumber = accNumber;
    }

    get getBankName(): string {
        return BankingSystem.bankName;
    }

    get getAccountName(): string {
        return this.accountName;
    }

    get getAccountNumber(): number {
        return this.accountNumber;
    }

    existenceOfAccount(account1: string, account2: BankingSystem): boolean {
        return Number(account1) === account2.getAccountNumber;
    }      
}

class BankAccount extends BankingSystem {
    private accountBalance: number = 1_000;
    private typeOfAccount: string;
    private hasAtmCard: boolean;
    #accountPin: string;

    constructor(accName: string, accNumber: number, typeAccount: string, hasAtm: boolean, accPin: string) {
        super(accName, accNumber);
        this.typeOfAccount = typeAccount;
        this.hasAtmCard = hasAtm;
        this.#accountPin = accPin;
    }

    userDeposit(amount: number, pin: string) {
        const pinVerified = this.verifyPin(pin);
        if (amount < 0) {
            alert("Invalid Amount");
            return;
        } 
        if (!pinVerified){
            alert("Invalid Pin");
            return;
        }
        this.accountBalance += amount;
        alert("Successful");    
    }

    userWithdrawal(amount: number, pin: string) { 
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

    userTransfer(amount: number, transferAccount: object | any, pin: string) {
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
        
        if (this.accountBalance < amount){
            alert("Insufficient Funds");
            return;
        }

        if (amount <= 0){
            alert("Invalid Amount");
            return;
        }

        this.accountBalance -= amount;
        transferAccount.accountBalance += amount;
        alert("Successful");
    }

    get userAccountBalance(): string {
        return `$${this.accountBalance}`;
    }

    get getTypeOfAccount(): string {
        return this.typeOfAccount;
    }

    get getAccountPin(): string {
        return this.#accountPin;
    }

    verifyPin(pin: string): boolean {
        return (this.#accountPin === pin)
    }
}


let createAccount = document.getElementById("create-account");
let getGlobalBank = document.getElementById("get-global-bank");
let getUserAccountName = document.getElementById("get-user-account-name");
let getUserAccountNumber = document.getElementById("get-user-account-number");
let getUserAccountBalance = document.getElementById("get-user-account-balance");
let getUserAccountType = document.getElementById("get-user-account-type");
let getRecepientAccountNumber = document.getElementById("transfer-recipient-account-number") as HTMLInputElement;
let userDepositAmount = document.getElementById("deposit");
let userWithdrawAmount = document.getElementById("withdraw");
let userTransferAmount = document.getElementById("transfer");

let resetForm: HTMLFormElement;
resetForm = <HTMLFormElement>document.getElementById("reset-form");
let resetDepoForm: HTMLFormElement;
resetDepoForm = <HTMLFormElement>document.getElementById("reset-depo-form");
let resetWithdrawForm: HTMLFormElement;
resetWithdrawForm = <HTMLFormElement>document.getElementById("reset-withdraw-form");
let resetTransferForm: HTMLFormElement;
resetTransferForm = <HTMLFormElement>document.getElementById("reset-transfer-form");

createAccount?.addEventListener('click', createUserAccount);
getGlobalBank?.addEventListener('click', getGlobalBankName);
getUserAccountName?.addEventListener('click', getMyUserAccountName);
getUserAccountNumber?.addEventListener('click', getMyUserAccountNumber);
getUserAccountBalance?.addEventListener('click', getMyUserAccountBalance);
getUserAccountBalance?.addEventListener('click', updateAccountBalance);
getUserAccountType?.addEventListener('click', getMyUserAccountType);
userDepositAmount?.addEventListener('click', myUserDeposit);
userWithdrawAmount?.addEventListener('click', myUserWithdraw);
userTransferAmount?.addEventListener('click', myUserTransfer);

const toluAccount = new BankAccount("Tolu Dada", 356785467, "Savings Account", true, "2348");

let userName = document.getElementById("user-name") as HTMLParagraphElement;
let userNumber = document.getElementById("user-number") as HTMLParagraphElement;
let userBalance = document.getElementById("user-balance") as HTMLParagraphElement;
let userType = document.getElementById("user-type") as HTMLParagraphElement;

userName.innerText = toluAccount.getAccountName;
userNumber.innerText = (toluAccount.getAccountNumber).toString();
userBalance.innerText = toluAccount.userAccountBalance;
userType.innerText = toluAccount.getTypeOfAccount;

let myAccount: BankAccount | null;

function createUserAccount(e?: any) {
    e.preventDefault();

    const userAccountName = document?.getElementById("account-name") as HTMLInputElement;
    const userAccountNumber = document?.getElementById("account-number") as HTMLInputElement;
    const userAccountType = document?.getElementById("account-type") as HTMLSelectElement;
    const possessAtm = document?.getElementById("possess-atm") as HTMLInputElement;
    const boolPossessAtm = (possessAtm.value.toLowerCase() === "true");
    const userAccountPin = document?.getElementById("account-pin") as HTMLInputElement;

    if((userAccountName.value === "") && (userAccountNumber.value === "") && 
    (userAccountType.value === "") && (userAccountPin.value === "")) {
        alert("Account Details must be filled");
        return;
    }

    myAccount = new BankAccount(userAccountName.value, Number(userAccountNumber.value), userAccountType.value, boolPossessAtm, userAccountPin.value); 

    alert("Successful");

    resetAccountForm(e);
}

const isDefined = typeof document !== "undefined";

function getGlobalBankName(){
    if (isDefined) {
        const globalBankName = document.querySelector(".insert-bank-name") as HTMLParagraphElement;

        globalBankName.innerText = myAccount?.getBankName || "";
    }
}

function getMyUserAccountName(){
    if (isDefined) {
        const myUserAccountName = document.querySelector(".insert-account-name") as HTMLParagraphElement;

        myUserAccountName.innerText = myAccount?.getAccountName || "";
    }
}

function getMyUserAccountNumber(){
    if (isDefined) {
        const myUserAccountNumber = document.querySelector(".insert-account-number") as HTMLParagraphElement;

        myUserAccountNumber.innerText = myAccount?.getAccountNumber.toString() || "";
    }
}

function getMyUserAccountBalance(){
    if (isDefined) {
        const myUserAccountBalance = document.querySelector(".insert-account-balance") as HTMLParagraphElement;

        myUserAccountBalance.innerText = myAccount?.userAccountBalance || "";
    }
}

function getMyUserAccountType(){
    if (isDefined) {
        const myUserAccountType = document.querySelector(".insert-account-type") as HTMLParagraphElement;

        myUserAccountType.innerText = myAccount?.getTypeOfAccount || "";
    }
}

function updateAccountBalance(){
    const updateBalance = document.querySelector(".update-balance") as HTMLParagraphElement; 

    updateBalance.innerText = myAccount?.userAccountBalance || "";
}

function myUserDeposit(){
    const depositAmount = Number((document.getElementById("deposit-amount") as HTMLInputElement).value);
    const depositPin = document.getElementById("depo-account-pin") as HTMLInputElement;
    myAccount?.userDeposit(depositAmount, depositPin.value);

    updateAccountBalance();
}

function myUserWithdraw(){
    const withdrawAmount = Number((document.getElementById("withdraw-amount") as HTMLInputElement).value);
    const withdrawPin = document.getElementById("withdraw-account-pin") as HTMLInputElement;
    myAccount?.userWithdrawal(withdrawAmount, withdrawPin.value);
    
    updateAccountBalance();
}

function myUserTransfer(){
    let recipientAccountNumber = document.getElementById("transfer-recipient-account-number") as HTMLInputElement;
    console.log(recipientAccountNumber.value);

    const transferAmount = Number((document.getElementById("transfer-amount") as HTMLInputElement).value);
    const transferPin = document.getElementById("transfer-account-pin") as HTMLInputElement;
    myAccount?.userTransfer(transferAmount, toluAccount, transferPin.value);
    userBalance.innerText = toluAccount.userAccountBalance; 
    
    updateAccountBalance();
}   

resetForm?.addEventListener('submit', resetAccountForm);
resetDepoForm?.addEventListener('submit', resetAccountForm);
resetWithdrawForm?.addEventListener('submit', resetAccountForm);
resetTransferForm?.addEventListener('submit', resetAccountForm);

function resetAccountForm(e: any){
    e.preventDefault();

    resetForm?.reset();
    resetDepoForm?.reset();
    resetWithdrawForm?.reset();
    resetTransferForm?.reset();
}
