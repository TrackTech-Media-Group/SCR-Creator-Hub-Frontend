import type React from "react";
import type { AllProps } from "./Button";
import Button from "./Button";

export const TertiaryBorderButton: React.FC<React.PropsWithChildren<AllProps>> = (props) => {
	return <Button {...props} color="tertiaryBorder" />;
};
