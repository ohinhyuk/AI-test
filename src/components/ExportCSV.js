import { Button } from "@mui/material";
import FileSaver from "file-saver";
import { CSVLink } from "react-csv";

const headers = [
  { label: "First Name", key: "firstname" },
  { label: "Last Name", key: "lastname" },
  { label: "Email", key: "email" },
];

const data = [
  { firstname: "Ahmed", lastname: "Tomi", email: "ah@smthing.co.com" },
  { firstname: "Raed", lastname: "Labes", email: "rl@smthing.co.com" },
  { firstname: "Yezzi", lastname: "Min l3b", email: "ymin@cocococo.com" },
];

/**
 * @brief xlsx 모듈 추출
 */
const xlsx = require("xlsx");

/**
 * @brief 기본 설정
 */
const excelFileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const excelFileExtension = ".xlsx";
const excelFileName = "엑셀파일이름";

/**
 * @breif 가상의 엑셀파일을 생성
 * const book = xlsx.utils.book_new();
 */

/**
 * @brief 방법 1 : aoa_to_sheet
 * @details aoa_to_sheet 함수는 2차원 배열을 시트로 변환한다.
 * 
 * const doctors = xlsx.utils.aoa_to_sheet([
    ["학과", "직급", "이름", "나이"],
    ["흉부외과", "병원장", "주전", "67"],
    ["흉부외과", "교수", "천명태", "52"],
    ["흉부외과", "치프", "도재학", "39"],
    ["소아외과", "레지던트", "장겨울", "29"],
    ["산부인과", "레지던트", "추민하", "34"],
    ["산부인과", "레지던트", "명은원", "28"],
    ["신경외과", "교수", "민기준", "55"],
    ["신경외과", "치프", "용석민", "33"],
    ["신경외과", "레지던트", "안치홍", "38"],
    ["신경외과", "레지던트", "허선빈", "31"],
    ["응급의학과", "조교수", "봉광현", "40"],
    ["응급의학과", "펠로우", "배준희", "31"],
    ]);

    // 넓이 지정
    doctors["!cols"] = [
        { wpx : 130 }   // A열
    , { wpx : 100 }   // B열
    , { wpx : 80 }    // C열
    , { wch : 60 }    // D열
    ];
 */

/**
 * @brief 방법 2 : json_to_sheet
 * @details json_to_sheet 함수는 json 데이터를 시트로 변환한다.
 */

const columns = [
  {
    이름: "오인혁",
    학번: "21800111",
    점수: "100",
    추가설명: "굿",
    추가설명2: "베리굿",
    학부: "전산전자공학부",
    전공1: "컴퓨터공학",
    전공2: "컴퓨터공학심화",
    연락처: "01012345678",
    이메일: "811123@naver.com",
  },
  {
    이름: "장유진",
    학번: "21800112",
    점수: "95",
    추가설명: "잘함",
    추가설명2: "아주잘함",
    학부: "전산전자공학부",
    전공1: "전자공학",
    전공2: "컴퓨터공학",
    연락처: "01087654321",
    이메일: "younghee@naver.com",
  },
  {
    이름: "한시온",
    학번: "21800113",
    점수: "88",
    추가설명: "보통",
    추가설명2: "보통이상",
    학부: "전산전자공학부",
    전공1: "컴퓨터공학",
    전공2: "전자공학",
    연락처: "01056781234",
    이메일: "chulsoo@naver.com",
  },
];

// 넓이 지정
// nurses["!cols"] = [
//     { wpx : 130 }   // A열
//   , { wpx : 100 }   // B열
//   , { wpx : 80 }    // C열
//   , { wch : 60 }    // D열
// ]

/**
 * @breif append 하는 과정
 *
 */

// xlsx.utils.book_append_sheet( book, nurses, "NURSES" );

const excelDownload = (columns) => {
  const wb = xlsx.utils.book_new(); // 가상의 엑셀파일 생성
  const ws = xlsx.utils.json_to_sheet(columns); // 시트 생성
  xlsx.utils.book_append_sheet(wb, ws, "Sheet1"); // 엑셀파일에 시트 추가
  //   xlsx.writeFile(wb, "dramatis_personae.xlsx"); // 엑셀파일 생성 후 저장 형식

  const excelBuffer = xlsx.write(wb, { bookType: "xlsx", type: "array" }); // 엑셀파일 생성 후 저장 형식
  const excelFile = new Blob([excelBuffer], { type: excelFileType }); // Blob 형식으로 변환

  FileSaver.saveAs(excelFile, excelFileName + excelFileExtension); // FileSaver 라이브러리를 통해 엑셀파일 저장
};

export default function ExportCSV() {
  return (
    <>
      <Button>
        <CSVLink
          data={data}
          headers={headers}
          filename="test.csv"
          target="_blank"
        >
          엑셀 CSV Export
        </CSVLink>
      </Button>

      <Button onClick={() => excelDownload(columns)}>엑셀 xlsx Export</Button>
    </>
  );
}
