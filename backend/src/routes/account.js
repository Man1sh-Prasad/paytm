import { Router } from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { Account } from '../models/account.model.js';

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

export default router