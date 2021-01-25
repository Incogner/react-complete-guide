import React, { useEffect } from 'react';
import classes from './Cockpit.css';

const cockpit = (props) => {

  useEffect(() => {
    console.log('[Cockpit.js] useEffect');
    // Http request
    const timer = setTimeout(() => {
      alert('Saved data to cloud');
    }, 1000);
    return () => {
      clearTimeout(timer);
      console.log('[Cockpit.js] cleanup work in useEffect');
    }
  }, []); // add dependencies as an array

  useEffect(() => {
    console.log('[Cockpit.js] 2nd useEffect');
    return () => {
      console.log('[Cockpit.js] cleanup work in useEffect');
    }
  });

  let btnClass = '';
  const assignedClasses = [];

  if(props.showPersons) {
      btnClass= classes.Red;
  }

  if(props.personsLength <= 2){
    assignedClasses.push(classes.red); //classes will be red
  }

  if(props.personsLength <=1) {
    assignedClasses.push(classes.bold); // classes = ['red', 'bold']
  }

  return (
      <div className={classes.Cockpit}>
          <h1>{props.title}</h1>
          <p className={assignedClasses.join(' ')} >This is really working!</p>
          <button className={btnClass} onClick={props.clicked}>
          Toggle Persons
          </button>
      </div>
  );
};

export default React.memo(cockpit);