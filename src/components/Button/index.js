
import "./styles.css"

const Button = ({ text, onClick }) => {
    return (
      <button className="button" onClick={onClick}>
        {text} 
      </button>
    );
  };
  
  export { Button };
