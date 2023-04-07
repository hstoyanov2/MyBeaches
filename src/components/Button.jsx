const Button = ({ text, color, type, onClickFunction, customStyles }) => {
    return (
            <button 
                style={
                    {
                        backgroundColor: color,
                        color: 'white',
                        width: '120px',
                        height: '40px',
                        borderRadius: '10px',
                        fontSize: '24px',
                        cursor: 'pointer',
                        ...customStyles
                    }
                }
                type={type}
                onClick={onClickFunction}
            >
                {text}
            </button>
    )
}

export default Button;