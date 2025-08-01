
document.addEventListener('DOMContentLoaded', () => {
  const accContainer = document.getElementById('acc-container');
  const dbRef = firebase.firestore().collection('accounts');
  dbRef.get().then(snapshot => {
    snapshot.forEach(doc => {
      const acc = doc.data();
      if (acc.trangthai === 'chua') {
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `
          <h3>${acc.loai} - ${acc.gia}₫</h3>
          <button onclick="generateQR('${acc.gia}', 'ORD${doc.id}')">Mua ngay</button>
          <div id="qr-${doc.id}"></div>
        `;
        accContainer.appendChild(div);
      }
    });
  });
});
function generateQR(amount, content) {
  const url = \`https://img.vietqr.io/image/vietinbank-103878786764-compact2.png?amount=\${amount}&addInfo=\${content}&accountName=TRAN%20KHAC%20CUONG\`;
  const qr = document.createElement('img');
  qr.src = url;
  qr.style = 'margin-top:10px;';
  event.target.insertAdjacentElement('afterend', qr);
}
