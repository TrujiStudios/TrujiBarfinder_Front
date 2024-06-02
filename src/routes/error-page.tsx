import { useLocation } from "react-router-dom";

export default function ErrorPage() {
    const location = useLocation();

    console.error(location.state.error);

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred. TrujiStudios</p>
            <p>
                <i>{location.state.error.statusText || location.state.error.message}</i>
            </p>
        </div>
    );
}