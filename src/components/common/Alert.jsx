import Swal from "sweetalert2"

// 버튼 있는 확인메시지
export const ConfirmAlert = ({text, title}) => {
  return (
    Swal.fire({
      width: 300,
      icon: "success",
      title: `${title}`,
      text: `${text}`,
      confirmButtonText: "확인",
    })
  )
}

// 토스트메시지
export const ConfirmToast = ({text}) => {
  return (
    Swal.fire({
      width: 300,
      icon: "success",
      text: `${text}`,
      showConfirmButton: false,
      timer: 1500
    })
  )
}

// 에러메시지
export const ErrorAlert = ({text, title}) => {
  return (
    Swal.fire({
      width: 300,
      heightAuto: false,
      icon: "error",
      text: `${text}`,
      confirmButtonText: "확인",
    })
  )
}


