import { Router } from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { Account } from '../models/account.model.js';
import mongoose from 'mongoose';

const router = Router();

router.get('/balance', authMiddleware, async (req, res) => {
    const userId = req.userId;
    const account = await Account.findOne({userId: userId})
    if(account) {
        return res.status(200).json({
            balance: account.balance
        })
    } else {
        return res.status(403).json({
            message: "Something went wrong"
        })
    }
})


// transfer
router.post('/transfer', authMiddleware, async (req, res) => {
    try {
        const session = await mongoose.startSession();

        session.startTransaction();

        const toAccountId = req.body.to;
        const amount = req.body.amount;

        const fromAccount = await Account.findOne({userId: req.userId}).session(session)
        if(!fromAccount || fromAccount.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Insufficient Balance"
            });
        }

        const toAccount = await Account.findOne({userId: toAccountId});
        if(!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid Account"
            })
        }

        await Account.updateOne({userId: req.userId} , {
            $inc: {
                balance: -amount
            }
        }).session(session)

        await Account.updateOne({userId: toAccountId}, {
            $inc: {
                balance: +amount
            }
        }).session(session);

        // 
        await session.commitTransaction();
        res.json({
            message: "Transfer Successful"
        })
    } catch (error) {
        await session.abortTransaction();
        res.status(400).json({
            message: "Something went wrong"
        })
    }
    
})

/** 
// bad solution
router.post('/transfer', authMiddleware, async (req, res) => {
    const fromAccountId = req.userId;       // this userId belongs to account holder from which money is being transferred
    const toAccountId = req.body.toAccount;
    const amount = req.body.amount;

    const toAccount = await Account.findOne({userId: toAccountId})
    const fromAccount = await Account.findOne({userId: fromAccountId});    // this userId belongs to account holder to which money is being transferred

    // check if account where money is being transfered exists
    if(!toAccountId) {
        return res.status(400).json({
            message: "Invalid account"
        })
    }

    // check insufficient balance
    
    if(fromAccount.balance < amount) {
        return res.status(400).json({
            message: "Insufficient balance"
        })
    }
    console.log("before", toAccount.balance, fromAccount.balance)

    // transfer money 
    toAccount.balance = toAccount.balance + amount;
    fromAccount.balance = fromAccount.balance - amount;
    toAccount.save()
    fromAccount.save()
    console.log("after", toAccount.balance, fromAccount.balance)
    return res.status(200).json({message: "Transfer Successful"})
})

*/

export default router


