import { connect } from "react-redux";
import { IStore } from "../../store/store";

const mapStateToProps = (state: any) => state;

export const reduxConnect = (
  WrappedComponent: any,
  actions: any,
  state: (state: IStore) => any = mapStateToProps
) => {
  return connect(
    state,
    actions
  )(WrappedComponent);
};
