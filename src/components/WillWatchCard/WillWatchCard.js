import React from "react";

function Image(props) {
  let { data } = props;
  return (
    <img
      className="img-fluid rounded-start"
      src={`https://image.tmdb.org/t/p/w500${
        data.poster_path || data.backdrop_path
      }`}
      alt={data.original_title}
    />
  );
}

const WillWatchCard = ({ data }) => {
  let { title, vote_average, overview, release_date, ...imgData } = data;
  return (
    <div className="card mb-1">
      <div className="row g-0">
        <div className="col-md-3">
          <Image data={imgData} />
        </div>
        <div className="col-md-9">
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            {/* <p className="card-text"></p> */}
            {/* <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WillWatchCard;
