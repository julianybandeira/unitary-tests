import { Account } from "./account";

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

export function internationalTransfer(payer, receiver, transferAmount) {
    const totalTransferWithTax = taxPercentilForTransfer(transferAmount);

    if(payer.balance < totalTransferWithTax){
        throw new Error(`Balance lower than the transfer amount (transfer + tax).`);

    } else if(transferAmount >= 1000 && transferAmount <= 9999){
        const payerAccountAfterTransfer = new Account(payer.id, payer.balance-totalTransferWithTax);
        const receiverAccountAfterTransfer = new Account(receiver.id, receiver.balance + transferAmount);

        return [payerAccountAfterTransfer, receiverAccountAfterTransfer];

    } else {
        throw new Error(`Invalid transfer amount.`);
    }
}