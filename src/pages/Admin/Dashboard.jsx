import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  return (
    <div className="container-fluid col-md-10">
      <main className="mt-4">
        <div className="row">
          {/* Cards */}
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Total Users</h5>
                <p className="card-text">150</p>
              </div>
            </div>
          </div>

          {/* <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Products in Stock</h5>
                <p className="card-text">50</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Total Customers</h5>
                <p className="card-text">100</p>
              </div>
            </div>
          </div> */}
          {/* End of Cards */}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
