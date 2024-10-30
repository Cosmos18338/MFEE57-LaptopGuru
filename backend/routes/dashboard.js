import express from 'express'
const router=express.Router()

import sequelize from '##/configs/db.js'

router.get('/',async function (req,res){
    try{
        const [users] = await sequelize.query('SELECT * FROM users')
        return res.json({status:'success',data:{users}})
    }catch(error){
        console.error('無法取得資料:',error)
        return res.status(500).json({status:'error',message:'無法連接'})
    }
})

export default router