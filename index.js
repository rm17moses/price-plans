import express from 'express';
import { getPricePlans, addPricePlan, updatePricePlan, deletePricePlan, totalPhoneBill, billTotals, clearTotalsTable } from './db.js';

const app = express();
app.use(express.static('public'));
app.use(express.json());

const PORT = process.env.PORT || 3010;

// TOTAL PHONE BILL API

app.post('/api/phonebill/', async (req, res) => {
    const plan_name = req.body.plan_name;
    const actions = req.body.actions;
    try {
        const total = await totalPhoneBill(plan_name, actions);
        res.json({
            status: 'success',
            message: `Your total phone bill is ${total}`,
            total: total
        });
    } catch (error) {
        res.status(400).json({
            status: 'unsuccessful',
            message: error.message
        });
    }
});


// app.get('/api/phonebill/', (req, res) => {
//     const actionStores = req.app.locals.actionStores;
//     if (!actionStores) {
//         res.status(404).json({
//             status: 'unsuccessful',
//             message: 'Action store not found'
//         });
//     } else {
//         res.json({
//             status: 'success',
//             actionStores
//         });
//     }
// });




// SHOW PRICE PLANS API

app.get('/api/price_plans/', async (req, res) => {

    const plans = await getPricePlans();

    res.json({
        plans: plans
    })
});

// CREATE A NEW PRICE PLAN

app.post('/api/price_plan/create', async (req, res) => {
    const plan_name = req.body.plan_name;
    const sms_price = req.body.sms_price;
    const call_price = req.body.call_price;
    try {
        await addPricePlan(plan_name, sms_price, call_price);

        res.json({
            status: 'success',
            message: `A new price plan was created`,
            plan_details: `Price plan created: Price Plan: ${plan_name} | SMS Price: ${sms_price} | Call Price: ${call_price}`,
            name: plan_name,
            call_cost: call_price,
            sms_cost: sms_price
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        });

    }

})

// UPDATE A PRICE PLAN

app.post('/api/price_plan/update', async (req, res) => {
    const plan_name = req.body.plan_name;
    const sms_price = req.body.sms_price;
    const call_price = req.body.call_price;
    const id = req.body.id;

    try {
        await updatePricePlan(plan_name, sms_price, call_price, id);

        res.json({
            message: `The price plan '${plan_name}' was updated`,
            updated_details: `The Price Plan '${plan_name}' sms cost is now ${sms_price} and the call cost is ${call_price}.`,
            name: plan_name,
            call_cost: call_price,
            sms_cost: sms_price,
            id: id
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
})

// DELETE A PRICE PLAN

app.post('/api/price_plan/delete', async (req, res) => {
    const plan_name = req.body.plan_name;
    await deletePricePlan(plan_name);

    res.json({
        message: `Price plan '${plan_name}' deleted`,
        plan_name: plan_name
    })

})

// TOTALS

app.get('/api/price_plan/totals', async (req, res) => {
    const totals = await billTotals();
    try {
        res.json({
            status: 'success',
            totals: totals
        });
    } catch (error) {
        res.status(400).json({
            status: 'unsuccessful',
            message: error.message
        })
    }
})

// DELETE TOTALS

app.post('/api/price_plan/clear_totals', async (req, res) => {
    const deleteTotals = await clearTotalsTable();
    res.json({
        status: 'success',
        message: 'Totals table cleared.',
        clear_totals: deleteTotals
    })
})




app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))