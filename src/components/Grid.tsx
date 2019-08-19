import React, { Component } from "react";
import { Spinner, Button, Intent, Icon, Tag, ButtonGroup, Switch, EditableText, IconName } from "@blueprintjs/core";
import Translator from "../libs/translate/Translator";
import AbstractModel from "../models/orm/AbstractModel";
import { observer } from "mobx-react";
import { gridConfig } from "../models/interfaces";
import * as mobx from 'mobx';
import Users from "../models/orm/Users";
import _ from "lodash";

interface Props {
    model: AbstractModel,
    config?: gridConfig,
    parent?: object
}
interface types2iconsType {
    [key:string]: IconName | ''
};

/**
 * 
 */
@observer
class Grid extends Component<Props> {
  /**
   * Actions to icons 'translation'
   */
  protected actions2icons = {
    view: { icon: "search", intent: Intent.NONE },
    edit: { icon: "edit", intent: Intent.WARNING },
    delete: { icon: "delete", intent: Intent.DANGER },
    drilldown: { icon: "arrow-right", intent: Intent.PRIMARY }
  };
  /**
   * Icons names for types
   */
  private types2icons : types2iconsType = {
    "timestamp(0)": "calendar",
    "timestamp(6)": "calendar",
    "timestamp(3)": "calendar",
    "timestamp(9)" : "calendar",
    "long raw": "",
    char: "list",
    binary_double: "numerical",
    float: "numerical",
    long: "list",
    nvarchar2: "list",
    date: "calendar",
    text: "list",
    datetime: "calendar",
    varchar2: "list",
    nchar: "list",
    number: "numerical",
    timestamp: "calendar",
    varchar: "list",
    int: "numerical",
    double: "numerical",
    clob: "layout-grid",
    bigint: "numerical",
    decimal: "numerical",
    numeric: "numerical",
    nvarchar: "list",
    integer: "numerical",
    string: "list",
    tinyint: "numerical",
    smallint: "numerical",
    id: "key",
    timestmp: "calendar",
    longtext: "list",
    textarea: "list",
    reference: "intersection",
    boolean: "ring",
    picklist: "numbered-list",
    url: "link",
    percent: "percentage",
    address: "user",
    multipicklist: "multi-select",
    money: "numerical",
    bit: "ring",
    email: "user",
    blob: "barcode",
    longblob: "barcode",
    mediumtext: "list",
    mediumint: "numerical",
    image: "media",
    tinytext: "list",
    smalldatetime: "calendar",
    ntext: "list",
    currency: "dollar",
    varchar2_tt : "list",
    graphic: "media",
    varg: "list",
    binary: "numerical",
    phone: "phone",
    combobox: "multi-select",
    enum: "multi-select",
    time: "calendar",
    rowid: "key",
    mediumblob : "barcode",
    anytype: "help",
    varbinary: "barcode",
    raw: "barcode",
    hierarchyid: "key",
    uniqueidentifier: "key",
    base64: "barcode",
    t_colname: "variable",
    complexvalue: "layers",
    t_colval: "list",
    dbclob: "barcode",
    sysname: "variable"
  };
  /**
   *
   */
  private simpletypes2intent = {
    numerical: "#FFFFFF",
    calendar: "#48AFF0",
    list: "#394B59",
    "layout-grid": "#FFC940"
  };

  /**
   * Returns a cell for the header
   */
  public getHeaderCellJsx(k, i) {
    let v = "";
    switch (k) {
      case "should_ignore":
        v = "";
        break;
      default:
        v = Translator.t(k);
        break;
    }
    return (
      <th
        key={k}
        style={{ cursor: "pointer" }}
        onClick={() => this.props.model.sortLocalCollection(k)}
      >
        {v}
        {this.props.model.sortparams.columnName === k ? (
          <div style={{ float: "right" }}>
            <Icon
              icon={this.props.model.sortparams.asc ? "sort-asc" : "sort-desc"}
            />
          </div>
        ) : null}
      </th>
    );
  }

  /**
   * Returns a list of tags
   * @param k
   * @param v
   */
  private getTags(k, v) {
    return (
      <td key={k} style={{ width: 40, textAlign: "center" }}>
        {v && v.length
          ? v.map(e => (
              <Tag style={{ margin: 1, fontSize: 9 }} minimal={true}>
                {e}
              </Tag>
            ))
          : null}
      </td>
    );
  }

  /**
   * Returns a cell for the body
   *
   * @param k
   * @param v
   * @param row
   */
  public getBodyCellJsx(k, v, row) {
    switch (k) {
      case "should_ignore":
        return (
          <td key={k} style={{ width: 40, textAlign: "center" }}>
            {v ? (
              <Icon icon="full-circle" intent="danger" iconSize={12} />
            ) : (
              <Icon icon="full-circle" intent="success" iconSize={12} />
            )}
          </td>
        );
      case "tags":
        return this.getTags(k, v);
      case "semantic_type":
        return this.getTags(k, v);
      case "group":
        return this.getTags(k, v);
      case "datatype":
        return (
          <td
            key={k}
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: 300
            }}
          >
            {this.getIconDataTypeJsx(v)}
            {v}
          </td>
        );
      case "name":
        return this.getNameCellJsx(k, v, row);
      default:
        return (
          <td
            key={k}
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: 300
            }}
          >
            {this.props.config.editable &&
            this.props.config.editable.indexOf(k) > -1 ? (
              <EditableText
                placeholder=""
                value={row[k]}
                confirmOnEnterKey={true}
                onChange={val => this.handleReportChange(val, row, k)}
                onConfirm={val => this.handleConfirm(val, row, k)}
                maxLines={10}
                minLines={1}
                multiline={true}
              />
            ) : (
              v
            )}
          </td>
        );
    }
  }

  /**
   *
   * @param report
   * @param row
   */
  public handleReportChange(val: string, row, k) {
    row[k] = val;
  }

  /**
   *
   * @param report
   * @param row
   */
  public handleConfirm(val: string, row, k) {
    this.props.model.document = row;
    this.props.model.updateOne();
  }

  /**
   *
   * @param k
   * @param v
   */
  public getNameCellJsx(k, v, row) {
    let iii = [];
    let icons = null;
    let isize: number = 15;
    let iintent: "warning" = "warning";

    if (row["is_pii"])
      iii.push(
        <Icon
          icon={"user"}
          iconSize={isize}
          intent={iintent}
          style={{ paddingRight: 10 }}
        />
      );
    if (row["is_pci"])
      iii.push(
        <Icon
          icon={"credit-card"}
          iconSize={isize}
          intent={iintent}
          style={{ paddingRight: 10 }}
        />
      );
    if (row["is_fk"])
      iii.push(
        <Icon
          icon={"link"}
          iconSize={isize}
          intent={iintent}
          style={{ paddingRight: 10 }}
        />
      );
    if (row["is_pk"])
      iii.push(
        <Icon
          icon={"key"}
          iconSize={isize}
          intent={iintent}
          style={{ paddingRight: 10 }}
        />
      );

    icons = <div style={{ float: "right" }}>{iii}</div>;
    return (
      <td
        key={k}
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          maxWidth: 300
        }}
      >
        <div style={{ float: "left" }}>{v}</div>
        {icons}
      </td>
    );
  }

  /**
   *
   * @param v
   */
  public getIconDataTypeJsx(v:string) {
    v = _.trim(v.toLowerCase());
    let i = this.types2icons[v] ? this.types2icons[v] : "help";
    //@ts-ignore
    return (
      <Icon
        //@ts-ignore
        icon={i}
        iconSize={15}
        style={{ paddingRight: 10, color: this.simpletypes2intent[i] }}
      />
    );
  }

  /**
   *
   */
  public getHeaderJsx() {
    let zearr = Object.keys(
      this.props.model.collection[0]
        ? this.props.model.collection[0]
        : this.props.model.collection[1]
    );

    if (
      this.props.config &&
      this.props.config.showOnly &&
      this.props.config.showOnly.length > 0
    ) {
      zearr = this.props.config.showOnly;
    }
    let jsx = zearr.map((k: string, i: number) => this.getHeaderCellJsx(k, i));
    if (
      this.props.config &&
      this.props.config.actions &&
      this.props.config.actions.length > 0
    ) {
      let hctnt = this.getAddentryButtonJSX();
      if (hctnt) jsx.push(<th key={"actions"}>{hctnt}</th>);
      else jsx.push(<th key={"actions"}>{Translator.t("actions")}</th>);
    }
    return (
      <tr>
        <th style={{ width: 55 }}>#</th>
        {jsx}
      </tr>
    );
  }

  /**
   *
   */
  public getBodyJsx() {
    let rows = this.props.model.getDislpayCollection().map((e, i: number) => {
      let zearr = Object.keys(e);
      if (
        this.props.config &&
        this.props.config.showOnly &&
        this.props.config.showOnly.length > 0
      ) {
        zearr = this.props.config.showOnly;
      }
      let jsx = zearr.map((k: string, i: number) =>
        this.getBodyCellJsx(k, e[k], e)
      );
      if (
        this.props.config &&
        this.props.config.actions &&
        this.props.config.actions.length > 0
      ) {
        let l = this.props.config.actions.length;
        jsx.push(
          <td style={{ textAlign: "right", width: l * 40 }}>
            {this.props.config.actions.map(a =>
              a !== "add" &&
              ((a === "delete" && Users.isAuthorized("superadmin")) ||
                a !== "delete") ? (
                <Button
                  // @ts-ignore
                  icon={this.actions2icons[a].icon}
                  intent={this.actions2icons[a].intent}
                  style={{ marginRight: 5 }}
                  onClick={() => this.onClickActionButton(a, e)}
                />
              ) : null
            )}
          </td>
        );
      }
      // let ppn = (this.props.model.pagination.selected*this.props.model.pagination.perpages)-this.props.model.pagination.perpages+1;
      let ppn =
        i +
        (this.props.model.pagination.selected - 1) *
          this.props.model.pagination.perpages +
        1;
      return (
        <tr key={ppn}>
          <td>{ppn}</td>
          {jsx}
        </tr>
      );
    });
    return rows;
  }

  /**
   *
   * @param actionName
   * @param rowId
   */
  public onClickActionButton(actionName: string = "", row: object = {}) {
    if (
      this.props.parent &&
      this.props.parent[actionName] &&
      typeof this.props.parent[actionName] === "function"
    ) {
      if (actionName === "delete") {
        if (
          window.confirm("Are you sure you want to delete this entry?") === true
        )
          this.props.parent[actionName](mobx.toJS(row));
      } else this.props.parent[actionName](mobx.toJS(row));
    }
  }

  /**
   *
   */
  public getAddentryButtonJSX() {
    return this.props.config.actions &&
      this.props.config.actions.indexOf("add") >= 0 ? (
      <div style={{ textAlign: "right" }}>
        <Button
          // @ts-ignore
          icon="plus"
          intent="danger"
          text={Translator.t("add")}
          style={{ marginRight: 5 }}
          onClick={() => this.onClickActionButton("add")}
        />
      </div>
    ) : null;
  }

  /**
   *
   */
  public getPaginationJSX() {
    if (this.props.model.pagination.pages <= 1) return null;
    let pgx = [];
    for (let e = 1; e <= this.props.model.pagination.pages; e++)
      pgx.push(
        <Button
          text={e}
          active={this.props.model.pagination.selected === e}
          onClick={() => this.props.model.onClickPage(e)}
        />
      );
    return (
      <div style={{ textAlign: "center", padding: 10 }}>
        <ButtonGroup minimal={false} fill={false}>
          <Button
            text="<"
            onClick={() =>
              this.props.model.onClickPage(
                this.props.model.pagination.selected - 1
              )
            }
          />
          {pgx}
          <Button
            text=">"
            onClick={() =>
              this.props.model.onClickPage(
                this.props.model.pagination.selected + 1
              )
            }
          />
        </ButtonGroup>
      </div>
    );
  }

  /**
   *
   * @param e
   */
  public onSearchModel(e) {
    this.props.model.pagination.searchstr = e.target.value;
    //this.props.model.getDislpayCollection();
  }

  /**
   *
   */
  public getQuickSearchBoxJSX() {
    return (
      <div className="bp3-input-group .modifier">
        <span className="bp3-icon bp3-icon-search" />
        <input
          className="bp3-input"
          type="search"
          placeholder="Local search"
          value={this.props.model.pagination.searchstr}
          dir="auto"
          onChange={e => this.onSearchModel(e)}
        />
      </div>
    );
  }

  /**
   *
   */
  public getSwitchJSX() {
    return (
      <div>
        <Switch
          onChange={vv =>
            //@ts-ignore
            (this.props.model.pagination.should_ignore = vv.target.checked
              ? 0
              : 1)
          }
          value={this.props.model.pagination.should_ignore}
          checked={!this.props.model.pagination.should_ignore ? true : false}
          labelElement={<strong>Show active only</strong>}
        />
      </div>
    );
  }

  /**
   *
   */
  public getTagsfilterJSX() {
    let jsx = [];
    let t = this.props.model.getTagsFromMemoryCollection();
    Object.keys(t).map(i => {
      let tt = t[i].map((e, idx) => (
        <Tag
          onClick={() => this.props.model.filterOnTag(e, i)}
          style={{ cursor: "pointer", padding: 2, margin: 2 }}
          minimal={false}
          intent={
            this.props.model.pagination.tagsfilter[i] &&
            this.props.model.pagination.tagsfilter[i].indexOf(e) > -1
              ? "primary"
              : "none"
          }
        >
          {" " + Translator.t(e) + " "}
        </Tag>
      ));
      jsx.push(tt);
      return null;
    });
    return jsx;
  }

  /**
   *
   */
  public render() {
    let jsx = [];
    if (this.props.model.loading) {
      jsx.push(
        <div
          className="docs-page"
          style={{
            backgroundColor: "rgba(0,0,0,.1)",
            width: "100%",
            height: "100%",
            position: "fixed",
            top: 0,
            left: 0
          }}
        >
          <div
            style={{
              width: "100%",
              padding: 200,
              position: "fixed",
              margin: "auto"
            }}
          >
            <Spinner />
          </div>
        </div>
      );
    }
    if (
      this.props.model.collection != null &&
      this.props.model.collection.length > 0
    ) {
      jsx.push(
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <div style={{ flex: 1 }}>{this.getSwitchJSX()}</div>
            <div style={{ flex: 3 }}>{this.getTagsfilterJSX()}</div>
            <div style={{ flex: 1 }}>{this.getQuickSearchBoxJSX()}</div>
          </div>
          <div>
            <div>{this.getPaginationJSX()}</div>
          </div>
          <table
            style={{ width: "100%" }}
            className="bp3-html-table bp3-html-table-bordered bp3-html-table-condensed bp3-html-table-striped bp3-small bp3-interactive"
          >
            <thead>{this.getHeaderJsx()}</thead>
            <tbody>{this.getBodyJsx()}</tbody>
          </table>
          {this.getPaginationJSX()}
        </div>
      );
    } else {
      jsx.push(this.getAddentryButtonJSX());
    }
    return jsx;
  }
}

export default Grid;
