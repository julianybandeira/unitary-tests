import { Account } from "./account";

function chargeTaxForTransfer(balance, transferAmount) {
    const tax = 100;
    return balance - transferAmount - tax;
}

export function transferWithTax(payer, receiver, transferAmount) {
    const payerAccountAfterTransfer = new Account(payer.id, chargeTaxForTransfer(payer.balance, transferAmount));
    const receiverAccountAfterTransfer = new Account(receiver.id, receiver.balance + transferAmount);
 
    return [payerAccountAfterTransfer, receiverAccountAfterTransfer];
}
 
