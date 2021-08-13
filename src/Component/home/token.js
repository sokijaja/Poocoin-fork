import React from 'react';


export default function Token(props) {
  return (
    <div>
      <h1>Token Page</h1>
      {props.match.params.id
        ? <p>Token ID: {props.match.params.id}</p>
        : ""}
    </div>
  );
}