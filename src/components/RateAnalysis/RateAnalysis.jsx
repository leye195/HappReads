import React, { useRef, useEffect, useCallback, useState } from "react";
import style from "./RateAnalysis.scss";
import classnames from "classnames/bind";
import { select, scaleLinear, scaleBand, axisBottom, axisRight, max } from "d3";
const cx = classnames.bind(style);
const RateAnalysis = ({ votes }) => {
  const svgRef = useRef();
  const [device, setDevice] = useState(null);

  const render = useCallback(() => {
    const {
      width: {
        baseVal: { value: outerWidth },
      },
      height: {
        baseVal: { value: outerHeight },
      },
    } = svgRef.current;
    const margin = { left: 20, top: 20, right: 20, bottom: 20 };
    const innerWidth = outerWidth - margin.left - margin.right;
    const innerHeight = outerHeight - margin.top - margin.bottom;
    const data = [];
    for (let i = 0; i <= 5; i++) {
      const tmp = votes.filter((v) => parseInt(v.vote) === i);
      data.push({ rate: i, count: tmp.length });
    }
    const xScale = scaleBand()
      .range([0, innerWidth])
      .domain([1, 2, 3, 4, 5])
      .paddingInner(0.5);
    const yScale = scaleLinear()
      .range([innerHeight, 0])
      .domain([
        0,
        max(data, (d) =>
          parseInt(d["count"]) < 5 ? 5 : max(data, (d) => parseInt(d["count"]))
        ),
      ]);
    const svg = select(svgRef.current);
    const g = svg
      .append("g")
      .attr("class", "graph")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    const xAxis = g
      .append("g")
      .attr("class", "xaxis")
      .attr("transform", "translate(0,130)")
      .transition()
      .duration(500);
    xAxis.call(axisBottom(xScale));
    const yAxis = g
      .append("g")
      .attr("class", "yaxis")
      .attr("transform", "translate(0,130)")
      .transition()
      .duration(500);
    yAxis.call(axisRight(yScale));
    const rects = g
      .append("g")
      .attr("class", "rect-container")
      .selectAll("rect")
      .data(data);
    rects
      .enter()
      .append("rect")
      .attr("height", (d) => 0)
      .attr("width", xScale.bandwidth())
      .attr("x", (d) => xScale(d["rate"]))
      .attr("y", innerHeight)
      .attr("fill", "#f1c40f")
      .transition()
      .duration(500)
      .attr("y", (d) => yScale(d["count"]))
      .attr("height", (d) => innerHeight - yScale(d["count"]));
    rects.exit().remove();
  }, [votes]);

  const checkSize = () => {
    const innerWidth = window.innerWidth;
    if (innerWidth <= 425) {
      setDevice("mobile");
    } else if (innerWidth > 425 && innerWidth <= 767) {
      setDevice("tablet");
    } else {
      setDevice("desktop");
    }
  };
  useEffect(() => {
    svgRef.current.innerHTML = "";
    if (votes) {
      if (svgRef.current.hasChildNodes()) {
        const rectContainer = document.querySelector(".rect-container");
        if (rectContainer) rectContainer.remove();
      }
      render();
    }
    window.addEventListener("resize", checkSize);
    checkSize();
    return () => {
      window.removeEventListener("resize", checkSize);
    };
  }, [votes, render, device]);

  return (
    <section className={cx("rate-bar")}>
      <svg
        className={cx("svg-container")}
        ref={svgRef}
        width={
          device === "mobile" ? "250" : device === "tablet" ? "300" : "400"
        }
        height={"170"}
      ></svg>
    </section>
  );
};
export default RateAnalysis;
