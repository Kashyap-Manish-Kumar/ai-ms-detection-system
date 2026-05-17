import {
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

function PatientTable({
  patients = [],
  onView,
  onEdit,
  onDelete,
}) {

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this patient?"
    );

    if (!confirmDelete) return;

    try {

      await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/patients/${id}`,
        {
          method: "DELETE",
        }
      );

      if (onDelete) {
        onDelete();
      }

    } catch (error) {

      console.log(error);
    }
  };

  return (
    <div
      className="
        bg-gradient-to-br
        from-[#0f172a]
        via-[#111827]
        to-[#172554]

        border border-cyan-400/20

        rounded-3xl

        shadow-xl

        overflow-hidden
      "
    >

      {/* HEADER */}
      <div
        className="
          flex items-center justify-between

          px-4 sm:px-6
          py-5

          border-b border-cyan-400/10
        "
      >

        <h2
          className="
            text-xl sm:text-2xl
            font-semibold text-white
          "
        >
          Patient Records
        </h2>

        <span
          className="
            bg-cyan-400/10
            text-cyan-300

            border border-cyan-400/20

            px-3 py-1

            rounded-full

            text-sm font-medium
          "
        >
          {patients.length} Patients
        </span>

      </div>

      {/* EMPTY STATE */}
      {patients.length === 0 ? (

        <div
          className="
            py-20

            text-center
          "
        >

          <h3
            className="
              text-2xl

              font-semibold

              text-white
            "
          >
            No Patients Found
          </h3>

          <p
            className="
              mt-3

              text-slate-400
            "
          >
            Add patients to see records here.
          </p>

        </div>

      ) : (

        /* TABLE */
        <div className="overflow-x-auto">

          <table className="w-full min-w-[1200px]">

            <thead
              className="
                bg-white/5

                border-b border-cyan-400/10
              "
            >

              <tr>

                <th className="px-6 py-4 text-left text-cyan-200 font-medium">
                  Patient ID
                </th>

                <th className="px-6 py-4 text-left text-cyan-200 font-medium">
                  Name
                </th>

                <th className="px-6 py-4 text-left text-cyan-200 font-medium">
                  Email
                </th>

                <th className="px-6 py-4 text-left text-cyan-200 font-medium">
                  Contact Number
                </th>

                <th className="px-6 py-4 text-left text-cyan-200 font-medium">
                  Age
                </th>

                <th className="px-6 py-4 text-left text-cyan-200 font-medium">
                  Gender
                </th>

                <th className="px-6 py-4 text-left text-cyan-200 font-medium">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-cyan-200 font-medium">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {patients.map((patient) => (

                <tr
                  key={patient.id}
                  className="
                    border-b border-cyan-400/10

                    hover:bg-cyan-400/5

                    transition-all duration-300
                  "
                >

                  <td className="px-6 py-5 font-medium text-white">
                    {patient.id}
                  </td>

                  <td className="px-6 py-5 text-slate-200">
                    {patient.name || "Unknown"}
                  </td>

                  <td className="px-6 py-5 text-slate-300">
                    {patient.email || "Not Available"}
                  </td>

                  <td className="px-6 py-5 text-slate-300">
                    {patient.phone || "Not Available"}
                  </td>

                  <td className="px-6 py-5 text-slate-200">
                    {patient.age || 0}
                  </td>

                  <td className="px-6 py-5 text-slate-200">
                    {patient.gender || "Not Available"}
                  </td>

                  <td className="px-6 py-5">

                    <span
                      className={`
                        px-3 py-1
                        rounded-full
                        text-sm font-medium

                        ${
                          patient.status === "Stable"
                            ? "bg-green-400/10 text-green-300 border border-green-400/20"
                            : patient.status === "Critical"
                            ? "bg-red-400/10 text-red-300 border border-red-400/20"
                            : "bg-yellow-400/10 text-yellow-300 border border-yellow-400/20"
                        }
                      `}
                    >
                      {patient.status || "Unknown"}
                    </span>

                  </td>

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-3">

                      {/* VIEW */}
                      <button
                        onClick={() => onView(patient)}
                        className="
                          w-10 h-10

                          bg-cyan-400/10
                          text-cyan-300

                          border border-cyan-400/20

                          rounded-xl

                          flex items-center justify-center

                          hover:bg-cyan-400
                          hover:text-slate-900

                          transition-all duration-300
                        "
                      >
                        <FaEye />
                      </button>

                      {/* EDIT */}
                      <button
                        onClick={() => onEdit(patient)}
                        className="
                          w-10 h-10

                          bg-green-400/10
                          text-green-300

                          border border-green-400/20

                          rounded-xl

                          flex items-center justify-center

                          hover:bg-green-400
                          hover:text-slate-900

                          transition-all duration-300
                        "
                      >
                        <FaEdit />
                      </button>

                      {/* DELETE */}
                      <button
                        onClick={() => handleDelete(patient.id)}
                        className="
                          w-10 h-10

                          bg-red-400/10
                          text-red-300

                          border border-red-400/20

                          rounded-xl

                          flex items-center justify-center

                          hover:bg-red-400
                          hover:text-slate-900

                          transition-all duration-300
                        "
                      >
                        <FaTrash />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
}

export default PatientTable;