import React, { useEffect, useState } from "react";
import "../components/Punk.css";

const PunkApi = () => {
  const [data, setData] = useState([]);

  const [filter, setFilter] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const fetchData = async () => {
    const res = await fetch("https://api.punkapi.com/v2/beers");
    const data = await res.json();
    setData(data);
    setFilteredData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const truncateDescription = (description, maxLength) => {
    if (description.length > maxLength) {
      return `${description.substring(0, maxLength)}...`;
    }
    return description;
  };

  const [expandedDescriptionId, setExpandedDescriptionId] = useState(null);

  const handleExpandDescription = (id) => {
    setExpandedDescriptionId(id === expandedDescriptionId ? null : id);
  };

  //handle search
  const handleChange = (e) => {
    const passInp = e.target.value;
    setFilter(passInp);
    // console.log("filter:", filter);

    const filterResult = data.filter((item) => {
      return item.name.toLowerCase().includes(passInp.toLowerCase());
    });

    setFilteredData(filterResult);
  };
  return (
    <>
      <div>
        <div className="align">
          <h2 className="solve">Products cards</h2>
          <div className="solve1">
            <span className="bold"> Search : </span>
            <input
              style={{ width: "203px", height: "18px" }}
              type="text"
              placeholder="Search here"
              value={filter}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="products">
          {Array.isArray(filteredData) &&
            filteredData.map((user) => {
              const truncatedDescription = truncateDescription(
                user.description,
                100 // Maximum characters to show initially
              );
              const isDescriptionExpanded = user.id === expandedDescriptionId;

              return (
                <div key={user.id} className="product">
                  <img
                    className="image"
                    src={user?.image_url}
                    alt={user?.name}
                  />
                  <div className="yes">
                    <h4>
                      Name : <span className="got1">{user.name}</span>
                    </h4>
                    <p>
                      <span className="got">Description : {"   "}</span>
                      {isDescriptionExpanded
                        ? user.description
                        : truncatedDescription}
                      <button
                        onClick={() => handleExpandDescription(user.id)}
                        style={{
                          border: "none",
                          background: "none",
                          color: "blue",
                        }}
                      >
                        {isDescriptionExpanded ? "Read less" : "Read more"}
                      </button>
                    </p>
                    <h4>
                      Tagline : <span className="got1">{user.tagline}</span>
                    </h4>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default PunkApi;
