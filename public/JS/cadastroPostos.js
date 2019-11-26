var button = document.getElementById('button');

button.onclick = function(){
    console.log(document.getElementsByName("nome"))
   if(!document.getElementsByName("nome").value){
      window.alert("Campo nome vazio!");
      return false;
   }

var formulario = document.getElementById("divCentral")
formulario.submit()

}