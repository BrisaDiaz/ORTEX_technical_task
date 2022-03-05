export default function Button({
  text,
  className,
  type,
  size,
  style,
  fullWidth,

  color,
  onClick,
}: {
  onClick?: () => void;
  text: string;
  className?: string;
  color?: string;
  type?: "primary" | "secondary" | "alert" | "warning" | "success" | "info";
  size?: "large" | "medium" | "small";
  style?: "outlined" | "filled";
  fullWidth?: boolean;
}) {
  return (
    <button
      className={`button ${
        size === "small" ? "button--small" : size === "large" ? "button--large" : ""
      } 
      ${fullWidth ? "button--full-width" : ""}
    
      ${style === "outlined" ? "button--outlined" : ""}
      ${
        style === "filled" || !style
          ? ""
          : color
          ? "button--outline-custom-color"
          : type === "secondary"
          ? "button--outline-secondary"
          : type === "alert"
          ? "button--outline-alert"
          : type === "success"
          ? "button--outline-success"
          : type === "warning"
          ? "button--outline-warning"
          : type === "info"
          ? "button--outline-info"
          : ""
      }
      ${
        color
          ? "button--custom-color"
          : type === "secondary"
          ? "button--secondary"
          : type === "alert"
          ? "button--alert"
          : type === "warning"
          ? "button--warning"
          : type === "info"
          ? "button--info"
          : type === "success"
          ? "button--success"
          : ""
      }
      ${className || ""}`}
      onClick={() => onClick && onClick()}
    >
      {text}
      <style>{`
      .button {
  position: relative;
  padding:0.5em 1.2rem;
  font-size: 16px;
  border-radius: var(--border-radius);
  background-color: var(--primary);
  border: 2px solid var(--primary);
  color: var(--bg-light);
  font-weight:600;

  cursor: pointer;
  transition: all 0.3s ease-in-out;
 outline-offset: 3px;
  outline-width: 1px;
  border:0;
  border-top: 1px solid;
    border-left: 1px solid;
    transition: all 0.5s ease;
}

.button:focus {
  outline-color: var(--primary);
}

.button:active{
  border:0;
}

.button--small{
  font-size: 14px;
 padding: 0.4em 1rem;
}
.button--large{
  font-size: 18px;
    padding:0.6em 1.6rem;
}
.button--custom-color{
  background-color: ${color};
}
.button--secondary{
  background-color: var(--secondary);
}
.button--secondary:focus{
  outline-color: var(--secondary);
}
.button--alert{
  background-color: var(--alert);
  
}
.button--alert:focus{
  outline-color: var(--alert);
}
.button--success{
  background-color: var(--success);

}
.button--success:focus{
  outline-color: var(--success);
}
.button--warning{
  background-color: var(--warning);

}
.button--warning:focus{
  outline-color: var(--warning);
}
.button--info{
  background-color: var(--info);
  
}
.button--info:focus{
  outline-color: var(--info);
}
.button--custom-color:focus{
  outline-color:${color};
}
.button--full-width{
  width: 100%;
}

.button--outlined{
background: transparent;
border: 1px solid;
  border-color:var(--primary);
    color:var(--primary);
}
  .button--outline-secondary{
    border-color:var(--secondary);
    color:var(--secondary);
  }
   .button--outline-alert{
    border-color:var(--alert);
    color:var(--alert);
  }
   .button--outline-success{
    border-color:var(--success);
    color:var(--success);
  }
   .button--outline-info{
    border-color:var(--info);
    color:var(--info);
  }
    .button--outline-warning{
    border-color:var(--warning);
    color:var(--warning);
  }
  .button--outline-custom-color{
      border-color:${color};
    color:${color};
  }
      `}</style>
    </button>
  );
}
