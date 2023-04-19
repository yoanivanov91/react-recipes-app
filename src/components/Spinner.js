
function Spinner({fullHeight}) {
  return (
    <div className={(fullHeight ? "fullHeight " : "") + "d-flex justify-content-center align-items-center"}>
        <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
  )
}

export default Spinner