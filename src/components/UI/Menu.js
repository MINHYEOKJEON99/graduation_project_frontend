import ReactDOM from 'react-dom';

import classes from './Menu.module.css';

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onHide}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const Menu = (props) => {
  return (
    <>
      <Backdrop onHide={props.onHide} />
      <ModalOverlay>{props.children}</ModalOverlay>
    </>
  );
};
export default Menu;