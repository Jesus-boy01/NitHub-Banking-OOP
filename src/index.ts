class BankingSystem {
    private static bankName: string = "NitBank";
    private accountName: string;
    private accountNumber: number;

    constructor(accName: string, accNumber: number) {
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

    get userAccountBalance() {
        return `Account Balance: $${this.accountBalance}`
    }

    get getTypeOfAccount() {
        return this.typeOfAccount;
    }

    get getAccountPin() {
        return this.#accountPin;
    }

    verifyPin(pin: number) {
        if (this.#accountPin === pin) {
            return true;
        } else {
            return false;
        }
    }
}


let createAccount = document?.getElementById("create-account");
let getGlobalBank = document.getElementById("get-global-bank");
let resetForm: HTMLFormElement;
resetForm = <HTMLFormElement>document.getElementById("reset-form");

createAccount?.addEventListener('click', createUserAccount);
getGlobalBank?.addEventListener('click', getGlobalBankName);

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
}


function getGlobalBankName(){
    // e.preventDefault();

    if (typeof document !== 'undefined') {
        const globalBankName = document.querySelector(".insert-bank-name") as HTMLInputElement;

        globalBankName.value = bamiAccount?.getBankName || "";
    }
}



resetForm?.addEventListener('submit', resetAccountForm);

function resetAccountForm(e: any){
    e.preventDefault();

    resetForm?.reset();
}

// function getGlobalBankName(e: any, globalBank: object | any){
//     e.preventDefault();

//     if (typeof document !== 'undefined'){
//         const globalBankName = document.getElementById("insert-bank-name") as HTMLInputElement;  
//         globalBankName.value = globalBank.getBankName();  
//     }
// }


const toluAccount = new BankAccount("Tolu Dada", 3567854673, "Savings Account", true, 2348);