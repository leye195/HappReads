import React from "react";
import { Helmet } from "react-helmet";

const ReactHelmet = ({ title, keywords, description }) => {
  return (
    <Helmet>
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta name="twitter:title" content={title} />
    </Helmet>
  );
};
export default ReactHelmet;
