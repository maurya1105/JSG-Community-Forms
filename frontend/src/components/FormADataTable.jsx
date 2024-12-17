import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "datatables.net-react"; // Import the DataTable component
import "datatables.net-buttons-dt/css/buttons.dataTables.css"; // Buttons styling
import DT from "datatables.net-dt"; // Import default DataTables styling
import "datatables.net-dt/css/dataTables.dataTables.css"; // Import DataTables CSS
import "datatables.net-buttons/js/buttons.print"; // For print button
import "./FormsDataTable.css"; // Import custom styles

DataTable.use(DT); // Configure DataTables to use the default styling

const FormADataTable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]); // State for API data
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(""); // State for error handling

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/contributions");
        const result = await response.json();

        if (response.ok) {
          setData(result.data);
        } else {
          setError(result.message || "Failed to fetch data");
        }
      } catch (err) {
        setError("An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Define columns for the DataTable
  const columns = [
    { data: "groupNumber", title: "Group Number", width: "20%" },
    { data: "groupName", title: "Group Name", width: "40%" },
    {
      data: "submissionDate",
      title: "Submission Date",
      render: (data) => new Date(data).toLocaleDateString(),
      width: "40%",
    },
  ];

  return (
    <div className="datatable-container">
      <h1 className="datatable-title">Form A Data</h1>
      <button onClick={() => navigate("/form-a")} className="new-form-button">
        + New Form
      </button>
      <DataTable
        data={data}
        columns={columns}
        className="display styled-datatable"
        options={{
          paging: true,
          searching: true,
          ordering: true,
        }}
      />
    </div>
  );
};

export default FormADataTable;
