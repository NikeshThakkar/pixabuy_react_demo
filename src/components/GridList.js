import React, { useEffect, useState } from "react";
import "./GridList.css";

export const GridListComponent = () => {
  const [imageList, setImageList] = useState([]);
  const [searchValue, setSearchValue] = useState('all');
  const [flag, setflag] = useState(false);
  const onChangeSerchParam  = React.useCallback((event) => {
        const { target: { value }} = event;
        console.log(value);
        setSearchValue(value);
        getImagesList(value);
  }, []);
  
  const getImagesList = React.useCallback((value) => {
     setflag(true);
    try {
      fetch(`http://localhost:3010/api/v1/images/search-image?image_type=${value}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((response) => {
          if (response) {
            console.log(response.hits)
            /** Do something here */
            setflag(false)
            setImageList(response.hits);
          }
        });
    } catch (ErrorException) {}
  }, []);

  useEffect(() => {
    getImagesList(searchValue);
  }, [getImagesList]);

  return (
    <div className="grid-container">
      <input placeholder="Search Images" onChange={onChangeSerchParam} />
      <div>
        {flag && <div> Loading... </div>}
        {imageList.map((val, idx) => (
            <img key={idx} alt={val} src={val.webformatURL}/>
        ))}
      </div>
    </div>
  );
};
