let userName = document.getElementById('email');
let passWord = document.getElementById('password');
let loginBtn = document.getElementById('login_button');

loginBtn.addEventListener("click" ,function(){

    let info = {
        email : userName.value,
        password : passWord.value
      }  

    fetch('http://localhost:5680/loginform',{
    method : 'POST',
    body: JSON.stringify(info),
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(datas => datas.text())
    .then(resp => {
      console.log(resp)
    })
    userName.value = ''
    passWord.value = ''
});