import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default function ImpactiveAIChatGpt() {
  const [beforeIdeas, setBeforeIdeas] = useState([]);
  const [beforeChat, setBeforeChat] = useState("");
  const [product, setProduct] = useState("");

  // const parseIdeas = (inputText) => {
  //   const segments = inputText.split(/-\s*아이디어 명:/);
  //   const parsedIdeas = segments
  //     .slice(1)
  //     .map((segment) => {
  //       // 첫 번째 세그먼트는 무시
  //       const match = segment.match(/^([^\n]*)\n/);
  //       return match && match[1].trim();
  //     })
  //     .filter(Boolean); // null 값 제거
  //   return parsedIdeas;
  // };

  const parseIdeas = (inputText) => {
    const segments = inputText.split(/-\s*아이디어 명:/);

    const parseIdeas = (inputText) => {
      const segments = inputText.split(/-\s*아이디어 명:/);

      const parsedIdeas = segments
        .slice(1)
        .map((segment) => {
          const ideaNameMatch = segment.match(
            /^([^\n]*)(?:-\s*아이디어 설명:)?/
          );
          const ideaDescMatch = segment.match(/-\s*아이디어 설명:([^\-]*)/);

          if (!ideaNameMatch || !ideaDescMatch) return null;

          const ideaName = ideaNameMatch[1].trim();
          const ideaDesc = ideaDescMatch[1].trim();

          return `아이디어 명: ${ideaName}\n아이디어 설명: ${ideaDesc}`;
        })
        .filter(Boolean); // null 값 제거

      return parsedIdeas;
    };
  };

  const IDEA_TEMPLATE = `
    너는 제품 기획자의 아이디어 생성을 돕는 아이디어 도우미야. 
    현재 너는 사용자가 선택하는 옵션에 따라  제품에 대한 적절한 아이디어를 5가지 제공해야해. 
    현재 아이디어 옵션 종류를 확인하고 선택에 따라 다른 결과가 나오게 끔 해줘.
    
    제품: ${product}
    
    ## 아이디어 선택된 부분: 
    -아이디어 혁신 정도: 상{기존 제품에서 기능 크게 바뀌어 혁신적인 제품이 제시되 정도}, 하 {기존 제품에서 기능이 크게 많이 바뀌지 않는 정도}
    -제품을 적용할 시장의 변화 정도:상{해당 제품이 판매되는 기존의 시장과 다른 시장이 제시되는 정도} ,하 {해당 제품이 판매되는 시장이 비슷한 정도}
    -제품의 용도 :상{해당 제품이 사용되는 용도와 다른 용도가 제시되는 정도} ,하 {해당 제품이 사용되는 용도가 비슷한 정도}
    
    
    ## 아이디어 옵션 종류 : 
    -아이디어 혁신 정도: 상
    -제품을 적용할 시장의 변화 정도: 상
    -제품의 용도 : 상
    
    ## Format: 
    
    **
    -아이디어 명: 
    -아이디어 설명:
    `;

  const splitEach5Ideas = (ideas) => {
    if (ideas.length === 0) return [];
    const result = [];
    for (let i = 0; i < ideas.length; i += 5) {
      result.push(ideas.slice(i, i + 5));
    }
    return result;
  };

  const ChatGptApi = async () => {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: IDEA_TEMPLATE,
        },
        // {
        //   role: "system",
        //   content:
        //     beforeIdeas.join() +
        //     " 여기 나와 있는 아이디어들과 중복 되지 않도록 생성 해줘",
        // },
        // splitEach5Ideas(beforeIdeas).map((fiveIdeas) => {
        //   return {
        //     role: "system",
        //     content:
        //       fiveIdeas.join() + "\n" + "이것들과도 중복 되지 않도록 생성 해줘",
        //   };
        // }
        // ),
        ...beforeIdeas.map((fiveIdeas) => {
          return {
            role: "system",
            content:
              "추가로" + fiveIdeas + "이것들과도 중복 되지 않도록 생성 해줘",
          };
        }),
      ],
    });
    // console.log(
    //   beforeIdeas
    //     ?.map((fiveIdeas) => {
    //       return {
    //         role: "system",
    //         content:
    //           "추가로" + fiveIdeas + "이것들과도 중복 되지 않도록 생성 해줘",
    //       };
    //     })
    //     .map((obj) => obj)
    // );

    // splitEach5Ideas(beforeChat).map((fiveIdeas) => {
    //   console.log({
    //     role: "system",
    //     content:
    //       fiveIdeas?.join() + "\n" + "이것들과도 중복 되지 않도록 생성 해줘",
    //   });
    // });
    // console.log(parseIdeas(completion.data.choices[0].message.content));

    // console.log("data" + completion.data);

    // console.log(completion.data.choices[0].message.content);

    await setBeforeIdeas((prev) => [
      ...prev,
      completion.data.choices[0].message.content,
    ]);

    // setBeforeChat(
    //   (prev) => prev + parseIdeas(completion.data.choices[0].message.content)
    // );
    // console.log(beforeIdeas);
    // console.log(beforeChat + completion.data.choices[0].message.content);
    // alert(
    //   beforeIdeas.join() +
    //     "\n" +
    //     "새로 생성되는 아이디어들이 위에 나와 있는 아이디어들과 중복 되지 않도록 생성 해줘"
    // );
  };
  const handleClick = () => {
    ChatGptApi();
  };
  console.log(...beforeIdeas);

  return (
    <Box
      sx={{
        width: "300px",
        height: "300px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "30px",
      }}
    >
      <TextField
        label="제품명"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
        variant="outlined"
      />

      <Button variant="contained" color="primary" onClick={handleClick}>
        ImpactiveAI아이디어생성
      </Button>
    </Box>
  );
}
