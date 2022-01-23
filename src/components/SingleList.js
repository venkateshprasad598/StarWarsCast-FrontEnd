import React from "react";
import { useDispatch, useSelector } from "react-redux";

const SingleList = () => {
  
  //Redux State Management
  const closeModel = useDispatch();
  const { name, hair_color, skin_color, eye_color, birth_year } = useSelector(
    (state) => state.list
  );

  return (
    <>
      <div className="modal-header" id="NewRequestModal">
        <h6 className="modal-title" id="exampleModalLabel">
          {name} Details
        </h6>
        <button
          type="button"
          className="close"
          data-dismiss="modal"
          aria-label="Close"
          onClick={() => closeModel({ type: "CLOSE" })}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <div className="modal-body">
        <div className="mb-4 ml-4">
          <div className="mb-2 pl-1">
            <div className="ml-2">
              <h6>Hair Color</h6>
              <p className="mb-0">
                <small>{hair_color}</small>
              </p>
            </div>
          </div>

          <div className="mb-2 pl-1">
            <div className="ml-2">
              <h6>Skin Color</h6>
              <p className="mb-0">
                <small>{skin_color}</small>
              </p>
            </div>
          </div>
          <div className="mb-2 pl-1">
            <div className="ml-2">
              <h6>Eye Color</h6>
              <p className="mb-0">
                <small>{eye_color}</small>
              </p>
            </div>
          </div>
          <div className="mb-2 pl-1">
            <div className="ml-2">
              <h6>Birth Details</h6>
              <p className="mb-0">
                <small>{birth_year}</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleList;
