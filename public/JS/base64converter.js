const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

async function Main() {
 const file = document.querySelector('#foto').files[0];

 document.getElementById('base64photo').value = await toBase64(file);
}