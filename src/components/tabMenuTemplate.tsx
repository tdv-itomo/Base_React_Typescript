import { Badge } from "primereact/badge";
import { Dispatch, SetStateAction } from "react";
import { IMenu } from "../models/Report";

const tabMenuTemplate = (
    item: IMenu,
    itemIndex: number,
    tabMenuActive: number,
    setTabmenuActive: Dispatch<SetStateAction<number>>
) => {
    return (
        <div
            className="p-menuitem-link flex align-items-center gap-2 cursor-pointer "
            onClick={() => setTabmenuActive(itemIndex)}
            style={{
                width: window.innerWidth <= 768 ? "8rem" : "auto",
                cursor: "pointer",
            }}
        >
            <span
                className={`white-space-nowrap overflow-hidden ${
                    tabMenuActive === itemIndex
                        ? "font-bold text-secondary"
                        : ""
                }`}
            >
                {item.name}
            </span>
            {/* <Badge
        value={item.count}
        className={
          tabMenuActive === itemIndex ? 'font-bold bg-primary' : 'surface-400'
        }></Badge> */}
        </div>
    );
};

export default tabMenuTemplate;
