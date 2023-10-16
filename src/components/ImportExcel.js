// import React from "react";
// import { useDropzone } from "react-dropzone";
// import * as XLSX from "xlsx";

// const ImportExcel = () => {
//   const onDrop = (files) => {
//     files.forEach((file) => {
//       const reader = new FileReader();
//       reader.onload = function (e) {
//         const data = new Uint8Array(e.target.result);
//         const workbook = XLSX.read(data, { type: "array" });
//         const worksheetName = workbook.SheetNames[0];
//         const worksheet = workbook.Sheets[worksheetName];
//         const jsonData = XLSX.utils.sheet_to_json(worksheet);
//         console.log(jsonData);
//       };
//       reader.readAsArrayBuffer(file);
//     });
//   };

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

//   return (
//     <div {...getRootProps()}>
//       <input {...getInputProps()} />
//       {isDragActive ? (
//         <p>Drop the files here ...</p>
//       ) : (
//         <p>Drag 'n' drop some files here, or click to select files</p>
//       )}
//     </div>
//   );
// };

// export default ImportExcel;

import React from "react";
import { useDropzone } from "react-dropzone";
import readXlsxFile from "read-excel-file";

// const schema = {
//   이름: {
//     prop: "name",
//     type: String,
//   },
//   학번: {
//     prop: "studentId",
//     type: String,
//   },
//   점수: {
//     prop: "score",
//     type: String,
//   },
//   추가설명: {
//     prop: "description",
//     type: String,
//   },

//   추가설명2: {
//     prop: "description2",
//     type: String,
//   },
//   학부: {
//     prop: "department",
//     type: String,
//   },
//   전공1: {
//     prop: "major1",
//     type: String,
//   },
//   전공2: {
//     prop: "major2",
//     type: String,
//   },
//   연락처: {
//     prop: "contact",
//     type: String,
//   },
//   이메일: {
//     prop: "email",
//     type: String,
//   },
// };

const schema = {
  해당영역: {
    prop: "해당영역",
    type: String,
  },
  과목코드: {
    prop: "과목코드",
    type: String,
  },
  과목명: {
    prop: "과목명",
    type: String,
  },
  이수구분: {
    prop: "이수구분",
    type: String,
  },
  학점: {
    prop: "학점",
    type: String,
  },
};

const ImportExcel = () => {
  const onDrop = (files) => {
    files.forEach((file) => {
      readXlsxFile(file, { schema }).then(({ rows, errors }) => {
        console.log("DD");
        console.log(rows);
      });
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
};

export default ImportExcel;
