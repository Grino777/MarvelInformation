const Spinner = () => {
    return (
        // <?xml version="1.0" encoding="UTF-8" standalone="no"?>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.0"
            width="100px"
            height="100px"
            viewBox="0 0 200 200"
            style={{
                margin: 'auto auto',
                display: 'block',
                background: 'none',
            }}
        >
            <g>
                <path
                    d="M64 9.75A54.25 54.25 0 0 0 9.75 64H0a64 64 0 0 1 128 0h-9.75A54.25 54.25 0 0 0 64 9.75z"
                    fill="#00ffd7"
                />
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 64 64"
                    to="360 64 64"
                    dur="1800ms"
                    repeatCount="indefinite"
                ></animateTransform>
            </g>
        </svg>
    );
};

export default Spinner;
