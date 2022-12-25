import { Account } from '../account.js';
import { internationalTransfer} from '../internationaltransfer.js';

describe('iinternatiopnal transfer with tax', () => {
    test('it should charge 100 + 5% from the payer account with 4000 for a 2000 transfer to a receiver account with 0', () => {
        const payerAccount = new Account(1, 4000);
        const receiverAccount = new Account(2, 0);
 
        const updatedAccounts = internationalTransfer(payerAccount, receiverAccount, 2000);
 
        expect(updatedAccounts).toEqual(
            expect.arrayContaining([
                expect.objectContaining({id: 1, balance: 1800}),
                expect.objectContaining({id: 2, balance: 2000}),
            ])
        );
    });

    test('it should charge 100 + 10% from the payer account with 10000 for a 5500 transfer to a receiver account with 2000', () => {
        const payerAccount = new Account(1, 10000);
        const receiverAccount = new Account(2, 2000);
     
        const updatedAccounts = internationalTransfer(payerAccount, receiverAccount, 5500);
     
        expect(updatedAccounts).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ id: 1, balance: 3850 }),
                expect.objectContaining({ id: 2, balance: 7500 }),
            ])
        );
    });

    test('it should throw an error when transfer amount is greater than payer account', () => {
        const payerAccount = new Account(1, 1200);
        const receiverAccount = new Account(2, 2000);
     
        const updatedAccounts = () => {
            internationalTransfer(payerAccount, receiverAccount, 1200);
        };
     
        expect(updatedAccounts).toThrow(Error('Balance lower than the transfer amount (transfer + tax).'));
    });

    test('it should throw an error when transfer amount is less than the determined limit', () => {
        const payerAccount = new Account(1, 2000);
        const receiverAccount = new Account(2, 2000);
     
        const updatedAccounts = () => {
            internationalTransfer(payerAccount, receiverAccount, 500);
        };
     
        expect(updatedAccounts).toThrow(Error('Invalid transfer amount.'));
    });
});
 