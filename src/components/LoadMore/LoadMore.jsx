import React,{forwardRef} from 'react';

import "./LoadMore.scss";

const LoadMore = forwardRef(({text,handleClick},ref)=>{
  return <button className="load-more" type="button" ref={ref} onClick={handleClick}>
      {text}
  </button>
});

export default LoadMore;