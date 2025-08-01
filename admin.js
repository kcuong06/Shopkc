
document.addEventListener('DOMContentLoaded', () => {
  const accList = document.getElementById('admin-acc-list');
  const orders = document.getElementById('orders');
  const dbRef = firebase.firestore().collection('accounts');

  dbRef.get().then(snapshot => {
    let total = 0, done = 0;
    snapshot.forEach(doc => {
      const acc = doc.data();
      total++;
      if (acc.trangthai === 'da') done++;
      const div = document.createElement('div');
      div.className = 'card';
      div.innerHTML = \`
        <p>${acc.loai} - ${acc.gia}₫</p>
        <p>TK: ${acc.taikhoan}</p>
        <p>MK: ${acc.matkhau}</p>
        <p>Trạng thái: ${acc.trangthai}</p>
        <button onclick="deleteAcc('${doc.id}')">Xóa acc</button>
      \`;
      accList.appendChild(div);
    });
    orders.innerHTML = \`<p>Tổng acc: \${total} | Đã bán: \${done} | Doanh thu: \${done * 20000}₫</p>\`;
  });
});

function deleteAcc(id) {
  firebase.firestore().collection('accounts').doc(id).delete().then(() => {
    alert("Đã xóa!");
    location.reload();
  });
}
