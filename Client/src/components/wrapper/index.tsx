import { useEffect } from "react";
import * as React from "react";
import "./index.scss";
import { useHistory } from "react-router-dom";
import { lastVisitedUrlKey } from "../../app";
import { Header } from "../index";

interface Props {
  readonly children?: React.ReactNode | React.ReactNode[];
  readonly className?: string;
}

export const Wrapper: React.FunctionComponent<Props> = ({
  children,
  className,
}: Props) => {
  const classes = ["o-wrapper"];
  const history = useHistory();
  useEffect(() => {
    return history.listen((location) => {
      localStorage.setItem(lastVisitedUrlKey, location.pathname);
    });
  }, [history]);

  if (className) {
    classes.push(className);
  }

  return (
    <div className={classes.join(" ")}>
      <Header />
      <main className="o-main">{children}</main>
    </div>
  );
};

export default Wrapper;
