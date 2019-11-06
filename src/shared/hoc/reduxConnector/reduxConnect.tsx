import { connect } from "react-redux";

const mapStateToProps = (state: any) => state;

export const reduxConnect = (
  WrappedComponent: any,
  actions: any,
  state: any = mapStateToProps
) => {
  return connect(
    state,
    actions
  )(WrappedComponent);
};
