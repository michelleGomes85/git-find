import "./styles.css";

const Input = ({ className, ...props }) => {
  return (
    <input 
      className={`custom-input ${className || ''}`} 
      {...props}
    />
  );
};

export { Input };
