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
  I am in the process of planning a {Massage Chair} product. Please propose random words from the perspective of a product planner. The words provided should act as keywords to assist in divergent thinking in planning the massage chair. Please provide 30 keywords.

    ##Rule:

    Keywords should help the product planner derive product ideas.
    Keywords must be as detailed as possible.
    Keywords must be provided in noun form.
    No adjectives should be used for the keywords.
    All responses should be in Korean.

    ##Format:
    keyword1: ${firstOption} in JSON format

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
