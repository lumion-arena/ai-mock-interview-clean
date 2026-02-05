import axios from "axios";

async function runTest() {
  const response = await axios.post("http://localhost:3000/interview", {
    role: "Software Engineer",
  });

  console.log(response.data);
}

runTest();
