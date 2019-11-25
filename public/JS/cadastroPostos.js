var formulario = document.getElementById('divCentral');

formulario.onsubmit = function(){
   if(!document.getElementById("input[type='text']").value){
      alert("Campo nome vazio!");
      return false;
   }
   
   alert("ok");
}