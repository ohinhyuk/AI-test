import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import ValueAutoKeyword from "./ValueAutoKeyword";

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default function ValueGeneration() {
  const [title, setTitle] = useState("");
  const [firstOption, setFirstOption] = useState("");
  const [secondOption, setSecondOption] = useState("");
  const [thirdOption, setThirdOption] = useState("");
  const [result, setResult] = useState("");
  const TEMPLATE = `
  You're an idea assistant who helps product planners generate ideas.

  Your goal is to come up with 5 innovative ideas for a product. 
  Provide 5 ideas to a question created based on user input. Take a deep breath and think step by step.


  A product: ${title}.
  
  ## Formulated Questions: 
  어떻게 하면 {Office workers in their 20s}에게  {Change the design}하여  {Increase usability} 할 수 있을까? 

  ## Idea Selection Options: 
  - **Who:** ${firstOption}
  - **How:** ${secondOption}
  - **Value:** ${thirdOption}
  
  ## Format:

  Each idea should be submitted according to the format below. 
  - Idea Name:
  - Idea Description:** (Include a brief description of the idea and how it relates to the selected 'Who', 'How', and 'Value' options.)
  
  ## Example ideas:
  
  ### Idea 1.
  - Idea Name:** Mobile-controlled massage chair
  - Idea Description:** For a target audience of office workers in their 20s, introduce the ability to control the massage chair via a mobile app. The design changes include using a smartphone instead of a traditional remote control, and providing the app with a user-friendly UI/UX design to enhance usability.
  

  
  ** Response in Korean
  
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

  const name = ["Who", "How", "Value"];

  const handleGeneration = () => {
    chatGptApi();
  };
  return (
    <Box
      sx={{
        width: "100vw",
        height: "150vh",
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
          가치창출
        </Typography>
        <TextField value={title} onChange={handleChange} label="title" />

        {[
          { state: firstOption, setState: setFirstOption },
          { state: secondOption, setState: setSecondOption },
          { state: thirdOption, setState: setThirdOption },
        ].map((obj, index) => (
          <TextField
            value={obj.state}
            onChange={(e) => obj.setState(e.target.value)}
            label={name[index]}
          />
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

      <ValueAutoKeyword />
    </Box>
  );
}
