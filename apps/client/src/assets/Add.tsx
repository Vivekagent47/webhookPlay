import React from "react";

interface IProps {
  width?: string;
  height?: string;
  style?: any;
  color?: string;
}

const Add = ({ width, height, style, color }: IProps) => (
  <svg
    width={width || "24"}
    height={height || "24"}
    viewBox={`0 0 ${width || "24"} ${height || "24"}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ ...style }}
  >
    <path
      d="M11.25 12.75V16C11.25 16.2125 11.3219 16.3906 11.4657 16.5344C11.6095 16.6781 11.7877 16.75 12.0003 16.75C12.2129 16.75 12.391 16.6781 12.5346 16.5344C12.6782 16.3906 12.75 16.2125 12.75 16V12.75H16C16.2125 12.75 16.3906 12.6781 16.5344 12.5343C16.6781 12.3905 16.75 12.2123 16.75 11.9997C16.75 11.7871 16.6781 11.609 16.5344 11.4654C16.3906 11.3218 16.2125 11.25 16 11.25H12.75V8.00001C12.75 7.78751 12.6781 7.60938 12.5343 7.46563C12.3904 7.3219 12.2122 7.25003 11.9997 7.25003C11.7871 7.25003 11.609 7.3219 11.4654 7.46563C11.3218 7.60938 11.25 7.78751 11.25 8.00001V11.25H7.99998C7.78748 11.25 7.60936 11.3219 7.46563 11.4657C7.32188 11.6095 7.25 11.7877 7.25 12.0003C7.25 12.2129 7.32188 12.391 7.46563 12.5346C7.60936 12.6782 7.78748 12.75 7.99998 12.75H11.25ZM12.0016 21.5C10.6877 21.5 9.45268 21.2506 8.29655 20.752C7.1404 20.2533 6.13472 19.5766 5.2795 18.7217C4.42427 17.8669 3.74721 16.8616 3.24833 15.706C2.74944 14.5504 2.5 13.3156 2.5 12.0017C2.5 10.6877 2.74933 9.45271 3.248 8.29658C3.74667 7.14043 4.42342 6.13475 5.27825 5.27953C6.1331 4.4243 7.13834 3.74724 8.29398 3.24836C9.44959 2.74947 10.6844 2.50003 11.9983 2.50003C13.3122 2.50003 14.5473 2.74936 15.7034 3.24803C16.8596 3.7467 17.8652 4.42345 18.7205 5.27828C19.5757 6.13313 20.2527 7.13837 20.7516 8.29401C21.2505 9.44962 21.5 10.6844 21.5 11.9983C21.5 13.3123 21.2506 14.5473 20.752 15.7034C20.2533 16.8596 19.5765 17.8653 18.7217 18.7205C17.8669 19.5757 16.8616 20.2528 15.706 20.7517C14.5504 21.2505 13.3156 21.5 12.0016 21.5ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.87501 17.675 6.32501C16.125 4.77501 14.2333 4.00001 12 4.00001C9.76664 4.00001 7.87498 4.77501 6.32498 6.32501C4.77498 7.87501 3.99998 9.76667 3.99998 12C3.99998 14.2333 4.77498 16.125 6.32498 17.675C7.87498 19.225 9.76664 20 12 20Z"
      fill={color || "#F7FAFC"}
    />
  </svg>
);

export default Add;