import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import axios from "axios";
import SingleList from "./SingleList";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import Loader from "./Loader";

const List = () => {
  //States
  const [loading, setLoading] = useState(false);
  const [userList, setUserList] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  //Redux State Management
  const openModel = useSelector((state) => state.popUp);
  const openPopUP = useDispatch();

  //onLoad getList call
  useEffect(() => {
    getList();
  }, [page]);

  //Getting the Lists of a Specific Page
  const getList = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://swapi.dev/api/people/?page=${page}`
      );
      setUserList(data.results);
      setSearch([...data.results]);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  //Paginating (Setting Page Numbers)
  const handlePageChange = (selectedObject) => {
    const currPage = selectedObject.selected;
    setPage(currPage + 1);
  };

  //Search Option
  const filterData = (e) => {
    const searchRes = search.filter((data) => {
      if (e.target.value == "") {
        return data;
      } else if (
        data.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        e.target.value.toLowerCase() ==
          data.gender.toLowerCase().slice(0, e.target.value.length) ||
        data.height.toLowerCase().includes(e.target.value.toLowerCase())
      ) {
        return data;
      }
    });
    setUserList(searchRes);
  };

  return (
    <>
      {loading && <Loader />}
      <div className="home">
        <div class="container pt-3">
          <div class="row justify-content-center">
            <div class="col-lg-9">
              <div id="SuperAdminDashboard" class="row mb-3">
                <div class="col-lg-12">
                  <div class="card">
                    <div class="card-body">
                      <div className="App">
                        <div className="px-3">
                          <div className=" mb-2">
                            <div className="d-flex align-items-center justify-content-between mb-4">
                              <h5 style={{ fontWeight: 700 }}>
                                SWAPI The Star Wars API
                              </h5>
                            </div>
                            <div className="d-flex align-items-center justify-content-end flex-wrap">
                              <div className="col-lg-3 col-md-4 col-sm-12 col-xs-12">
                                <div className="mb-2">
                                  <input
                                    type="text"
                                    placeholder="Search"
                                    className="form-control small font-14"
                                    onChange={filterData}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="pt-0 mb-3">
                            <table className="table table-hoverable-cells">
                              <thead>
                                <tr>
                                  <th scope="col">Name</th>
                                  <th scope="col">Gender</th>
                                  <th scope="col">Height</th>
                                </tr>
                              </thead>
                              <tbody>
                                {userList.map((data, index) => {
                                  return (
                                    <tr
                                      key={index}
                                      onClick={() =>
                                        openPopUP({
                                          type: "OPEN",
                                          data,
                                        })
                                      }
                                    >
                                      <td>{data.name}</td>
                                      <td>{data.gender}</td>
                                      <td>{data.height}</td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>

                            {userList.length === 0 && (
                              <div>
                                <div class="text-center p-3">
                                  <div class="avatar avatar-lg">
                                    <i class="fad fa-users-slash"></i>
                                  </div>

                                  <div class="mt-2">No Records found </div>
                                </div>
                              </div>
                            )}

                            <div className="mt-5 mb-2">
                              <div className="d-flex align-items-center justify-content-center">
                                <ReactPaginate
                                  previousLabel={"Previous"}
                                  nextLabel={"Next"}
                                  pageCount={9}
                                  onPageChange={handlePageChange}
                                  containerClassName={"paginationBttns"}
                                  previousLinkClassName={"previousBttn"}
                                  nextLinkClassName={"nextBttn"}
                                  disabledClassName={"paginationDisabled"}
                                  activeClassName={"paginationActive"}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Modal show={openModel} dialogclassName="view-panel show">
                    <SingleList />
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default List;
