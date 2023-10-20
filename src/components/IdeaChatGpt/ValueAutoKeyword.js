import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default function ValueAutoKeyword() {
  const [result, setResult] = useState("");
  const [title, setTitle] = useState("");
  //   const TEMPLATE = `
  //     "
  //     When planning a product like a {chair}, I need you to identify 20 keywords per category that would be relevant to a product planner. Your keywords should be relevant to the product and should help the product planner plan the product.

  //     Category: chair

  //     Target: {for example, seniors, women in their 30s, people with herniated discs}

  //     Method:

  //     Results:

  //     #Format:
  //     {Target: 20 keywords}
  //     {Method: 20 keywords}
  //     {Results: 20 keywords}
  //     "
  //     `;

  const TEMPLATE = `

When planning a product like a ${title}, I need you to identify 20 keywords per category that would be relevant to a product planner. Your keywords should be relevant to the product and should help the product planner plan the product.

Category: ${title}
Target: {for example, seniors, women in their 30s, people with herniated discs}

Method:

Results:

Format:

{category: 20 keywords}
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

  return (
    <Box
      sx={{
        display: "flex",
        width: "500px",
        height: "500px",
        gap: "20px",
        flexDirection: "column",
        border: 1,
      }}
    >
      <TextField value={title} onChange={(e) => setTitle(e.target.value)} />
      <Button onClick={chatGptApi} variant="outlined">
        키워드 도출 프롬프트 생성
      </Button>
      <Box>{result}</Box>
    </Box>
  );
}
