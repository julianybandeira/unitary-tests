import { Account } from '../account.js';
import * as accounts from '../accounts';
import { transferMoney } from '../transferMoney.js';

describe('transfer with tax', () => {
    test('it should charge 100 + 5% from the payer account with 10000 for a 1000 transfer to a receiver account with 0', () => {
        const payerId = 1;
        const receiverId = 2;

        accounts.getAccount = jest.fn()
            .mockReturnValueOnce(new Account(payerId, 10000))
            .mockReturnValueOnce(new Account(receiverId, 0))

        const updatedAccounts = transferMoney(payerId, receiverId, 1000);

        expect(updatedAccounts).toHaveLength(2);
        expect(updatedAccounts).toEqual(
            expect.arrayContaining([
                expect.objectContaining({id: 1, balance: 8850}),
                expect.objectContaining({id: 2, balance: 1000}),
            ])
        );
    });

    test('it should charge 100 + 10% from the payer account with 10000 for a 5500 transfer to a receiver account with 2000', () => {

        const payerId = 1;
        const receiverId = 2;

        accounts.getAccount = jest.fn()
            .mockImplementationOnce((id) => new Account(id, 10000))
            .mockImplementationOnce((id) => new Account(id, 2000))
     
        const updatedAccounts = transferMoney(payerId, receiverId, 5500);

        expect(updatedAccounts).toHaveLength(2);
        expect(updatedAccounts).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ id: 1, balance: 3850 }),
                expect.objectContaining({ id: 2, balance: 7500 }),
            ])
        );
    });

    test('it should throw an error when transfer amount is greater than payer account', () => {
        
        const payerId = 1;
        const receiverId = 2;
        accounts.getAccount = jest.fn()
            .mockReturnValueOnce(new Account(payerId, 1200))
            .mockReturnValueOnce(new Account(receiverId, 2000))

        const updatedAccounts = () => {
            transferMoney(payerId, receiverId, 1200);
        }
        expect(updatedAccounts).toThrow(Error('Balance lower than the transfer amount (transfer + tax).'));
    });

    test('it should throw an error when transfer amount is less than the determined limit', () => {
        const payerAccount = new Account(1, 2000);
        const receiverAccount = new Account(2, 2000);
     
        const updatedAccounts = () => {
            transferMoney(payerAccount, receiverAccount, 500);
        };
     
        expect(updatedAccounts).toThrow(Error('Invalid transfer amount.'));
    });


    test("it should test a mock of current date", () => {
        Date.now = jest.fn().mockReturnValue("2017-01-01")
 
        expect(Date.now()).toBe("2017-01-01")
    });
});
 