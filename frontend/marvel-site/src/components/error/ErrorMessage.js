import error from './error.gif';

const ErrorMessage = () => {
    return (
        <img
            src={error}
            style={{
                height: '200px',
                width: '200px',
                alignItems: 'center',
                objectFit: 'contain',
                margin: 'auto auto',
                display: 'block',
            }}
            alt="Error"
        />
    );
};

export default ErrorMessage;
