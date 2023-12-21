import { Loader2Icon } from "lucide-react";
import { Button, ButtonProps } from "./button";

type LoadingBtnProps = {
  loading: boolean;
} & ButtonProps;

const LoadingBtn = ({ children, loading, ...props }: LoadingBtnProps) => {
  return (
    <Button {...props} disabled={props.disabled || loading}>
      {loading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
};

export default LoadingBtn;
