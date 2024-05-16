import Table from "react-bootstrap/Table";

const BootstrapTable = ({ headers, children }) => {
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            {headers.map((item, index) => (
              <th key={index}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </Table>
    </>
  );
};

export default BootstrapTable;
