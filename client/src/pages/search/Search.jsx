import React from "react";
import "./Search.css"
export default function Search(){
return(
    <>
      <section className="search-results">
            <h2>Showing results for <span>test</span></h2>
            <p>6 results found.</p>
            <div className="results-list">
                <div className="result-item">
                    <h3>Cashify</h3>
                    <p>Suresh - 999999999  | Surat</p>
                </div>
                <div className="result-item">
                    <h3>E-waste Store</h3>
                    <p>Ramesh - 999999999 | Ahemdabad</p>
                </div>
                <div className="result-item">
                    <h3>khali E waste</h3>
                    <p>Khali - 999999999 | Rajkot</p>
                </div>
                <div className="result-item">
                    <h3>Khalib waste</h3>
                    <p>Khalib - 999999999 | Surat</p>
                </div>
                <div className="result-item">
                    <h3>Vitara waste</h3>
                    <p>Kalu - 999999999 | Vadodara</p>
                </div>
                <div className="result-item">
                    <h3>Shakib Waste</h3>
                    <p>Shakib - 999999999 | Gandhinagar</p>
                </div>
            </div>
            <div className="pagination">
                <a href="#">&lt;</a>
                <a href="#" className="active">1</a>
                <a href="#">2</a>
                <a href="#">3</a>
                <a href="#">&gt;</a>
            </div>
        </section>

    </>
)
}