import React, { ReactNode } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
interface MyComponentProps {
  children: ReactNode;
  style?: string;
  text?: string;
}

const PopOver: React.FC<MyComponentProps> = ({ children, style, text }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button>{children}</Button>
      </PopoverTrigger>
      <PopoverContent className={`${style} p-1  rounded-xl`}>
        {(titleProps) => (
          <div className={`px-1 py-2 bg-inherit   text-white `}>
            <h3 className="text-sm " {...titleProps}>
              {text}
            </h3>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default PopOver;
