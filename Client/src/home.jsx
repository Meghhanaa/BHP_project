import React, { useState, useEffect } from "react";
import "./home.css"; // Ensure this path is correct
import homeImage from "../src/assets/home.jpg"; // Adjust path as needed

const Home = () => {
  const [area, setArea] = useState(1000);
  const [bhk, setBhk] = useState(2);
  const [bath, setBath] = useState(2);
  const [location, setLocation] = useState('');
  const [locations, setLocations] = useState([]);
  const [estimatedPrice, setEstimatedPrice] = useState('');

  // Fetch locations on component mount
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch("/api/get_location_names"); // Adjust based on backend
        const data = await response.json();
        if (data && data.locations) {
          setLocations(data.locations);
        }
      } catch (error) {
        console.error("Failed to fetch locations:", error);
      }
    };
    fetchLocations();
  }, []);

  const onClickedEstimatePrice = async () => {
    if (!area || !bhk || !bath || !location) {
      alert("Please fill out all fields before estimating.");
      return;
    }

    try {
      const response = await fetch("/api/predict_home_price", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          total_sqft: parseFloat(area),
          bhk,
          bath,
          location
        })
      });

      const data = await response.json();
      if (data && data.estimated_price) {
        setEstimatedPrice(`${data.estimated_price} Lakh`);
      } else {
        setEstimatedPrice("Could not estimate price. Try again later.");
      }
    } catch (error) {
      console.error("Failed to fetch price:", error);
      setEstimatedPrice("Error occurred. Please try again.");
    }
  };

  return (
    <div className="home">
      <div className="home__container container grid">
        <div className="home__form">
          <h1 className="head-1">ESTIMATE THE BANGALORE PRICE ACCORDING TO YOUR CHOICE</h1>

          <form className="form">
            <h3 className="megh-head">Area (Square Feet)</h3>
            <input
              className="area floatLabel"
              type="text"
              id="uiSqft"
              name="Squareft"
              value={area}
              onChange={(e) => setArea(e.target.value)}
            />

            <h3 className="megh-head">BHK</h3>
            <div className="switch-field">
              {[1, 2, 3, 4, 5].map((value) => (
                <React.Fragment key={value}>
                  <input
                    type="radio"
                    id={`radio-bhk-${value}`}
                    name="uiBHK"
                    value={value}
                    checked={bhk === value}
                    onChange={() => setBhk(value)}
                  />
                  <label htmlFor={`radio-bhk-${value}`}>{value}</label>
                </React.Fragment>
              ))}
            </div>

            <h3 className="megh-head">Bath</h3>
            <div className="switch-field">
              {[1, 2, 3, 4, 5].map((value) => (
                <React.Fragment key={value}>
                  <input
                    type="radio"
                    id={`radio-bath-${value}`}
                    name="uiBathrooms"
                    value={value}
                    checked={bath === value}
                    onChange={() => setBath(value)}
                  />
                  <label htmlFor={`radio-bath-${value}`}>{value}</label>
                </React.Fragment>
              ))}
            </div>

            <h3 className="megh-head">Location</h3>
            <select
              className="location"
              id="uiLocations"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="" disabled>Choose a Location</option>
              {locations.map((loc, index) => (
                <option key={index} value={loc}>{loc}</option>
              ))}
            </select>

            <button className="submit" type="button" onClick={onClickedEstimatePrice}>
              Estimate Price
            </button>
            <div id="uiEstimatedPrice" className="result">
              <h3 className="megh-head">{estimatedPrice}</h3>
            </div>
          </form>
        </div>

        <div className="home__images">
          <div className="home__orbe"></div>
          <div className="home__img">
            <img src={homeImage} alt="Home" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;



// import React, { useState } from "react";
// import "./home.css"; // Ensure this path is correct

// const Home = () => {
//   const [area, setArea] = useState(1000);
//   const [bhk, setBhk] = useState(2);
//   const [bath, setBath] = useState(2);
//   const [location, setLocation] = useState('');
//   const [estimatedPrice, setEstimatedPrice] = useState('');

//   const getBathValue = () => {
//     const uiBathrooms = document.getElementsByName("uiBathrooms");
//     for (let i in uiBathrooms) {
//       if (uiBathrooms[i].checked) {
//         setBath(parseInt(i) + 1);
//         return parseInt(i) + 1;
//       }
//     }
//     return -1; // Invalid Value
//   };

//   const getBHKValue = () => {
//     const uiBHK = document.getElementsByName("uiBHK");
//     for (let i in uiBHK) {
//       if (uiBHK[i].checked) {
//         setBhk(parseInt(i) + 1);
//         return parseInt(i) + 1;
//       }
//     }
//     return -1; // Invalid Value
//   };

//   const onPageLoad = () => {
//     console.log("Document loaded");
//     const url = "/api/get_location_names"; // Adjust based on backend setup
//     $.get(url, function (data) {
//       console.log("Response received for get_location_names request");
//       if (data) {
//         const locations = data.locations;
//         const uiLocations = document.getElementById("uiLocations");
//         $('#uiLocations').empty();
//         locations.forEach(location => {
//           const option = new Option(location);
//           $('#uiLocations').append(option);
//         });
//       }
//     });
//   };

//   window.onload = onPageLoad;

//   const onClickedEstimatePrice = () => {
//     console.log("Estimate price button clicked");
//     const sqft = document.getElementById("uiSqft");
//     const bhkValue = getBHKValue();
//     const bathValue = getBathValue();
//     const locationValue = document.getElementById("uiLocations");
//     const estPrice = document.getElementById("uiEstimatedPrice");

//     const url = "/api/predict_home_price"; // Adjust based on backend setup
//     $.post(
//       url,
//       {
//         total_sqft: parseFloat(sqft.value),
//         bhk: bhkValue,
//         bath: bathValue,
//         location: locationValue.value
//       },
//       function (data) {
//         console.log(data.estimated_price);
//         estPrice.innerHTML = `<h2>${data.estimated_price} Lakh</h2>`;
//       }
//     );
//   };

//   return (
//     <div className="home">
//       <div className="home__container container grid">
//         <div className="home__form">
//           <h1 className="head-1">ESTIMATE THE BANGALORE PRICE ACCORDING TO YOUR CHOICE</h1>

//           <form className="form">
//             <h3 className="megh-head">Area (Square Feet)</h3>
//             <input
//               className="area floatLabel"
//               type="text"
//               id="uiSqft"
//               name="Squareft"
//               value={area}
//               onChange={(e) => setArea(e.target.value)}
//             />

//             <h3 className="megh-head">BHK</h3>
//             <div className="switch-field">
//               {[1, 2, 3, 4, 5].map((value) => (
//                 <React.Fragment key={value}>
//                   <input
//                     type="radio"
//                     id={`radio-bhk-${value}`}
//                     name="uiBHK"
//                     value={value}
//                     checked={bhk === value}
//                     onChange={() => setBhk(value)}
//                   />
//                   <label htmlFor={`radio-bhk-${value}`}>{value}</label>
//                 </React.Fragment>
//               ))}
//             </div>
//           </form>

//           <form className="form">
//             <h3 className="megh-head">Bath</h3>
//             <div className="switch-field">
//               {[1, 2, 3, 4, 5].map((value) => (
//                 <React.Fragment key={value}>
//                   <input
//                     type="radio"
//                     id={`radio-bath-${value}`}
//                     name="uiBathrooms"
//                     value={value}
//                     checked={bath === value}
//                     onChange={() => setBath(value)}
//                   />
//                   <label htmlFor={`radio-bath-${value}`}>{value}</label>
//                 </React.Fragment>
//               ))}
//             </div>

//             <h3 className="megh-head">Location</h3>
//             <div>
//               <select
//                 className="location"
//                 id="uiLocations"
//                 value={location}
//                 onChange={(e) => setLocation(e.target.value)}
//               >
//                 <option value="" disabled>Choose a Location</option>
//                 {/* Locations will dynamically load on page load */}
//               </select>
//             </div>

//             <button className="submit" type="button" onClick={onClickedEstimatePrice}>
//               Estimate Price
//             </button>
//             <div id="uiEstimatedPrice" className="result">
//               <h3 className="megh-head">{estimatedPrice}</h3>
//             </div>
//           </form>
//         </div>

//         <div className="home__images">
//           <div className="home__orbe"></div>
//           <div className="home__img">
//             <img src={'../src/assets/home.jpg'} alt="Home" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

