const exp=require('express')
const app = exp()
const path = require('path')

app.use(exp.json())

app.get('/info',(req,res)=>{
    res.send(`<div>
        <h2 style="color:red;">Server running for GEMINI Ai API</h2>
        <img style="width:300px;height:300px;border-radius:50px" src='./profile.png'/>
        <h3>Goutham reddy Uppunuri</h3>
        <p>Student at VNRVJIET</p>
        <p>phone :- +91 9398141936</p>
        <a href='https://www.linkedin.com/in/goutham-reddy-279782283?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'>linked in</a>
        <a href='https://www.instagram.com/go.utham8129?igsh=MTFpM3Q5eHhoMHpjMQ=='>instagram</a>
        <a href='https://chatgpt-x0sc.onrender.com/myresume'>my resume</a>
        <a href='https://chatgpt-x0sc.onrender.com'>visit website</a>
        <a href='mailto:uppinurigouthamreddy@gmail.com'>contact developer (email)</a>
        </div>`)
})
app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,'./index.html'))
})
app.get('/myresume',async(req,res)=>{
  res.sendFile(path.join(__dirname,'./gouthamreddy.pdf'));
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