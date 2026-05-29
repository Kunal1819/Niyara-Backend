const API_KEY = "AIzaSyC94U8FiUga4gQgH8A-Nm4QxMnGDFBV7ic"; 

async function listModels() {
  console.log(" Asking Google what models this key can see...");
  
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      console.log(" CRITICAL ERROR:");
      console.log(JSON.stringify(data.error, null, 2));
    } else {
      console.log(" SUCCESS! Here are the models your key can access:");
      //kisko poochke ye code dekh rahe ho ???
      const names = data.models.map(m => m.name);
      console.log(names);
    }
  } catch (err) {
    console.log("Network Error:", err);
  }
}

listModels();
