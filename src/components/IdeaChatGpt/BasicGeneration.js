import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default function BasicGeneration() {
  const [title, setTitle] = useState("");
  const [firstOption, setFirstOption] = useState("Low");
  const [secondOption, setSecondOption] = useState("Low");
  const [thirdOption, setThirdOption] = useState("Low");
  const [result, setResult] = useState("");
  const TEMPLATE = `
  You are an idea assistant who helps product planners generate ideas. 
  you are tasked with providing 5 appropriate ideas for products based on the options the user selects. 
  Check the current set of idea options and generate different results based on the selection. 
  
  The product: ${title}.
  
  ## Idea Selected part: 
  
  -Degree of innovation of the idea: 
  ${
    firstOption === "High"
      ? "High {Degree to which the product is innovative by significantly changing the functionality of existing products}"
      : "Low {Degree to which the product does not significantly change the functionality of existing products}"
  },
  
  -The extent to which the market for the product will change: 
  ${
    secondOption === "High"
      ? "High [The extent to which the market for the product is different from the existing market for the product]"
      : "Low [The extent to which the market for the product is similar]"
  } 
  
  -Uses of the product:

  ${
    thirdOption === "High"
      ? "High {Different uses of the product are suggested}"
      : "Low {Similar uses of the product are suggested}"
  }
  
  
  ## Format: 
  -Idea Name:
  -Idea Description:
  \n
  
  **Respone in Korean
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

  const name = ["firstOption", "secondOption", "thirdOption"];

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

        {[
          { state: firstOption, setState: setFirstOption },
          { state: secondOption, setState: setSecondOption },
          { state: thirdOption, setState: setThirdOption },
        ].map((obj, index) => (
          <FormControl
            variant="outlined"
            size="small"
            style={{ width: "200px" }}
          >
            <InputLabel>{name[index]}</InputLabel>
            <Select
              value={obj.state}
              onChange={(e) => obj.setState(e.target.value)}
              label="Priority"
            >
              <MenuItem value={"High"}>High</MenuItem>
              <MenuItem value={"Low"}>Low</MenuItem>
            </Select>
          </FormControl>
        ))}

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
