let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount =document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let search = document.getElementById('search');
let searchTitle = document.getElementById('searchTitle');
let searchCategory = document.getElementById('searchCategory');
let update = document.getElementById('update');
let dalete = document.getElementById('dalete')
let myinput = document.getElementById('myinput')
let mood = 'create'
let tmp;
// console.log(title ,price,taxes,ads,discount,total,count,category,submit,search,searchTitle,searchCategory,update,dalete);

// function get total
function gettotal(){
  // console.log('done');
  if(price.value != ''){
    let result =(+price.value + +taxes.value + +ads.value - +discount.value)
    total.innerHTML = result
    total.style.background = '#040'
  }else{
    total .innerHTML = ''
    total.style.background = '#a00'
  }
}

//create prouduct
let datapro;
if(localStorage.prouduct != null){
  datapro = JSON.parse(localStorage.prouduct)
}else{
  datapro =[];
}



submit.onclick = function(){
  // console.log('don');

  let newpro = {
    title : title.value,
    price : price .value,
    taxes : taxes.value,
    ads : ads.value,
    discount : discount.value,
    total :  total.innerHTML,
    count : count.value,
    category : category.value,
  }
  if(mood === 'create'){
    if(newpro.count>1){
      for(let i=0 ; i < newpro.count ; i++){
        datapro.push(newpro)
      }
    }else{
      datapro.push(newpro)
    }
  }else{
        datapro[tmp]= newpro;
        mood = 'create'
        submit.innerHTML='create'
        count.style.display=''
  }
 
  // datapro.push(newpro)
  //save localStorage
  localStorage.setItem('prouduct' ,    JSON.stringify(datapro) )
  // console.log(datapro);
  clearinput();
  showdata();
}


// clear input

function clearinput(){
  title : title.value = '';
  price : price .value = '';
  taxes : taxes.value = '' ;
  ads : ads.value = '';
  discount : discount.value = '' ;
  total :  total.innerHTML= '' ;
  count : count.value = '' ;
  category : category.value = '' ;
}

// show data
function showdata(){
 let carton =''
 for(let i=0 ; i<datapro.length ; i++){
  carton += `
  <tr>
  <td>${i}</td>
  <td>${datapro[i].title}</td>
  <td>${datapro[i].price}</td>
  <td>${datapro[i].taxes}</td>
  <td>${datapro[i].ads}</td>
  <td>${datapro[i].discount}</td>
  <td>${datapro[i].total}</td>
  <td>${datapro[i].category}</td>
  <td><button onclick="updatedata(${i})" id="update">update</button></td>
  <td><button onclick="daletedata(${i})" id="dalete">dalete</button></td>
 </tr>
    `
 }
 document.getElementById('tbody').innerHTML=carton;
 let btndeleteall = document.getElementById('deleteall')
 if(datapro.length>0){
  btndeleteall.innerHTML =`
  <button onclick="daleteall()">dalete all(${datapro.length})</button>
  `
 }else{
  btndeleteall.innerHTML=''
 }
 gettotal()
}
showdata();

//daletet data

function daletedata(i){
 datapro.splice(i,1);
 localStorage.prouduct =    JSON.stringify(datapro) ;
 showdata();
}

function daleteall(){
  localStorage.clear();
  datapro.splice(0)
  showdata();
}
 
//updatedata
function updatedata(i){
  title.value = datapro[i].title;
  price.value = datapro[i].price;
  taxes.value = datapro[i].taxes;
  ads.value = datapro[i].ads;
  discount.value = datapro[i].discount;
  gettotal();
  count.style.display='none'
  category.value = datapro[i].category;
  submit.innerHTML = 'update'
  mood = 'update'
  tmp = i;
  scroll({
    top:0,
    behavior:'smooth',
  })
}
// updatedata()

//search
 let searchmood ='title';

 function getsearchmood(id){
  // console.log(id);
  let search = document.getElementById('search')
  if(id === 'searchTitle'){
    searchmood ='title'
    search.placeholder = 'search by title'
  }else{
    searchmood ='category'
    search.placeholder = 'search by category'
  }
  search.focus()
  search.value =''
  searchdata()
  // console.log(searchmood);
 }

 function searchdata(value){
  //  console.log(value);
  let carton ='';
  if(searchmood == 'title'){
    for(let i=0 ; i<datapro.length ;i++){
      if(datapro[i].title.includes(value)){
        carton += `
  <tr>
  <td>${i}</td>
  <td>${datapro[i].title}</td>
  <td>${datapro[i].price}</td>
  <td>${datapro[i].taxes}</td>
  <td>${datapro[i].ads}</td>
  <td>${datapro[i].discount}</td>
  <td>${datapro[i].total}</td>
  <td>${datapro[i].category}</td>
  <td><button onclick="updatedata(${i})" id="update">update</button></td>
  <td><button onclick="daletedata(${i})" id="dalete">dalete</button></td>
 </tr>
    `
      }
    }
  }else{
    for(let i=0 ; i<datapro.length ;i++){
      if(datapro[i].category.includes(value)){
        carton += `
  <tr>
  <td>${i}</td>
  <td>${datapro[i].title}</td>
  <td>${datapro[i].price}</td>
  <td>${datapro[i].taxes}</td>
  <td>${datapro[i].ads}</td>
  <td>${datapro[i].discount}</td>
  <td>${datapro[i].total}</td>
  <td>${datapro[i].category}</td>
  <td><button onclick="updatedata(${i})" id="update">update</button></td>
  <td><button onclick="daletedata(${i})" id="dalete">dalete</button></td>
 </tr>
    `
      }
    }
  }
  document.getElementById('tbody').innerHTML=carton;
 }