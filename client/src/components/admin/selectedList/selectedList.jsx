import React from "react";
import "./selectedList.scss";
import CloseIcon from "@mui/icons-material/Close";

const SelectedList = (props) => {
  let list_array = props.list_array;
  return (
    <>
      <div className="selectedListWrapper">
        <div className="selectedListContainer">
          {
            list_array.map((obj, index) => {
              return (
                <div className="selectedListCard" key={index}>
                  <p>{obj}</p>
                  <span>
                    <CloseIcon
                      className="selectedListClose"
                        onClick = {() => {
                            props.removeMethod(obj)
                        }}
                    />
                  </span>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default SelectedList;
