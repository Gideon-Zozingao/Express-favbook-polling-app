let form=document.querySelector("#poling-form");
let viewScore=document.querySelector("#bookVScoreTaker");//ookVScoreTaker
form.addEventListener("submit",(e)=>{
let name=document.querySelector("#name").value;
let favBook=document.querySelector("#favBook").value;
	e.preventDefault();
	//console.log(`${name} ${favBook}`);
	if(name===""||favBook===""){
		let alert=document.createElement("p");
		 		alert.classList.add("warning");
		 		alert.textContent="Fields are empty"
		 		let message=document.querySelector(".messages");
		 		message.appendChild(alert);
		 		setTimeout(()=>{
		 			alert.remove()
		 		},1000);

	}else{
		let endpoint=`/polling?Username=${name}&favBook=${favBook}`;
		let pollData={
			name:name,
			book:favBook
		};
		let XHR=new XMLHttpRequest();
		  XHR.open("GET",endpoint,true);
		 XHR .onreadystatechange=function(){
		 	if (this.readyState==4&&this.status==200) {
		 		form.reset();
		 		let alert=document.createElement("p");
		 		alert.classList.add("success");
		 		alert.textContent=this.responseText;
		 		let message=document.querySelector(".messages");
		 		message.appendChild(alert);
		 		setTimeout(()=>{
		 			alert.remove()
		 		},3000);
		 		console.log(this.responseText);

		 	}else{
		 		console.log(this.responseText);

		 	}
		 }
		  XHR .send();
		//console.log(pollData);
	}
})


viewScore.onchange=function(){
	let scoreBoard=document.querySelector(".scoreBoard");
	let book=this.value;
	if(book!=""){
		let endpoint1=`/view-book-score?book=${book}`;
	let XR=new XMLHttpRequest();
	XR.open("GET",endpoint1,true);

	XR.onreadystatechange=function(){
		if (this.readyState==4&&this.status==200){

//let scoreBoard=document.querySelector(".scoreBoard");
	scoreBoard.innerHTML=this.responseText;
			
		}else{
			//alert(this.responseText);
		}
	}
	XR.send();
	}else{
		scoreBoard.innerText="";

	}
	
	// alert(`You Selected the Book ${book}`);
}