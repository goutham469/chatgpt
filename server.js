const exp=require('express')
const app = exp()
const path = require('path')

app.use(exp.json())

app.get('/info',(req,res)=>{
    res.send(`<div>
        <h2 style="color:red;">Server running for GEMINI Ai API</h2>
        <a href='https://chatgpt-x0sc.onrender.com'>visit website</a>
        <a href='mailto:uppinurigouthamreddy@gmail.com'>contact developer (email)</a>
        </div>`)
})
app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,'./index.html'))
})

// console.log(process.env.GEMINI_API_KEY)

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI("AIzaSyAkJNyzl0m2fcr2XZu4ch_RxYw3lnFaPfA");

async function run(prompt) {
  // Choose a model that's appropriate for your use case.
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});


  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  console.log(text);
  return text;
}

app.post('/chat',async(req,res)=>{
  let response_from_model = await run(req.body.prompt);
  res.send({"message_from_model":response_from_model});
})






app.listen(4000,()=>{console.log("server running on port 4000...")})