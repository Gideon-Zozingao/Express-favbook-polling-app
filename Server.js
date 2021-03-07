const express=require("express");
const path=require("path");

const app=express();

const port=4001;

let pollData=[];
//parsing and using the static server files
app.use('/public', express.static(path.join(__dirname, 'public')))

app.get('/',(req,res)=>{
	res.sendFile(path.join(__dirname,"index.html"));
})
app.use(express.urlencoded({
  extended: true
}))

app.get('/polling',(req,res)=>{
	let name=req.query.Username;
	let book=req.query.favBook;
	let data={
		name:name,
		favBook:book
	};

	pollData.push(data);

	console.log(`Poling data Recieved  at ${new Date()} name :${name}, Fav Book: ${book}`);
	res.send(`Poling data Recieved Name: ${name},Fav Book: ${book}`);
})
app.get('/view-book-score',(req,res)=>{
	let reqBook=req.query.book;
	let bookCount=0;
	let favNames=[];
	if(pollData.length>0){
		let entries=`<ul>
					${pollData.map(data=>
						
							`<li>${data.name}-> <b>${data.favBook}</b> </li>`
						
						)}	
			        </ul>`;
		
		res.send(entries);
		
		
	}else{
		res.send("<h6>No Polls Entry at the Moment</h6>");

	}
	
	console.log(`Poll request for ${reqBook} at ${new Date()}`);
	
})


//Create the instance of the Server and run it on PORT 4001
app.listen(port,()=>{
	console.log(`Your Application server has statted and  Runing at localhost:${port}`)
});