let sortOrder = 1;

const sortTable = (columnIndex: number) => {
    const table = document.getElementById("data-table") as HTMLTableElement;
    let switching = true;
    const currentDirection = (sortOrder === 1) ? "asc" : "desc";
    let i;

    const ths = table.getElementsByTagName("TH");
    for (i = 0; i < ths.length; i++) {
        ths[i].classList.remove("asc", "desc");
        if (i === columnIndex) {
            ths[i].classList.add(currentDirection);
        }
    }

    while (switching) {
        switching = false;
        let shouldSwitch = false;
        const rows = table.rows;

        for (i = 1; i < (rows.length - 1); i++) {
            const x = rows[i].getElementsByTagName("TD")[columnIndex];
            const y = rows[i + 1].getElementsByTagName("TD")[columnIndex];

            if ((sortOrder === 1 && x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) ||
                (sortOrder === -1 && x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase())) {
                shouldSwitch = true;
                break;
            }
        }

        if (shouldSwitch) {
            rows[i].parentNode!.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }

    sortOrder = -sortOrder;
}

export default sortTable;