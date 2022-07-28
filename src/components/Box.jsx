import classNames from "classnames";

export default function Box(props) {
  return (
    <div className={classNames("box", props.className)}>{props.children}</div>
  );
}
