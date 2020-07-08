import React, { useRef, useEffect } from "react";
const RateAnalysis = () => {
  const svgRef = useRef();
  useEffect(() => {
    console.log(svgRef.current);
  });
  return (
    <section>
      <svg ref={svgRef}></svg>
    </section>
  );
};
export default RateAnalysis;
