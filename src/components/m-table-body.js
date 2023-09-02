/* eslint-disable no-unused-vars */
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import PropTypes from "prop-types";
import * as React from "react";
import Dropzone from "react-dropzone";
/* eslint-enable no-unused-vars */

class MTableBody extends React.Component {
  renderEmpty(emptyRowCount, renderData) {
    const rowHeight = this.props.options.padding === "default" ? 49 : 36;
    const localization = {
      ...MTableBody.defaultProps.localization,
      ...this.props.localization,
    };
    if (
      this.props.options.showEmptyDataSourceMessage &&
      renderData.length === 0
    ) {
      let addColumn = 0;
      if (this.props.options.selection) {
        addColumn++;
      }
      if (
        this.props.actions &&
        this.props.actions.filter(
          (a) => a.position === "row" || typeof a === "function"
        ).length > 0
      ) {
        addColumn++;
      }
      if (this.props.hasDetailPanel) {
        addColumn++;
      }
      if (this.props.isTreeData) {
        addColumn++;
      }
      return (
        <TableRow
          style={{
            height:
              rowHeight *
              (this.props.options.paging &&
              this.props.options.emptyRowsWhenPaging
                ? this.props.pageSize
                : 1),
          }}
          key={"empty-" + 0}
        >
          <TableCell
            style={{ paddingTop: 0, paddingBottom: 0, textAlign: "center" }}
            colSpan={this.props.columns.reduce(
              (currentVal, columnDef) =>
                columnDef.hidden ? currentVal : currentVal + 1,
              addColumn
            )}
            key="empty-"
          >
            <Dropzone onDrop={this.props.handleFileUpload}>
              {({ getRootProps, getInputProps }) => (
                <div
                  {...getRootProps()}
                  style={{
                    padding: 80,
                    border: "2px dashed rgba(0, 0, 0, 0.38)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <svg
                      version="1.0"
                      xmlns="http://www.w3.org/2000/svg"
                      width="192.000000pt"
                      height="192.000000pt"
                      viewBox="0 0 192.000000 192.000000"
                      preserveAspectRatio="xMidYMid meet"
                      style={{ width: "26px", height: "26px" }}
                    >
                      <g
                        transform="translate(0.000000,192.000000) scale(0.100000,-0.100000)"
                        fill="#000000"
                        stroke="none"
                      >
                        <path
                          d="M285 1524 c-277 -340 -270 -823 16 -1148 l34 -38 57 57 57 58 -44 50
c-54 62 -119 188 -142 277 -24 88 -24 272 0 360 24 90 88 216 144 279 l46 52
-54 55 c-29 30 -57 54 -61 54 -4 0 -28 -25 -53 -56z"
                        />
                        <path
                          d="M1521 1526 l-54 -55 46 -52 c162 -185 209 -477 118 -720 -25 -65 -89
-169 -132 -215 l-29 -30 57 -58 58 -58 34 38 c87 100 157 232 194 369 31 114
31 316 0 430 -26 97 -61 178 -110 253 -40 64 -111 152 -122 152 -4 0 -31 -24
-60 -54z"
                        />
                        <path
                          d="M501 1266 c-44 -33 -81 -85 -81 -114 0 -37 34 -84 113 -158 120 -111
289 -196 452 -225 50 -10 64 -16 60 -27 -21 -55 -23 -53 122 -135 l138 -77 43
47 c82 90 134 172 158 249 13 41 24 85 24 98 0 40 -30 66 -98 81 -119 28 -168
66 -221 172 -17 34 -40 67 -50 73 -30 15 -76 12 -153 -11 -100 -31 -216 -23
-315 20 -90 39 -146 41 -192 7z m209 -158 c99 -36 258 -33 361 7 12 5 22 -5
38 -39 33 -66 93 -123 174 -162 39 -19 77 -34 84 -34 7 0 13 -2 13 -5 0 -17
-35 -84 -66 -126 l-36 -49 -41 25 c-40 24 -42 27 -43 75 -1 69 -15 80 -111 91
-161 18 -339 95 -451 195 -67 60 -73 83 -14 58 20 -9 62 -25 92 -36z"
                        />
                      </g>
                    </svg>
                    {localization.emptyDataSourceMessage}
                  </div>
                  <input {...getInputProps()} />
                </div>
              )}
            </Dropzone>
          </TableCell>
        </TableRow>
      );
    } else if (this.props.options.emptyRowsWhenPaging) {
      return (
        <React.Fragment>
          {[...Array(emptyRowCount)].map((r, index) => (
            <TableRow style={{ height: rowHeight }} key={"empty-" + index} />
          ))}
          {emptyRowCount > 0 && (
            <TableRow style={{ height: 1 }} key={"empty-last1"} />
          )}
        </React.Fragment>
      );
    }
  }

  renderUngroupedRows(renderData) {
    return renderData.map((data, index) => {
      if (data.tableData.editing || this.props.bulkEditOpen) {
        return (
          <this.props.components.EditRow
            columns={this.props.columns.filter((columnDef) => {
              return !columnDef.hidden;
            })}
            components={this.props.components}
            data={data}
            errorState={this.props.errorState}
            icons={this.props.icons}
            localization={{
              ...MTableBody.defaultProps.localization.editRow,
              ...this.props.localization.editRow,
              dateTimePickerLocalization: this.props.localization
                .dateTimePickerLocalization,
            }}
            key={"row-" + data.tableData.id}
            mode={this.props.bulkEditOpen ? "bulk" : data.tableData.editing}
            options={this.props.options}
            isTreeData={this.props.isTreeData}
            detailPanel={this.props.detailPanel}
            onEditingCanceled={this.props.onEditingCanceled}
            onEditingApproved={this.props.onEditingApproved}
            getFieldValue={this.props.getFieldValue}
            onBulkEditRowChanged={this.props.onBulkEditRowChanged}
            scrollWidth={this.props.scrollWidth}
          />
        );
      } else {
        return (
          <this.props.components.Row
            components={this.props.components}
            icons={this.props.icons}
            data={data}
            index={index}
            errorState={this.props.errorState}
            key={"row-" + data.tableData.id}
            level={0}
            options={this.props.options}
            localization={{
              ...MTableBody.defaultProps.localization.editRow,
              ...this.props.localization.editRow,
              dateTimePickerLocalization: this.props.localization
                .dateTimePickerLocalization,
            }}
            onRowSelected={this.props.onRowSelected}
            actions={this.props.actions}
            columns={this.props.columns}
            getFieldValue={this.props.getFieldValue}
            detailPanel={this.props.detailPanel}
            path={[index + this.props.pageSize * this.props.currentPage]}
            onToggleDetailPanel={this.props.onToggleDetailPanel}
            onRowClick={this.props.onRowClick}
            isTreeData={this.props.isTreeData}
            onTreeExpandChanged={this.props.onTreeExpandChanged}
            onEditingCanceled={this.props.onEditingCanceled}
            onEditingApproved={this.props.onEditingApproved}
            hasAnyEditingRow={this.props.hasAnyEditingRow}
            treeDataMaxLevel={this.props.treeDataMaxLevel}
            cellEditable={this.props.cellEditable}
            onCellEditStarted={this.props.onCellEditStarted}
            onCellEditFinished={this.props.onCellEditFinished}
            scrollWidth={this.props.scrollWidth}
          />
        );
      }
    });
  }

  renderGroupedRows(groups, renderData) {
    return renderData.map((groupData, index) => (
      <this.props.components.GroupRow
        actions={this.props.actions}
        key={groupData.value == null ? "" + index : groupData.value}
        columns={this.props.columns}
        components={this.props.components}
        detailPanel={this.props.detailPanel}
        getFieldValue={this.props.getFieldValue}
        groupData={groupData}
        groups={groups}
        icons={this.props.icons}
        level={0}
        path={[index + this.props.pageSize * this.props.currentPage]}
        onGroupExpandChanged={this.props.onGroupExpandChanged}
        onRowSelected={this.props.onRowSelected}
        onRowClick={this.props.onRowClick}
        onEditingCanceled={this.props.onEditingCanceled}
        onEditingApproved={this.props.onEditingApproved}
        onToggleDetailPanel={this.props.onToggleDetailPanel}
        onTreeExpandChanged={this.props.onTreeExpandChanged}
        options={this.props.options}
        isTreeData={this.props.isTreeData}
        hasAnyEditingRow={this.props.hasAnyEditingRow}
        localization={{
          ...MTableBody.defaultProps.localization.editRow,
          ...this.props.localization.editRow,
          dateTimePickerLocalization: this.props.localization
            .dateTimePickerLocalization,
        }}
        cellEditable={this.props.cellEditable}
        onCellEditStarted={this.props.onCellEditStarted}
        onCellEditFinished={this.props.onCellEditFinished}
        onBulkEditRowChanged={this.props.onBulkEditRowChanged}
        scrollWidth={this.props.scrollWidth}
      />
    ));
  }

  render() {
    let renderData = this.props.renderData;
    const groups = this.props.columns
      .filter((col) => col.tableData.groupOrder > -1)
      .sort(
        (col1, col2) => col1.tableData.groupOrder - col2.tableData.groupOrder
      );

    let emptyRowCount = 0;
    if (this.props.options.paging) {
      emptyRowCount = this.props.pageSize - renderData.length;
    }

    return (
      <TableBody>
        {this.props.options.filtering && (
          <this.props.components.FilterRow
            columns={this.props.columns.filter(
              (columnDef) => !columnDef.hidden
            )}
            icons={this.props.icons}
            hasActions={
              this.props.actions.filter(
                (a) => a.position === "row" || typeof a === "function"
              ).length > 0
            }
            actionsColumnIndex={this.props.options.actionsColumnIndex}
            onFilterChanged={this.props.onFilterChanged}
            selection={this.props.options.selection}
            localization={{
              ...MTableBody.defaultProps.localization.filterRow,
              ...this.props.localization.filterRow,
              dateTimePickerLocalization: this.props.localization
                .dateTimePickerLocalization,
            }}
            hasDetailPanel={!!this.props.detailPanel}
            detailPanelColumnAlignment={
              this.props.options.detailPanelColumnAlignment
            }
            isTreeData={this.props.isTreeData}
            filterCellStyle={this.props.options.filterCellStyle}
            filterRowStyle={this.props.options.filterRowStyle}
            hideFilterIcons={this.props.options.hideFilterIcons}
            scrollWidth={this.props.scrollWidth}
          />
        )}
        {this.props.showAddRow &&
          this.props.options.addRowPosition === "first" && (
            <this.props.components.EditRow
              columns={this.props.columns.filter((columnDef) => {
                return !columnDef.hidden;
              })}
              data={this.props.initialFormData}
              components={this.props.components}
              errorState={this.props.errorState}
              icons={this.props.icons}
              key="key-add-row"
              mode="add"
              localization={{
                ...MTableBody.defaultProps.localization.editRow,
                ...this.props.localization.editRow,
                dateTimePickerLocalization: this.props.localization
                  .dateTimePickerLocalization,
              }}
              options={this.props.options}
              isTreeData={this.props.isTreeData}
              detailPanel={this.props.detailPanel}
              onEditingCanceled={this.props.onEditingCanceled}
              onEditingApproved={this.props.onEditingApproved}
              getFieldValue={this.props.getFieldValue}
              scrollWidth={this.props.scrollWidth}
            />
          )}

        {groups.length > 0
          ? this.renderGroupedRows(groups, renderData)
          : this.renderUngroupedRows(renderData)}

        {this.props.showAddRow && this.props.options.addRowPosition === "last" && (
          <this.props.components.EditRow
            columns={this.props.columns.filter((columnDef) => {
              return !columnDef.hidden;
            })}
            data={this.props.initialFormData}
            components={this.props.components}
            errorState={this.props.errorState}
            icons={this.props.icons}
            key="key-add-row"
            mode="add"
            localization={{
              ...MTableBody.defaultProps.localization.editRow,
              ...this.props.localization.editRow,
              dateTimePickerLocalization: this.props.localization
                .dateTimePickerLocalization,
            }}
            options={this.props.options}
            isTreeData={this.props.isTreeData}
            detailPanel={this.props.detailPanel}
            onEditingCanceled={this.props.onEditingCanceled}
            onEditingApproved={this.props.onEditingApproved}
            getFieldValue={this.props.getFieldValue}
            scrollWidth={this.props.scrollWidth}
          />
        )}
        {this.renderEmpty(emptyRowCount, renderData)}
      </TableBody>
    );
  }
}

MTableBody.defaultProps = {
  actions: [],
  currentPage: 0,
  pageSize: 5,
  renderData: [],
  selection: false,
  localization: {
    emptyDataSourceMessage: "No records to display",
    filterRow: {},
    editRow: {},
  },
};

MTableBody.propTypes = {
  actions: PropTypes.array,
  components: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  currentPage: PropTypes.number,
  detailPanel: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.func])),
  ]),
  getFieldValue: PropTypes.func.isRequired,
  hasAnyEditingRow: PropTypes.bool,
  hasDetailPanel: PropTypes.bool.isRequired,
  icons: PropTypes.object.isRequired,
  isTreeData: PropTypes.bool.isRequired,
  onRowSelected: PropTypes.func,
  options: PropTypes.object.isRequired,
  pageSize: PropTypes.number,
  renderData: PropTypes.array,
  initialFormData: PropTypes.object,
  selection: PropTypes.bool.isRequired,
  scrollWidth: PropTypes.number.isRequired,
  showAddRow: PropTypes.bool,
  treeDataMaxLevel: PropTypes.number,
  localization: PropTypes.object,
  onFilterChanged: PropTypes.func,
  onGroupExpandChanged: PropTypes.func,
  onToggleDetailPanel: PropTypes.func.isRequired,
  onTreeExpandChanged: PropTypes.func.isRequired,
  onRowClick: PropTypes.func,
  onEditingCanceled: PropTypes.func,
  onEditingApproved: PropTypes.func,
  errorState: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  cellEditable: PropTypes.object,
  onCellEditStarted: PropTypes.func,
  onCellEditFinished: PropTypes.func,
  bulkEditOpen: PropTypes.bool,
  onBulkEditRowChanged: PropTypes.func,
  handleFileUpload: PropTypes.func,
};

export default MTableBody;
