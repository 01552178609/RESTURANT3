// مصفوفة لتخزين الأطعمة المختارة
let selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];

// وظيفة لإظهار منيو الطعام
function showMenu() {
    document.getElementById("welcome-section").style.display = "none";
    document.getElementById("menu-section").style.display = "block";
}

// وظيفة لإضافة الأطعمة للطلب
function addItem(item, price) {
    // إضافة الطعام إلى المصفوفة
    selectedItems.push({ item, price });
    localStorage.setItem('selectedItems', JSON.stringify(selectedItems));

    // عرض رسالة التنبيه داخل الصفحة
    const notification = document.getElementById('notification');
    notification.textContent = `${item} added to your order!`;
    notification.classList.add('show');  // إضافة الكلاس لعرض الرسالة

    // إخفاء الرسالة بعد 3 ثواني
    setTimeout(() => {
        notification.classList.remove('show');  // إزالة الكلاس بعد 3 ثواني
    }, 3000);
}

// وظيفة لإظهار صفحة مراجعة الطلب
function showReview() {
    document.getElementById("menu-section").style.display = "none";
    document.getElementById("review-section").style.display = "block";

    let totalPrice = 0;
    const orderSummary = document.querySelector('.order-summary');

    // مسح محتوى المراجعة السابقة
    orderSummary.innerHTML = '';

    // عرض الأطعمة المختارة في صفحة المراجعة مع إضافة زر الحذف
    selectedItems.forEach((item, index) => {
        totalPrice += item.price;

        const itemDiv = document.createElement('div');
        itemDiv.classList.add('order-item');

        itemDiv.innerHTML = `
            <span>${item.item} - ${item.price} EGP</span>
            <div>
                <button class="delete-btn" onclick="removeItem(${index})">Remove</button>
                <button class="add-btn" onclick="showMenu()">Add Another Item</button>
            </div>
        `;

        orderSummary.appendChild(itemDiv);
    });

    const totalDiv = document.createElement('div');
    totalDiv.classList.add('total-price');
    totalDiv.textContent = `Total Price: ${totalPrice} EGP`;
    orderSummary.appendChild(totalDiv);
}

// وظيفة لحذف عنصر من الطلب
function removeItem(index) {
    // إزالة العنصر من المصفوفة
    selectedItems.splice(index, 1);
    localStorage.setItem('selectedItems', JSON.stringify(selectedItems));

    // إعادة عرض صفحة المراجعة بعد التعديل
    showReview();
}

// وظيفة لإرسال الطلب
function submitOrder() {
    const tableNumber = document.getElementById('table-number').value;
    if (tableNumber) {
        alert(`Order submitted for table ${tableNumber}`);
        localStorage.clear(); // مسح الأطعمة بعد الإرسال
        window.location.reload(); // إعادة تحميل الصفحة
    } else {
        alert("Please enter your table number.");
    }
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then((registration) => {
            console.log('Service Worker registered with scope:', registration.scope);
        }).catch((error) => {
            console.log('Service Worker registration failed:', error);
        });
    });
}
