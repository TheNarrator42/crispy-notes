import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Book from './components/Book';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <Book pages={[
  {id: 0, title: "Biology", cards: [
    {id: 0, title: "Mitochondria", color: "rgb(255,179,186)", pos: {
      x: 500, y: 500
    }, value: "", termlistValue: ""},
    {id: 1, title: "Chloroplast", color: "rgb(186,255,201)", pos: {
      x: 1300, y: 200
    }, value: "", termlistValue: ""},
    {id: 2, title: "Nucleus", color: "rgb(186,225,255)", pos: {
      x: 40, y: 30
    }, value: "", termlistValue: ""}
  ], lines: [[0, 1], [0, 2], [1, 2]]}, 
  {id: 1, title: "Chemistry", cards: [
    {id: 0, title: "Elements", color: "rgb(255,179,186)", pos: {
      x: 500, y: 500
    }, value: "", termlistValue: ""},
    {id: 1, title: "Compounds", color: "rgb(186,255,201)", pos: {
      x: 1300, y: 200
    }, value: "", termlistValue: ""},
    {id: 2, title: "Experiments", color: "rgb(186,225,255)", pos: {
      x: 40, y: 30
    }, value: "", termlistValue: ""}
  ], lines: []}
  ]}
  />,

// <Page title = "Biology" cards = {[
//   {title: "Mitochondria", color: "orange", pos: {
//     x: 500, y: 500
//   }},
//   {title: "Chloroplast", color: "green", pos: {
//     x: 900, y: 0
//   }},
//   {title: "Nucleus", color: "blue", pos: {
//     x: 40, y: 1000
//   }}
// ]}/>,

document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
