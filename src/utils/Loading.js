import React from 'react';
import {Oval} from "react-loader-spinner";
const Loading = ({width, height}) => {
  return (
    <div className="h-[calc(100%-28.14px)] flex items-center justify-center">
    <Oval
      height={width}
      width={height}
      color="rgb(108 108 120)"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel='oval-loading'
      secondaryColor="rgb(43 43 64 / 61%)"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  </div>
  );
}

export default Loading;
