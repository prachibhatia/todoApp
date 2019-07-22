

let todo = document.getElementById('todojs');
let addbtn = document.getElementById('addbtn');
let i ;

window.onload = ()=>{
   fetch('http://localhost:5680/alltodo')
   .then(res => res.text())
   .then(todo => {
          todo = JSON.parse(todo)
          console.log(todo)
          for(i=0;i<todo.length;i++)
          {
            document.getElementById("exp").innerHTML +='<div class=" container sty">'+'<li>' +todo[i].todo_name+'</li>'+'<button class="btn btn-primary" onclick="mydel(event)" style="float:right;">'+'DEL'+'</button>'+'<button class="btn btn-primary" onclick="myedit(event)" style="float:right;">'+'EDIT'+'</button>'+'</div>'
            todo.value = ''
          }
   })
}

addbtn.addEventListener("click" ,function(){
  console.log(todo.value)
  
  let datas = {
    todos : todo.value
  }

  fetch('http://localhost:5680/todos',{
    method : 'POST',
    body: JSON.stringify(datas),
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(data => data.text())
    .then(resp => {
      console.log(resp)
    })
  document.getElementById("exp").innerHTML +='<div class=" container sty">'+'<li>' +todo.value+'</li>'+'<button class="btn btn-primary" onclick="mydel(event)" style="float:right;">'+'DEL'+'</button>'+'<button class="btn btn-primary" onclick="myedit(event)" style="float:right;">'+'EDIT'+'</button>'+'</div>'
  todo.value = ''
} );

  function clearAll()
  {
      fetch('http://localhost:5680/deleteAll',{
        method : 'DELETE',
      }
      ).then(res => res.json())
        .then(status =>{
          console.log(status)
        })
      console.log(document.getElementById('exp'));
      document.getElementById("exp").innerHTML="";

  }

 function mydel(event){
     console.log(this.event.target.parentNode);
     document.getElementById('exp').removeChild(this.event.target.parentNode)
 }

 function demo(event){
     //alert('hi')
     var newValInput =  document.getElementById("p")
     console.log("==")
     console.log(newValInput.value);
     let liHtml = newValInput.parentNode.innerHTML;
     console.log("liHtml")
     newValInput.parentNode.innerHTML = newValInput.value;
     console.log(event.target.innerText)
     event.target.innerText = 'Edit'
     event.target.onclick = myedit
 }

 function myedit(event)
 {
   //alert(event.target.parentNode.firstChild.innerHTML)
   previousTodoValue = event.target.parentNode.firstChild.innerHTML
   event.target.parentNode.firstChild.innerHTML = '<input type="text" class="form-control" style="width:200px;" id="p" >'
     document.getElementById('p').value = previousTodoValue
    let List = event.target.parentNode;
    let btns = List.querySelectorAll('button.btn')
    let editBtn = btns[1]
    editBtn.innerHTML='ADD'
    editBtn.onclick = demo
 }