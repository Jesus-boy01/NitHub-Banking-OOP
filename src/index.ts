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

    existenceOfAccount(account1: object, account2: object): boolean {
        return account1.constructor === account2.constructor
    }
}

class BankAccount extends BankingSystem {
    private accountBalance: number = 1_000;
    private typeOfAccount: string;
    private hasAtmCard: boolean;
    #accountPin: number;

    constructor(accName: string, accNumber: number, typeAccount: string, hasAtm: boolean, accPin: number) {
        super(accName, accNumber);
        this.typeOfAccount = typeAccount;
        this.hasAtmCard = hasAtm;
        this.#accountPin = accPin;
    }

    set userDeposit(amount: number) {
        if (amount > 0) {
            this.accountBalance += amount;
        } else {
            console.log("Invalid amount");
        }
    }

    set userWithdrawal(amount: number) {
        if ((amount <= this.accountBalance) && (amount > 0) && (this.accountBalance !== 0)) {
            this.accountBalance -= amount;
        } else {
            console.log("Insufficient funds")
        }
    }

    userTransfer(amount: number, transferAccount: object | any, pin: number) {
        if ((this.existenceOfAccount(this, transferAccount)) && (this.verifyPin(pin)) && (this.accountBalance >= amount)) {
            this.accountBalance -= amount;
            transferAccount.accountBalance += amount;
        } else {
            throw "This account does not exist in NitBank Banking System or Invalid amount";
        }
    }

    get userAccountBalance(): number {
        return this.accountBalance;
    }

    get getTypeOfAccount(): string {
        return this.typeOfAccount;
    }

    get getAccountPin(): number {
        return this.#accountPin;
    }

    verifyPin(pin: number): boolean {
        if (this.#accountPin === pin) {
            return true;
        } else {
            return false;
        }
    }
}


let createAccount = document?.getElementById("create-account");
let getGlobalBank = document.getElementById("get-global-bank");
let getUserAccountName = document.getElementById("get-user-account-name");
let getUserAccountNumber = document.getElementById("get-user-account-number");
let getUserAccountBalance = document.getElementById("get-user-account-balance");
let getUserAccountType = document.getElementById("get-user-account-type");
let resetForm: HTMLFormElement;
resetForm = <HTMLFormElement>document.getElementById("reset-form");

createAccount?.addEventListener('click', createUserAccount);
getGlobalBank?.addEventListener('click', getGlobalBankName);
getUserAccountName?.addEventListener('click', getMyUserAccountName);
getUserAccountNumber?.addEventListener('click', getMyUserAccountNumber);
getUserAccountBalance?.addEventListener('click', getMyUserAccountBalance);
getUserAccountType?.addEventListener('click', getMyUserAccountType);

let bamiAccount: BankAccount | null;

function createUserAccount(e?: any) {
    e.preventDefault();

    const userAccountName = document?.getElementById("account-name") as HTMLInputElement;
    const userAccountNumber = document?.getElementById("account-number") as HTMLInputElement;
    const userAccountType = document?.getElementById("account-type") as HTMLInputElement;
    const possessAtm = document?.getElementById("possess-atm") as HTMLInputElement;
    const boolPossessAtm = (possessAtm.value.toLowerCase() === "true");
    const userAccountPin = document?.getElementById("account-pin") as HTMLInputElement;


    bamiAccount = new BankAccount(userAccountName.value, Number(userAccountNumber.value),userAccountType.value, boolPossessAtm, Number(userAccountPin.value)); 

    resetAccountForm(e);
}


function getGlobalBankName(){
    if (typeof document !== 'undefined') {
        const globalBankName = document.querySelector(".insert-bank-name") as HTMLParagraphElement;

        globalBankName.innerText = bamiAccount?.getBankName || "";
    }
}

function getMyUserAccountName(){
    if (typeof document !== 'undefined') {
        const myUserAccountName = document.querySelector(".insert-account-name") as HTMLParagraphElement;

        myUserAccountName.innerText = bamiAccount?.getAccountName || "";
    }
}

function getMyUserAccountNumber(){
    if (typeof document !== 'undefined') {
        const myUserAccountNumber = document.querySelector(".insert-account-number") as HTMLParagraphElement;

        myUserAccountNumber.innerText = bamiAccount?.getAccountNumber.toString() || "";
    }
}

function getMyUserAccountBalance(){
    if (typeof document !== 'undefined') {
        const myUserAccountBalance = document.querySelector(".insert-account-balance") as HTMLParagraphElement;

        myUserAccountBalance.innerText = bamiAccount?.userAccountBalance.toString() || "";
    }
}

function getMyUserAccountType(){
    if (typeof document !== 'undefined') {
        const myUserAccountType = document.querySelector(".insert-account-type") as HTMLParagraphElement;

        myUserAccountType.innerText = bamiAccount?.getTypeOfAccount || "";
    }
}


resetForm?.addEventListener('submit', resetAccountForm);

function resetAccountForm(e: any){
    e.preventDefault();

    resetForm?.reset();
}


const toluAccount = new BankAccount("Tolu Dada", 3567854673, "Savings Account", true, 2348);