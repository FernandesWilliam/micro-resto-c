import './back-button.css';
import { useNavigate } from 'react-router-dom';

export function BackButton(props) {
    const navigate = useNavigate();

    function onClick() {
        navigate(-1);

        props.action();
    }

    return (
        <div id="back-button" onClick={onClick}><img src='/back.png' alt='Back' width="64px"></img></div>
    );
}