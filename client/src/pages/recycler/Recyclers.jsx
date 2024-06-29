import React, { useEffect } from "react";
import "./Recyclers.css"
import Global from "../../utils/Global";
import { Link } from "react-router-dom";
export default function Recyclers() {
    const [recyclers, setRecyclers] = React.useState([]);
    useEffect(() => {
        Global.httpGet('/recycler', false)
        .then((res) => {
            setRecyclers(res.data.recyclers);
            console.log(res.data.recyclers);
        })
        .catch((err) => {
            alert(err);
        })
    }, [])

    return (
        <>
            <section className="search-results">
                <h2>Showing results for <span>Recyclers</span></h2>
                <p>{recyclers.length} results found.</p>
                <div className="results-list">
                    {
                        recyclers.map((recycler, index) => {
                            return (
                                <div className="result-item" key={index}>
                                    <Link className="link" to={`/recyclers/${recycler.id}/schedule-pickup`}>{recycler.user.name}</Link>
                                    <p>{recycler.user.phoneNumber} | {recycler.user.zipCode}</p>
                                </div>
                            )
                        })
                    }
                </div>
                {/* <div className="pagination">
                    <a href="#">&lt;</a>
                    <a href="#" className="active">1</a>
                    <a href="#">2</a>
                    <a href="#">3</a>
                    <a href="#">&gt;</a>
                </div> */}
            </section>

        </>
    )
}