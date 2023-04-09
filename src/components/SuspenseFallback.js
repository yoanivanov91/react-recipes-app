
function Spinner() {
    return (
      <div className="d-flex justify-content-center centered-error-loading-container">
          <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
          </div>
      </div>
    )
  }
  
  export default Spinner