import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default function KeywordGeneration() {
  const [title, setTitle] = useState("");
  const [keywords, setKeywords] = useState("");
  //   const [secondOption, setSecondOption] = useState("Low");
  //   const [thirdOption, setThirdOption] = useState("Low");
  const [result, setResult] = useState("");
  const TEMPLATE = `
  **You are a creative assistant that provides innovative product ideas based on specific keywords. 
  Your mission is to combine the given keywords seamlessly, formulating five distinct concepts for the designated product. 
  These ideas should:
  
  1. Facilitate expansive thinking for product planners.
  2. Be intrinsically tied to the nature of the product.
  3. Effectively incorporate ALL the provided keywords.
  
  Product: {Lounger Chair}
  
  ## Keywords 
  ${keywords
    .split("#")
    .map((key, index) => `- {Keyword${index + 1}: ${key}}`)} \n
  
  ## Presentation Format:
  
  **.
  - Idea Title:
  - Description:
  
  ## For better understanding, see the examples below:
  
  - Idea Title: Chocolate-Themed Family Lounger
  - Description: 
  The lounger chair is designed to resemble individual pieces of chocolate. Each segment offers varying comfort levels, allowing family members to select their 'chocolate comfort piece'. The user-friendly interface ensures easy adjustments to seating preferences.
  
  - Idea Title: Sweet Comfort Lounger
  - Description:
  Infuse the lounger chair with a subtle chocolate scent, enhancing relaxation during use. Designed to be user-friendly, the chair offers a range of comfort settings, ensuring every family member finds their perfect relaxation mode.
  
  
  ** Response in Korean **
    `;

  const chatGptApi = async () => {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: TEMPLATE,
        },
      ],
    });

    setResult(completion.data.choices[0].message.content);
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setTitle(e.target.value);
  };

  const handleGeneration = () => {
    chatGptApi();
  };
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "30px",
      }}
    >
      <Box
        sx={{
          width: "500px",
          height: "500px",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          justifyContent: "center",
          alignItems: "center",
          border: 1,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
          }}
        >
          기본생성
        </Typography>
        <TextField value={title} onChange={handleChange} label="title" />

        <TextField
          sx={{ width: "500px" }}
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          placeholder="키워드들을 #으로 구분해주세요. ex) key1#key2#key3"
          label="키워드"
        />

        <Button onClick={handleGeneration}>아이디어 생성</Button>
      </Box>
      <Box
        sx={{
          width: "500px",
          height: "500px",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            whiteSpace: "pre-line",
          }}
        >
          {result.split("아이디어 이름:").join("\n아이디어 이름:")}
        </Typography>
      </Box>
    </Box>
  );
}
