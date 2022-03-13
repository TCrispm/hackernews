import React from "react";
import logo from "../../assets/images/HN.png";

const Header = ({ onChangeListing }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        borderBottom: "1px solid #e5e7eb",
        height: "70px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginLeft: "50px",
        }}
      >
        <img
          src={logo}
          alt="logo"
          width={25}
          height={25}
          style={{ marginRight: "5px", display: "flex" }}
        />
        <div style={{ display: "flex", fontSize: 25, color: "#f48414" }}>
          HACKER NEWS
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginLeft: "50px",
        }}
      >
        <div
          style={{
            marginRight: "50px",
            cursor: "pointer",
            fontSize: 18,
            color: "#1f3b52",
          }}
          onClick={() => onChangeListing("newstories")}
        >
          New Stories
        </div>
        <div
          style={{
            marginRight: "50px",
            cursor: "pointer",
            fontSize: 18,
            color: "#1f3b52",
          }}
          onClick={() => onChangeListing("topstories")}
        >
          Top Stories
        </div>
        <div
          style={{
            marginRight: "50px",
            cursor: "pointer",
            fontSize: 18,
            color: "#1f3b52",
          }}
          onClick={() => onChangeListing("beststories")}
        >
          Best Stories
        </div>
      </div>
    </div>
  );
};

export default Header;
