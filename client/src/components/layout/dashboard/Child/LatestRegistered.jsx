import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
import data from "../../../../data.json";

const LatestRegistered = () => {
  // Extract data from JSON
  const registeredUsers = data.latestRegistered.registeredUsers;
  const subscribedUsers = data.latestRegistered.subscribedUsers;

  // Render user table rows
  const renderUserRows = (users) => {
    const getStatusClass = (status) => {
      switch (status) {
        case "Active":
          return "bg-success-focus text-success-main";
        case "Inactive":
          return "bg-danger-focus text-danger-main";
        case "Pending":
          return "bg-warning-focus text-warning-main";
        default:
          return "bg-secondary-focus text-secondary-main"; // fallback
      }
    };
    return users.map((user) => (
      <tr key={user.id}>
        <td>
          <div className="d-flex align-items-center">
            <img
              src={user.avatar}
              alt="User Avatar"
              className="w-40-px h-40-px rounded-circle flex-shrink-0 me-12 overflow-hidden"
            />
            <div className="flex-grow-1">
              <h6 className="text-md mb-0 fw-medium">{user.name}</h6>
              <span className="text-sm text-secondary-light fw-medium">
                {user.email}
              </span>
            </div>
          </div>
        </td>
        <td>{user.registeredOn}</td>
        <td>{user.plan}</td>
        <td className="text-center">
          <span className={`${getStatusClass(user.status)} px-24 py-4 rounded-pill fw-medium text-sm`}>
            {user.status}
          </span>
        </td>
      </tr>
    ));
  };

  return (
    <div className="col-xxl-9 col-xl-12">
      <div className="card h-100">
        <div className="card-body p-24">
          <div className="d-flex flex-wrap align-items-center gap-1 justify-content-between mb-16">
            <ul
              className="nav border-gradient-tab nav-pills mb-0"
              id="pills-tab"
              role="tablist"
            >
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link d-flex align-items-center active"
                  id="pills-registered-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-registered"
                  type="button"
                  role="tab"
                  aria-controls="pills-registered"
                  aria-selected="true"
                >
                  Latest Registered
                  <span className="text-sm fw-semibold py-6 px-12 bg-neutral-500 rounded-pill text-white line-height-1 ms-12 notification-alert">
                    {registeredUsers.length}
                  </span>
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link d-flex align-items-center"
                  id="pills-subscribed-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-subscribed"
                  type="button"
                  role="tab"
                  aria-controls="pills-subscribed"
                  aria-selected="false"
                  tabIndex={-1}
                >
                  Latest Subscribe
                  <span className="text-sm fw-semibold py-6 px-12 bg-neutral-500 rounded-pill text-white line-height-1 ms-12 notification-alert">
                    {subscribedUsers.length}
                  </span>
                </button>
              </li>
            </ul>
            <Link
              to="#"
              className="text-primary-600 hover-text-primary d-flex align-items-center gap-1"
            >
              View All
              <Icon icon="solar:alt-arrow-right-linear" className="icon" />
            </Link>
          </div>

          <div className="tab-content" id="pills-tabContent">
            {/* Latest Registered Tab */}
            <div
              className="tab-pane fade show active"
              id="pills-registered"
              role="tabpanel"
              aria-labelledby="pills-registered-tab"
              tabIndex={0}
            >
              <div className="table-responsive scroll-sm">
                <table className="table bordered-table sm-table mb-0">
                  <thead>
                    <tr>
                      <th scope="col">Users</th>
                      <th scope="col">Registered On</th>
                      <th scope="col">Plan</th>
                      <th scope="col" className="text-center">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {renderUserRows(registeredUsers)}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Latest Subscribe Tab */}
            <div
              className="tab-pane fade"
              id="pills-subscribed"
              role="tabpanel"
              aria-labelledby="pills-subscribed-tab"
              tabIndex={0}
            >
              <div className="table-responsive scroll-sm">
                <table className="table bordered-table sm-table mb-0">
                  <thead>
                    <tr>
                      <th scope="col">Users</th>
                      <th scope="col">Subscribed On</th>
                      <th scope="col">Plan</th>
                      <th scope="col" className="text-center">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {renderUserRows(subscribedUsers)}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestRegistered;