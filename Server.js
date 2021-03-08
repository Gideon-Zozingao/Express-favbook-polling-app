const express=require("express");
const path=require("path");

const app=express();

const port=4001;

let pollData=[];

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
	
	let favbook=[];
	
	if(pollData.length>0){
		for( let i=0;i<pollData.length; i++){
			let b=pollData[i].favBook;
			if(reqBook===b){
				favbook.push(b);
			}
		}
		
		console.log(`Request  for polling data at ${new Date()}`);
		res.send(`<b>${favbook.length}</b> liked ${reqBook}`)
	}else{
		res.send("<h6>No Polls Entry at the Moment</h6>");

	}
	
})


app.listen(port,()=>{
	console.log(`Your Application server has statted and  Runing at localhost:${port}`)
});