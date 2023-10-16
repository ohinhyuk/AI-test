import { useState } from "react";
import { importCourses } from "../../apis/course";

//path variable을 써야한다는데..?

export default function ImportCSV() {
  const [selectedFile, setSelectedFile] = useState();

  const handleSubmit = async (e) => {
    const formData = new FormData(); // formdata 생성
    formData.append("file", selectedFile); // 입력 받은 excel 파일 formData에 append
    console.log(importCourses(formData)); // api 호출을 통해 excel 파일을 db에 저장
  };

  const handleChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <>
      <input type="file" onChange={handleChange} />
      <button onClick={handleSubmit}>제출</button>
    </>
  );
}
