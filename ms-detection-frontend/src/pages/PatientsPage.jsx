import {
  useMemo,
  useState,
  useEffect,
} from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import PatientTable from "../components/patients/PatientTable";

import AddPatientModal from "../components/patients/AddPatientModal";

import PatientDetailsPanel from "../components/patients/PatientDetailsPanel";

import EditPatientModal from "../components/patients/EditPatientModal";

import { FaSearch } from "react-icons/fa";

function PatientsPage() {

  // PATIENTS STATE
  const [patients, setPatients] =
    useState([]);

  // LOADING
  const [loading, setLoading] =
    useState(true);

  // SEARCH
  const [searchTerm, setSearchTerm] =
    useState("");

  // ADD MODAL
  const [isAddModalOpen, setIsAddModalOpen] =
    useState(false);

  // VIEW PANEL
  const [isViewOpen, setIsViewOpen] =
    useState(false);

  // EDIT MODAL
  const [isEditOpen, setIsEditOpen] =
    useState(false);

  // SELECTED PATIENT
  const [selectedPatient, setSelectedPatient] =
    useState(null);

  // FETCH PATIENTS
  const fetchPatients = async () => {

    try {

      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/patients`
      );

      const data = await response.json();

      setPatients(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  // LOAD DATA
  useEffect(() => {

    fetchPatients();

  }, []);

  // VIEW PATIENT
  const handleViewPatient = (patient) => {

    setSelectedPatient(patient);

    setIsViewOpen(true);
  };

  // EDIT PATIENT
  const handleEditPatient = (patient) => {

    setSelectedPatient(patient);

    setIsEditOpen(true);
  };

  // FILTER PATIENTS
  const filteredPatients = useMemo(() => {

    if (!searchTerm.trim()) {
      return patients;
    }

    return patients.filter((patient) =>

      patient.id
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||

      patient.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||

      patient.email
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

  }, [searchTerm, patients]);

  return (
    <DashboardLayout>

      <div className="space-y-6">

        {/* SEARCH + ACTIONS */}
        <div
          className="
            bg-gradient-to-br
            from-[#0f172a]
            via-[#111827]
            to-[#172554]

            border border-cyan-400/20

            rounded-3xl

            shadow-xl

            p-4 sm:p-5

            flex flex-col lg:flex-row
            gap-4

            lg:items-center
            lg:justify-between
          "
        >

          {/* SEARCH INPUT */}
          <div
            className="
              flex items-center

              bg-white/5

              border border-cyan-400/10

              rounded-2xl

              px-4 py-3

              w-full lg:max-w-md
            "
          >

            <FaSearch className="text-cyan-300 mr-3" />

            <input
              type="text"
              placeholder="Search by Patient ID, Name, Email..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              className="
                bg-transparent
                outline-none

                w-full

                text-white

                placeholder:text-slate-400
              "
            />

          </div>

          {/* RIGHT ACTIONS */}
          <div
            className="
              flex items-center justify-center

              gap-3

              flex-wrap

              w-full lg:w-auto
            "
          >

            {/* TOTAL RECORDS */}
            <div
              className="
                bg-cyan-400/10
                text-cyan-300

                border border-cyan-400/20

                px-4 py-2

                rounded-xl

                text-sm sm:text-base
                font-medium
              "
            >
              {filteredPatients.length} Records Found
            </div>

            {/* ADD PATIENT BUTTON */}
            <button
              onClick={() =>
                setIsAddModalOpen(true)
              }
              className="
                bg-cyan-500 hover:bg-cyan-400

                text-slate-900

                px-5 py-2.5

                rounded-xl

                text-sm sm:text-base

                font-semibold

                transition-all duration-300
              "
            >
              Add Patient
            </button>

          </div>

        </div>

        {/* LOADING */}
        {loading ? (

          <div
            className="
              bg-gradient-to-br
              from-[#0f172a]
              via-[#111827]
              to-[#172554]

              border border-cyan-400/20

              rounded-3xl

              shadow-xl

              p-20

              text-center
            "
          >

            <h2
              className="
                text-2xl

                font-semibold

                text-white
              "
            >
              Loading Patients...
            </h2>

          </div>

        ) : (

          /* PATIENT TABLE */
          <PatientTable
            patients={filteredPatients}

            onView={handleViewPatient}

            onEdit={handleEditPatient}

            onDelete={fetchPatients}
          />

        )}

        {/* ADD MODAL */}
        <AddPatientModal
          isOpen={isAddModalOpen}
          onClose={() =>
            setIsAddModalOpen(false)
          }
          onPatientAdded={fetchPatients}
        />

        {/* VIEW PANEL */}
        <PatientDetailsPanel
          patient={selectedPatient}
          isOpen={isViewOpen}
          onClose={() => setIsViewOpen(false)}
        />

        {/* EDIT MODAL */}
        <EditPatientModal
          patient={selectedPatient}
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          onPatientUpdated={fetchPatients}
        />

      </div>

    </DashboardLayout>
  );
}

export default PatientsPage;