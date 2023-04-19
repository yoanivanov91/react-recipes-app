
function NotFound({fullHeight}) {

    const refresh = () => {
        window.location.reload(false);
    }

    return (
        <div className={(fullHeight ? "fullHeight " : "") + "d-flex justify-content-center align-items-center flex-column"}>
            <h1 className="headline">Oops! Something unexpected happened</h1>
            <p className="m-0">An error occured while loading the data. Please <span className="simple-link" onClick={refresh}>refresh</span> the page.</p>
        </div>
    )
}

export default NotFound