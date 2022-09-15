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
export const ConfirmToast = ({title}) => {
  return (
    Swal.fire({
      width: 150,
      icon: "success",
      title: `${title}`,
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
      icon: "error",
      title: `${title}`,
      text: `${text}`,
      confirmButtonText: "확인",
    })
  )
}


