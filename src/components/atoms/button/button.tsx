import { forwardRef, ComponentProps } from "react";

import styles from "./button.module.css";

/**
 * @param: {HTMLButtonElement props} children, ...rest
 * @param: {ForwardedRef} ref
 */
const Button = forwardRef<
  HTMLButtonElement,
  Omit<ComponentProps<"button">, "className">
>(({ children, ...rest }, ref) => {
  return (
    <button ref={ref} className={styles.button} {...rest}>
      {children}
    </button>
  );
});

export default Button;
