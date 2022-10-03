import Swal from "sweetalert2"
import "./AlertStyle.css"

// 아이콘 종류
// success, error, warning, info, question

// Alert
export const CustomAlert = ({text, icon}) => {
  return (
    Swal.fire({
      customClass: {
        confirmButton: 'confirm80'
      },
      width: 300,
      icon: `${icon}`,
      text: `${text}`,
      confirmButtonText: "확인",
    })
  )
}

// Toast
export const CustomToast = ({text, icon}) => {
  return (
    Swal.fire({
      width: 300,
      icon: `${icon}`,
      text: `${text}`,
      timer: 2000
    })
  )
}