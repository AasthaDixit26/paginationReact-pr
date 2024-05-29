import ReactPaginate from "react-paginate";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getPost = async () => {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/posts?_page=1&_limit=12"
      );
      const data = await res.json();
      setItems(data);
    };
    getPost();
  }, []);

  const fetchData = async (currentPage) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=12`
    );
    const data = await res.json();
    return data;
  };

  const handlePageOnClick = async (data) => {
    let currentPage = data.selected + 1;
    const postPages = await fetchData(currentPage);
    setItems(postPages);
  };

  return (
    <div className="container">
      <div className="row m-2">
        {items.map((item) => {
          return (
            <div
              className="col-sm-6 col-md-4 my-2"
              style={{ width: "18rem" }}
              key={item.id}
            >
              <div
                className="card shadow-sm w-100"
                style={{ minHeight: "225px" }}
              >
                <div className="card-body">
                  <h3 className="card-title text-center">{item.title}</h3>
                  <h5 className="card-subtitle mb-2 text-muted text-center">
                    {item.body}
                  </h5>
                  <p className="card-text">{item.it}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={8}
        breakLabel={"......"}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageOnClick}
        containerClassName="pagination justify-content-center"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        activeClassName="active"
      />
    </div>
  );
}

export default App;
