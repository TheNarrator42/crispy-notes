import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Book from './components/Book';

ReactDOM.render(
  <Book pages={[
  {id: 0, title: "Biology", cards: [
    {id: 0, title: "Mitochondria", color: "orange", pos: {
      x: 500, y: 500
    }, value: "", termlistValue: ""},
    {id: 1, title: "Chloroplast", color: "green", pos: {
      x: 1300, y: 200
    }, value: "", termlistValue: ""},
    {id: 2, title: "Nucleus", color: "blue", pos: {
      x: 40, y: 30
    }, value: "", termlistValue: ""}
  ]}, 
  {id: 1, title: "Chemistry", cards: [
    {id: 0, title: "Elements", color: "orange", pos: {
      x: 500, y: 500
    }, value: "", termlistValue: ""},
    {id: 1, title: "Compounds", color: "green", pos: {
      x: 1300, y: 200
    }, value: "", termlistValue: ""},
    {id: 2, title: "Experiments", color: "blue", pos: {
      x: 40, y: 30
    }, value: "", termlistValue: ""}
  ]}
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
