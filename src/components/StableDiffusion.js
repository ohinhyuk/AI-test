import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default function StableDiffusion() {
  const [generatedImageUrl, setGeneratedImageUrl] = useState("");
  const [title, setTitle] = useState("");

  const handleClick = async () => {
    const response = await openai.createImage({
      prompt: title,
      n: 1,
      size: "1024x1024",
    });

    setGeneratedImageUrl(response.data.data[0].url);
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
          justifyContents: "center",
          alignItems: "center",
          gap: "30px",
        }}
      >
        <img
          src={generatedImageUrl}
          width={300}
          height={300}
          alt="생성 이미지"
        />
        <TextField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          label="생성할 이미지 이름"
        />
        <Button variant="outlined" color="primary" onClick={handleClick}>
          이미지 생성
        </Button>
      </Box>
    </Box>
  );
}
