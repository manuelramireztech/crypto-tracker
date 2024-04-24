// cn.js

const cn = (...classNames) => {
    return classNames.filter(Boolean).join(' ');
  };
  
  export { cn };