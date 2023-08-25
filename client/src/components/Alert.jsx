
const Alert = ({ message, alert }) => {
  return (
    <div>
      <div className={`alert ${alert}`} role='alert'>
        {message ? <p>{message}</p> : "Something went wrong! try again later"}
      </div>
    </div>
  )
}

export default Alert
