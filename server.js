const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// تمكين استقبال البيانات بصيغة JSON
app.use(express.json());
app.use(cors());

// قائمة الطلبات
let orders = [];

// استقبال الطلب من الواجهة الأمامية
app.post("/order", (req, res) => {
    const { tableNumber, order } = req.body;

    // التحقق من صحة البيانات
    if (!tableNumber || !Array.isArray(order) || order.length === 0) {
        return res.status(400).json({ message: "يجب إدخال رقم الطاولة وقائمة الطلبات" });
    }

    const newOrder = {
        tableNumber,
        order,
        time: new Date().toISOString() // حفظ الوقت بصيغة ISO
    };

    orders.push(newOrder);
    console.log("🔹 تم استقبال طلب جديد:", newOrder); // طباعة الطلب في الكونسول

    res.status(201).json({ message: "تم استقبال الطلب بنجاح!", order: newOrder });
});

// استرجاع جميع الطلبات
app.get("/orders", (req, res) => {
    res.json(orders);
});

// تشغيل الخادم
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
