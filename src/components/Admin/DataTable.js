const DataTable = ({ columns, rows, onRowClick, emptyMessage = "Nothing here yet." }) => {
  if (rows.length === 0) {
    return (
      <div className="bg-white border border-neutral_stroke_1 rounded-[16px] py-[4rem] text-center">
        <p className="font-publica_sans_l text-14 text-border_stroke_2">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-neutral_stroke_1 rounded-[16px] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-neutral_disabled">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="font-publica_sans_m text-12 text-border_stroke_2 uppercase tracking-wide px-6 py-4 whitespace-nowrap"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.id}
                onClick={() => onRowClick?.(row)}
                className={`border-t border-neutral_stroke_2 ${
                  onRowClick ? "cursor-pointer hover:bg-neutral_disabled transition-colors" : ""
                }`}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="font-publica_sans_l text-14 text-black px-6 py-4 align-middle"
                  >
                    {column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
