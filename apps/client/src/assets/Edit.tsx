import React from "react";

interface IProps {
  width?: string;
  height?: string;
  style?: any;
}

const Edit = ({ width, height, style }: IProps) => (
  <svg
    width={width || "16"}
    height={height || "16"}
    viewBox={`0 0 ${width || "16"} ${height || "16"}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ ...style }}
  >
    <path
      d="M3.436 12.6667H4.26035L10.4335 6.49357L9.60912 5.6692L3.436 11.8423V12.6667ZM12.5719 5.7705L10.3219 3.54105L11.1912 2.67183C11.3869 2.47611 11.6249 2.37825 11.9052 2.37825C12.1856 2.37825 12.4236 2.47611 12.6193 2.67183L13.4309 3.48335C13.6266 3.67907 13.7279 3.91368 13.7347 4.18718C13.7415 4.46068 13.6471 4.69529 13.4514 4.89102L12.5719 5.7705ZM11.8488 6.50382L4.68599 13.6666H2.43604V11.4167L9.59885 4.25385L11.8488 6.50382ZM10.0181 6.07818L9.60912 5.6692L10.4335 6.49357L10.0181 6.07818Z"
      fill="#BFBFBF"
    />
  </svg>
);

export default Edit;
