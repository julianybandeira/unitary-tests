import { Account } from "./account";
import { getAccount } from "./accounts";

function taxPercentilForTransfer(transferAmount){
    if(transferAmount >= 1000 && transferAmount <= 5000){
            const tax = (transferAmount *0.05)+100;
            const total = transferAmount + tax;

            return total;
    } else if(transferAmount >= 5001 && transferAmount <= 9999){
            const tax = (transferAmount *0.1)+100;
            const total = transferAmount + tax;
            
            return total;
    } else{
        throw new Error(`Invalid transfer amount.`);
    }
}

export function transferMoney(payerId, receiverId, transferAmount) {
    const totalTransferWithTax = taxPercentilForTransfer(transferAmount);

    const payer = getAccount(payerId);
    const receiver = getAccount(receiverId);

    if(payer.balance < totalTransferWithTax){
        throw new Error(`Balance lower than the transfer amount (transfer + tax).`);

    } else if(transferAmount >= 1000 && transferAmount <= 9999){
        const payerAccountAfterTransfer = new Account(payerId, payer.balance-totalTransferWithTax);
        const receiverAccountAfterTransfer = new Account(receiverId, receiver.balance + transferAmount);

        return [payerAccountAfterTransfer, receiverAccountAfterTransfer];

    } else {
        throw new Error(`Invalid transfer amount.`);
    }
}