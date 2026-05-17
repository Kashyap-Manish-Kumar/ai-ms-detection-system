// HistoryPage.jsx

import {
  useState,
  useEffect,
} from "react";

import {
  FaEye,
  FaDownload,
  FaTrash,
} from "react-icons/fa";

import DashboardLayout from "../layouts/DashboardLayout";

function HistoryPage() {

  /* STATES */
  const [historyData, setHistoryData] =
    useState([]);

  const [search, setSearch] = useState("");

  const [activeFilter, setActiveFilter] =
    useState("All");

  const [notification, setNotification] =
    useState("");

  // REPORT VIEWER
  const [selectedReport, setSelectedReport] =
    useState(null);

  /* FETCH HISTORY */
  const fetchHistory = async () => {

    try {

      const response = await fetch(
       `${import.meta.env.VITE_BACKEND_URL}/analysis`
      );

      const data = await response.json();

      setHistoryData(data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    fetchHistory();

  }, []);

  /* GET RISK */
  const getRisk = (item) => {

    if (
      item?.diseaseSeverity === "Severe"
    ) {
      return "High";
    }

    if (
      item?.diseaseSeverity === "Moderate"
    ) {
      return "Medium";
    }

    return "Low";
  };

  /* FILTER */
  const filteredData = historyData.filter((item) => {

    const matchesSearch =
      item.patientId
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesFilter =
      activeFilter === "All"
        ? true
        : getRisk(item) === activeFilter;

    return (
      matchesSearch &&
      matchesFilter
    );

  });

  /* VIEW REPORT MODAL */
  const handleViewResult = (item) => {

    if (!item.reportPdf) {

      setNotification(
        "Report PDF not available."
      );

      setTimeout(() => {
        setNotification("");
      }, 3000);

      return;
    }

    setSelectedReport(
      `${import.meta.env.VITE_ML_URL}${item.reportPdf}`
    );
  };

  /* DOWNLOAD REPORT */
  const handleDownloadReport = (item) => {

    if (!item.reportPdf) {

      setNotification(
        "Report PDF not available."
      );

      setTimeout(() => {
        setNotification("");
      }, 3000);

      return;
    }

    window.open(
      `${import.meta.env.VITE_ML_URL}${item.reportPdf}`,
      "_blank"
    );
  };

  /* DELETE */
  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this analysis?"
      );

    if (!confirmDelete) return;

    try {

      await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/analysis/${id}`,
        {
          method: "DELETE",
        }
      );

      fetchHistory();

    } catch (error) {

      console.log(error);
    }
  };

  return (
    <DashboardLayout>

      {/* NOTIFICATION */}
      {notification && (

        <div
          className="
            fixed top-6 right-6

            bg-red-500

            text-white

            px-5 py-4

            rounded-2xl

            shadow-2xl

            z-50

            animate-pulse
          "
        >
          {notification}
        </div>

      )}

      <div className="space-y-4">

        {/* SEARCH + FILTER */}
        <div
          className="
            bg-[#020817]

            border border-cyan-500/20

            rounded-3xl

            p-4 sm:p-5

            shadow-2xl

            flex flex-col lg:flex-row

            lg:items-center
            lg:justify-between

            gap-5
          "
        >

          {/* SEARCH */}
          <div className="w-full lg:max-w-xl">

            <input
              type="text"
              placeholder="Search by Patient ID..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="
                bg-[#0B1120]

                border border-cyan-500/20

                rounded-2xl

                px-5 py-4

                text-white

                outline-none

                w-full

                placeholder:text-gray-500
              "
            />

          </div>

          {/* FILTER BUTTONS */}
          <div
            className="
              grid grid-cols-2

              sm:grid-cols-4

              lg:flex

              gap-4

              w-full lg:w-auto
            "
          >

            {[
              "All",
              "High",
              "Medium",
              "Low",
            ].map((filter) => (

              <button
                key={filter}
                onClick={() =>
                  setActiveFilter(filter)
                }
                className={`
                  py-3 px-4

                  rounded-2xl

                  transition-all duration-300

                  text-center

                  ${
                    activeFilter === filter
                      ? `
                        bg-cyan-500
                        text-black
                        font-semibold
                      `
                      : `
                        bg-[#0B1120]
                        border border-cyan-500/20
                        text-cyan-300
                      `
                  }
                `}
              >
                {filter === "All"
                  ? "All"
                  : `${filter} Risk`}
              </button>

            ))}

          </div>

        </div>

        {/* TABLE */}
        <div
          className="
            bg-[#020817]

            border border-cyan-500/20

            rounded-3xl

            overflow-hidden

            shadow-2xl
          "
        >

          {/* HEADER */}
          <div
            className="
              px-6 py-5

              border-b border-cyan-500/10
            "
          >

            <h2
              className="
                text-2xl

                font-bold

                text-white
              "
            >
              Prediction Records
            </h2>

          </div>

          {/* TABLE SCROLL */}
          <div
            className="
              overflow-x-auto
              overflow-y-auto

              max-h-[520px]

              scrollbar-thin
              scrollbar-thumb-cyan-500/30
            "
          >

            <table className="w-full">

              {/* TABLE HEADER */}
              <thead
                className="
                  bg-[#0B1120]

                  sticky top-0 z-10
                "
              >

                <tr>

                  <th className="px-6 py-4 text-left text-cyan-300">
                    Patient ID
                  </th>

                  <th className="px-6 py-4 text-left text-cyan-300">
                    Prediction
                  </th>

                  <th className="px-6 py-4 text-left text-cyan-300">
                    Date
                  </th>

                  <th className="px-6 py-4 text-left text-cyan-300">
                    Risk
                  </th>

                  <th className="px-6 py-4 text-left text-cyan-300">
                    Volume
                  </th>

                  <th className="px-6 py-4 text-left text-cyan-300">
                    Status
                  </th>

                  <th className="px-6 py-4 text-left text-cyan-300">
                    Actions
                  </th>

                </tr>

              </thead>

              {/* TABLE BODY */}
              <tbody>

                {filteredData.length > 0 ? (

                  filteredData.map((item, index) => (

                    <tr
                      key={index}
                      className="
                        border-b border-cyan-500/10

                        hover:bg-cyan-500/5

                        transition-all duration-300
                      "
                    >

                      <td className="px-6 py-5 text-white">
                        {item.patientId}
                      </td>

                      <td className="px-6 py-5 text-gray-300">
                        {item.prediction}
                      </td>

                      <td className="px-6 py-5 text-gray-300">
                        {item.createdAt
                          ? new Date(
                              item.createdAt
                            ).toLocaleDateString()
                          : "N/A"}
                      </td>

                      {/* RISK */}
                      <td className="px-6 py-5">

                        <span
                          className={`
                            px-4 py-1.5

                            rounded-full

                            text-sm

                            ${
                              getRisk(item) === "High"
                                ? `
                                  bg-red-500/10
                                  text-red-400
                                `
                                : getRisk(item) === "Medium"
                                ? `
                                  bg-yellow-500/10
                                  text-yellow-400
                                `
                                : `
                                  bg-green-500/10
                                  text-green-400
                                `
                            }
                          `}
                        >
                          {getRisk(item)}
                        </span>

                      </td>

                      <td className="px-6 py-5 text-cyan-300">
                        {item.lesionVolume || 0}
                      </td>

                      <td className="px-6 py-5 text-white">
                        Completed
                      </td>

                      {/* ACTIONS */}
                      <td className="px-6 py-5">

                        <div className="flex items-center gap-3">

                          {/* VIEW */}
                          <button
                            onClick={() =>
                              handleViewResult(item)
                            }
                            className="
                              w-10 h-10

                              rounded-xl

                              bg-cyan-500/10

                              text-cyan-400

                              flex items-center justify-center

                              hover:bg-cyan-500/20

                              transition-all duration-300
                            "
                          >
                            <FaEye />
                          </button>

                          {/* DOWNLOAD */}
                          <button
                            onClick={() =>
                              handleDownloadReport(item)
                            }
                            className="
                              w-10 h-10

                              rounded-xl

                              bg-green-500/10

                              text-green-400

                              flex items-center justify-center

                              hover:bg-green-500/20

                              transition-all duration-300
                            "
                          >
                            <FaDownload />
                          </button>

                          {/* DELETE */}
                          <button
                            onClick={() =>
                              handleDelete(item.id)
                            }
                            className="
                              w-10 h-10

                              rounded-xl

                              bg-red-500/10

                              text-red-400

                              flex items-center justify-center

                              hover:bg-red-500/20

                              transition-all duration-300
                            "
                          >
                            <FaTrash />
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="7"
                      className="
                        text-center

                        py-14

                        text-gray-400
                      "
                    >
                      No records found.
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

      {/* REPORT MODAL */}
      {selectedReport && (

        <div
          className="
            fixed inset-0

            bg-black/80

            backdrop-blur-md

            z-[100]

            flex items-center justify-center

            p-2 sm:p-5
          "
        >

          <div
            className="
              relative

              w-full
              h-full

              sm:h-[95vh]

              bg-[#020817]

              border border-cyan-500/20

              rounded-2xl

              overflow-hidden

              shadow-2xl
            "
          >

            {/* HEADER */}
            <div
              className="
                flex items-center justify-between

                px-4 sm:px-6
                py-4

                border-b border-cyan-500/10
              "
            >

              <h2
                className="
                  text-lg sm:text-2xl

                  font-bold

                  text-white
                "
              >
                MRI Analysis Report
              </h2>

              <button
                onClick={() =>
                  setSelectedReport(null)
                }
                className="
                  px-4 py-2

                  rounded-xl

                  bg-red-500/10

                  text-red-400

                  hover:bg-red-500/20

                  transition-all duration-300
                "
              >
                Close
              </button>

            </div>

            {/* PDF VIEWER */}
            <iframe
              src={selectedReport}
              title="MRI Report"
              className="
                w-full
                h-[calc(100%-80px)]

                bg-white
              "
            />

          </div>

        </div>

      )}

    </DashboardLayout>
  );
}

export default HistoryPage;